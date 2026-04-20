'use server'

import { eq, sql } from 'drizzle-orm'
import { db } from '@/server/db'
import { creditTransactions, profiles } from '@/server/db/schema'
import type { CreditTransaction } from '@/server/db/schema'

type RefundCreditsParams = {
  userId: string
  amount: number
  referenceId?: string
  referenceType?: string
  description: string
  metadata?: Record<string, unknown>
}

export async function refundCredits({
  userId,
  amount,
  referenceId,
  referenceType,
  description,
  metadata,
}: RefundCreditsParams): Promise<CreditTransaction> {
  if (amount <= 0) throw new Error('amount deve ser positivo')

  return await db.transaction(async (tx) => {
    const [profile] = await tx
      .select({ creditsBalance: profiles.creditsBalance, creditsBonusBalance: profiles.creditsBonusBalance })
      .from(profiles)
      .where(eq(profiles.id, userId))
      .for('update')

    if (!profile) throw new Error('Usuário não encontrado')

    const balanceBefore = profile.creditsBalance + profile.creditsBonusBalance
    const balanceAfter = balanceBefore + amount

    // Reembolsos vão para créditos mensais
    await tx
      .update(profiles)
      .set({
        creditsBalance: sql`${profiles.creditsBalance} + ${amount}`,
        updatedAt: new Date(),
      })
      .where(eq(profiles.id, userId))

    const [transaction] = await tx
      .insert(creditTransactions)
      .values({
        userId,
        amount,
        type: 'refund',
        referenceId,
        referenceType,
        balanceBefore,
        balanceAfter,
        description,
        metadata,
      })
      .returning()

    return transaction
  })
}
