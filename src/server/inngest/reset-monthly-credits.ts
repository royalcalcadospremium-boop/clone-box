import { and, eq, lt, sql } from 'drizzle-orm'
import { inngest } from './client'
import { db } from '@/server/db'
import { creditTransactions, profiles } from '@/server/db/schema'
import { PLAN_CREDITS } from '@/lib/credits/pricing'
import { logger } from '@/lib/logger'

// Roda todo dia 1 às 00:00 BRT (03:00 UTC)
export const resetMonthlyCredits = inngest.createFunction(
  {
    id: 'reset-monthly-credits',
    name: 'Reset Monthly Credits',
  },
  { cron: '0 3 1 * *' },
  async ({ step }) => {
    const now = new Date()

    const usersToReset = await step.run('fetch-active-subscriptions', async () => {
      return db
        .select({
          id: profiles.id,
          plan: profiles.plan,
          creditsBalance: profiles.creditsBalance,
        })
        .from(profiles)
        .where(
          and(
            eq(profiles.planStatus, 'active'),
            lt(profiles.creditsResetDate, now)
          )
        )
    })

    logger.info({ count: usersToReset.length }, 'Resetting monthly credits')

    // Reset em lotes de 100
    const batchSize = 100
    for (let i = 0; i < usersToReset.length; i += batchSize) {
      const batch = usersToReset.slice(i, i + batchSize)

      await step.run(`reset-batch-${i / batchSize}`, async () => {
        await db.transaction(async (tx) => {
          for (const user of batch) {
            const quota = PLAN_CREDITS[user.plan as keyof typeof PLAN_CREDITS] ?? 0
            const nextResetDate = new Date(now)
            nextResetDate.setMonth(nextResetDate.getMonth() + 1)

            // Créditos NÃO acumulam — substituir pelo quota do plano
            await tx
              .update(profiles)
              .set({
                creditsBalance: quota,
                creditsMonthlyQuota: quota,
                creditsResetDate: nextResetDate,
                updatedAt: now,
              })
              .where(eq(profiles.id, user.id))

            await tx.insert(creditTransactions).values({
              userId: user.id,
              amount: quota - user.creditsBalance,
              type: 'plan_renewal',
              balanceBefore: user.creditsBalance,
              balanceAfter: quota,
              description: `Renovação mensal — plano ${user.plan}`,
            })
          }
        })
      })
    }

    return { resetCount: usersToReset.length }
  }
)
