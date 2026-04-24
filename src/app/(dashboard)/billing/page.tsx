import { createClient } from '@/lib/supabase/server'
import { CheckCircle2, Zap, CreditCard, Package } from 'lucide-react'
import { PlanButton, TopupButton } from './BillingActions'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 47,
    credits: 700,
    features: ['~14 imagens fundo branco', '~23 vídeos de 5s', '~12 clonagens completas'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 97,
    credits: 1500,
    popular: true,
    features: ['~30 vídeos de 5s', '~27 clonagens completas', 'Templates salvos ilimitados'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 197,
    credits: 3000,
    features: [
      '~60 vídeos de 5s',
      '~54 clonagens completas',
      'Download sem marca d\'água',
      'Publicação TikTok Shop',
    ],
  },
]

const TOPUPS = [
  { id: 'mini', name: 'Mini', price: 27, credits: 300 },
  { id: 'medio', name: 'Médio', price: 67, credits: 800 },
  { id: 'grande', name: 'Grande', price: 147, credits: 2000 },
  { id: 'jumbo', name: 'Jumbo', price: 347, credits: 5000 },
  { id: 'enterprise', name: 'Enterprise', price: 797, credits: 12000 },
]

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('credits_balance, credits_bonus_balance, plan, plan_status, credits_reset_date')
    .eq('id', user!.id)
    .single()

  const { data: transactions } = await supabase
    .from('credit_transactions')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(10)

  const totalCredits = (profile?.credits_balance ?? 0) + (profile?.credits_bonus_balance ?? 0)
  const currentPlan = profile?.plan ?? 'free'

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black">Planos e créditos</h1>
        <p className="mt-1 text-sm text-white/50">Gerencie seu plano e recarregue créditos</p>
      </div>

      {/* Saldo atual */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#ffff00]/20 bg-[#ffff00]/5 p-6">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
            <Zap className="h-4 w-4 text-[#ffff00]" />
            Créditos disponíveis
          </div>
          <div className="text-4xl font-black text-[#ffff00]">{totalCredits}</div>
          {profile?.credits_reset_date && (
            <p className="mt-1 text-xs text-white/30">
              Renova em {new Date(profile.credits_reset_date).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#111111] p-6">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
            <CreditCard className="h-4 w-4" />
            Plano atual
          </div>
          <div className="text-2xl font-black capitalize">{currentPlan}</div>
          <p className="mt-1 text-xs text-white/30 capitalize">{profile?.plan_status ?? 'trial'}</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#111111] p-6">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
            <Package className="h-4 w-4" />
            Créditos avulsos
          </div>
          <div className="text-2xl font-black">{profile?.credits_bonus_balance ?? 0}</div>
          <p className="mt-1 text-xs text-white/30">Acumulam por 12 meses</p>
        </div>
      </div>

      {/* Planos */}
      <div>
        <h2 className="text-lg font-bold mb-4">Planos mensais</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {PLANS.map((plan) => {
            const isCurrent = currentPlan === plan.id
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl border p-6 ${
                  plan.popular
                    ? 'border-[#ffff00]'
                    : isCurrent
                    ? 'border-green-500/50'
                    : 'border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#ffff00] px-3 py-0.5 text-xs font-bold text-black">
                    POPULAR
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-3 py-0.5 text-xs font-bold text-black">
                    PLANO ATUAL
                  </div>
                )}
                <h3 className="font-bold">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-black">R$ {plan.price}</span>
                  <span className="text-white/40 text-sm">/mês</span>
                </div>
                <p className="text-sm text-white/50 mt-1">{plan.credits.toLocaleString('pt-BR')} créditos</p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#ffff00]" />
                      <span className="text-white/60">{f}</span>
                    </li>
                  ))}
                </ul>
                <PlanButton
                  planId={plan.id}
                  planName={plan.name}
                  price={plan.price}
                  isCurrent={isCurrent}
                  isPopular={!!plan.popular}
                />
              </div>
            )
          })}
        </div>
        <p className="mt-3 text-center text-xs text-white/30">
          Pagamento via PIX, boleto ou cartão de crédito · Cancele quando quiser · Reembolso em 7 dias
        </p>
      </div>

      {/* Pacotes avulsos */}
      <div>
        <h2 className="text-lg font-bold mb-1">Pacotes avulsos de créditos</h2>
        <p className="text-sm text-white/50 mb-4">Créditos acumulam por 12 meses. Compre quando precisar.</p>
        <div className="grid gap-3 sm:grid-cols-5">
          {TOPUPS.map((topup) => {
            const pricePerCredit = topup.price / topup.credits
            const savings = Math.round((1 - pricePerCredit / 0.048) * 100)
            return (
              <div key={topup.id} className="rounded-xl border border-white/10 p-4 text-center hover:border-[#ffff00]/30 transition">
                <p className="font-bold">{topup.name}</p>
                <p className="text-2xl font-black mt-1">R$ {topup.price}</p>
                <p className="text-sm text-[#ffff00] font-medium">{topup.credits.toLocaleString('pt-BR')} créditos</p>
                {savings > 0 && (
                  <p className="text-xs text-green-400 mt-0.5">Economia de {savings}%</p>
                )}
                <TopupButton topupId={topup.id} price={topup.price} credits={topup.credits} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Histórico de transações */}
      {transactions && transactions.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Histórico de créditos</h2>
          <div className="rounded-2xl border border-white/5 bg-[#111111] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white/40">Descrição</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-white/40">Créditos</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-white/40">Saldo</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-white/40">Data</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-3 text-white/70">{tx.description}</td>
                    <td className={`px-4 py-3 text-right font-mono font-semibold ${
                      tx.amount > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-white/50">{tx.balance_after ?? '—'}</td>
                    <td className="px-4 py-3 text-right text-white/30 text-xs">
                      {new Date(tx.created_at).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
