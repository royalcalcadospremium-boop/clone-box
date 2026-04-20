import { eq } from 'drizzle-orm'
import { db } from '@/server/db'
import { profiles } from '@/server/db/schema'

export async function getUserBalance(userId: string) {
  const [profile] = await db
    .select({
      creditsBalance: profiles.creditsBalance,
      creditsBonusBalance: profiles.creditsBonusBalance,
      creditsBonusExpireAt: profiles.creditsBonusExpireAt,
      plan: profiles.plan,
      planStatus: profiles.planStatus,
      trialEndsAt: profiles.trialEndsAt,
    })
    .from(profiles)
    .where(eq(profiles.id, userId))

  if (!profile) throw new Error('Usuário não encontrado')

  const now = new Date()
  const bonusExpired =
    profile.creditsBonusExpireAt !== null && profile.creditsBonusExpireAt < now

  const bonusBalance = bonusExpired ? 0 : profile.creditsBonusBalance
  const totalBalance = profile.creditsBalance + bonusBalance

  return {
    mainBalance: profile.creditsBalance,
    bonusBalance,
    totalBalance,
    plan: profile.plan,
    planStatus: profile.planStatus,
    trialEndsAt: profile.trialEndsAt,
    isTrialExpired: profile.trialEndsAt !== null && profile.trialEndsAt < now,
  }
}

export function hasEnoughCredits(balance: number, cost: number): boolean {
  return balance >= cost
}
