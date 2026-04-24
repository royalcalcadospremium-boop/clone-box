import { eq, sql } from 'drizzle-orm'
import { db } from '@/server/db'
import { creditTransactions, profiles } from '@/server/db/schema'
import { InsufficientCreditsError } from '@/lib/errors'
import type { CreditTransaction } from '@/server/db/schema'

type ChargeCreditsParams = {
  userId: string
  amount: number
  type: CreditTransaction['type']
  referenceId?: string
  referenceType?: string
  description: string
  metadata?: Record<string, unknown>
}

// Debita créditos em transação atômica — nunca vai a negativo
export async function chargeCredits({
  userId,
  amount,
  type,
  referenceId,
  referenceType,
  description,
  metadata,
}: ChargeCreditsParams): Promise<CreditTransaction> {
  if (amount <= 0) throw new Error('amount deve ser positivo')

  return await db.transaction(async (tx) => {
    // Seleciona o saldo atual com lock pra evitar race condition
    const [profile] = await tx
      .select({
        creditsBalance: profiles.creditsBalance,
        creditsBonusBalance: profiles.creditsBonusBalance,
      })
      .from(profiles)
      .where(eq(profiles.id, userId))
      .for('update')

    if (!profile) throw new Error('Usuário não encontrado')

    const totalBalance = profile.creditsBalance + profile.creditsBonusBalance

    if (totalBalance < amount) {
      throw new InsufficientCreditsError(amount, totalBalance)
    }

    // Debita dos créditos bônus primeiro, depois dos mensais
    let bonusDebit = 0
    let mainDebit = 0

    if (profile.creditsBonusBalance >= amount) {
      bonusDebit = amount
    } else {
      bonusDebit = profile.creditsBonusBalance
      mainDebit = amount - bonusDebit
    }

    const balanceBefore = totalBalance
    const balanceAfter = totalBalance - amount

    await tx
      .update(profiles)
      .set({
        creditsBalance: sql`${profiles.creditsBalance} - ${mainDebit}`,
        creditsBonusBalance: sql`${profiles.creditsBonusBalance} - ${bonusDebit}`,
        updatedAt: new Date(),
      })
      .where(eq(profiles.id, userId))

    const [transaction] = await tx
      .insert(creditTransactions)
      .values({
        userId,
        amount: -amount,
        type,
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
