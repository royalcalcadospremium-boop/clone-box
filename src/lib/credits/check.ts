import { eq } from 'drizzle-orm'
import { db } from '@/server/db'
import { profiles } from '@/server/db/schema'
import { PlanRestrictionError } from '@/lib/errors'

export { PlanRestrictionError }

export async function assertCanGenerate(userId: string) {
  const [profile] = await db
    .select({
      plan: profiles.plan,
      planStatus: profiles.planStatus,
      trialEndsAt: profiles.trialEndsAt,
      creditsBalance: profiles.creditsBalance,
      creditsBonusBalance: profiles.creditsBonusBalance,
    })
    .from(profiles)
    .where(eq(profiles.id, userId))

  if (!profile) throw new PlanRestrictionError('Perfil não encontrado')

  const now = new Date()
  const trialExpired = profile.trialEndsAt !== null && profile.trialEndsAt < now

  if (profile.planStatus === 'canceled') {
    throw new PlanRestrictionError('Seu plano foi cancelado. Renove para continuar.')
  }

  if (profile.planStatus === 'past_due') {
    throw new PlanRestrictionError('Pagamento atrasado. Atualize seu método de pagamento.')
  }

  if (profile.planStatus === 'trial' && trialExpired) {
    throw new PlanRestrictionError('Seu período de teste expirou. Escolha um plano para continuar.')
  }

  const totalCredits = profile.creditsBalance + profile.creditsBonusBalance
  if (totalCredits <= 0) {
    throw new PlanRestrictionError('Créditos insuficientes. Recarregue para continuar.')
  }

  return { plan: profile.plan, totalCredits }
}
