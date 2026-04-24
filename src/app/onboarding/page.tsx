'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Zap, ShoppingBag, Video, TrendingUp, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

const PLATFORMS = [
  { id: 'tiktok_shop', label: 'TikTok Shop' },
  { id: 'shopee', label: 'Shopee' },
  { id: 'mercado_livre', label: 'Mercado Livre' },
  { id: 'shopify', label: 'Shopify' },
  { id: 'amazon', label: 'Amazon' },
  { id: 'instagram', label: 'Instagram' },
]

const VOLUMES = [
  { id: '1-5', label: '1–5 vídeos/semana' },
  { id: '6-15', label: '6–15 vídeos/semana' },
  { id: '16+', label: '16+ vídeos/semana' },
]

const REVENUES = [
  { id: 'less-20k', label: 'Menos de R$ 20k/mês' },
  { id: '20k-100k', label: 'R$ 20k – R$ 100k/mês' },
  { id: '100k-500k', label: 'R$ 100k – R$ 500k/mês' },
  { id: '500k+', label: 'Acima de R$ 500k/mês' },
]

const PAIN_POINTS = [
  { id: 'cost', label: 'Custo alto de creators (R$ 300–800/vídeo)' },
  { id: 'time', label: 'Falta de tempo para produzir conteúdo' },
  { id: 'consistency', label: 'Dificuldade de manter consistência de posts' },
  { id: 'quality', label: 'Qualidade baixa dos vídeos atuais' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    platforms: [] as string[],
    videoVolume: '',
    monthlyRevenue: '',
    painPoints: [] as string[],
    companyName: '',
  })
  const [error, setError] = useState('')

  function toggle<K extends 'platforms' | 'painPoints'>(key: K, value: string) {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }))
  }

  async function finish() {
    setLoading(true)
    setError('')
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('Sessão expirada. Faça login novamente.')
        return
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          company_name: data.companyName || null,
          onboarding_completed: true,
          onboarding_data: {
            platforms: data.platforms,
            video_volume: data.videoVolume,
            monthly_revenue: data.monthlyRevenue,
            pain_points: data.painPoints,
          },
        })
        .eq('id', user.id)

      if (updateError) throw updateError
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    // Passo 0 — Boas-vindas
    <div key="welcome" className="space-y-6">
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FF6B00]/10">
          <Zap className="h-10 w-10 text-[#FF6B00]" fill="#FF6B00" />
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-black">Bem-vindo ao CloneBox!</h1>
        <p className="mt-2 text-white/50 text-sm leading-relaxed">
          Em 4 perguntas rápidas vamos personalizar sua experiência.
          <br />
          Você já ganhou <span className="text-[#FF6B00] font-bold">20 créditos grátis</span> para começar.
        </p>
      </div>
      <div className="rounded-xl border border-[#FF6B00]/20 bg-[#FF6B00]/5 p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle2 className="h-4 w-4 text-[#FF6B00]" />
          <span>2 análises de IA gratuitas incluídas</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle2 className="h-4 w-4 text-[#FF6B00]" />
          <span>Sem cartão de crédito necessário</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle2 className="h-4 w-4 text-[#FF6B00]" />
          <span>Primeiro vídeo pronto em 2 minutos</span>
        </div>
      </div>
    </div>,

    // Passo 1 — Plataformas
    <div key="platforms" className="space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <ShoppingBag className="h-5 w-5 text-[#FF6B00]" />
          <h2 className="text-lg font-bold">Onde você vende?</h2>
        </div>
        <p className="text-sm text-white/40">Selecione todas que se aplicam</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {PLATFORMS.map((p) => (
          <button
            key={p.id}
            onClick={() => toggle('platforms', p.id)}
            className={`rounded-xl border px-4 py-3 text-sm font-medium text-left transition ${
              data.platforms.includes(p.id)
                ? 'border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00]'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            {data.platforms.includes(p.id) && <CheckCircle2 className="inline h-3.5 w-3.5 mr-1.5" />}
            {p.label}
          </button>
        ))}
      </div>
    </div>,

    // Passo 2 — Volume de vídeos
    <div key="volume" className="space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Video className="h-5 w-5 text-[#FF6B00]" />
          <h2 className="text-lg font-bold">Quantos vídeos você posta?</h2>
        </div>
        <p className="text-sm text-white/40">Média semanal nas redes sociais</p>
      </div>
      <div className="space-y-2">
        {VOLUMES.map((v) => (
          <button
            key={v.id}
            onClick={() => setData((prev) => ({ ...prev, videoVolume: v.id }))}
            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition ${
              data.videoVolume === v.id
                ? 'border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00]'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
              data.videoVolume === v.id ? 'border-[#FF6B00]' : 'border-white/30'
            }`}>
              {data.videoVolume === v.id && <div className="h-2 w-2 rounded-full bg-[#FF6B00]" />}
            </div>
            {v.label}
          </button>
        ))}
      </div>
    </div>,

    // Passo 3 — Faturamento e dores
    <div key="pain" className="space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="h-5 w-5 text-[#FF6B00]" />
          <h2 className="text-lg font-bold">Qual sua maior dor com vídeos?</h2>
        </div>
        <p className="text-sm text-white/40">Selecione todas que se aplicam</p>
      </div>
      <div className="space-y-2">
        {PAIN_POINTS.map((p) => (
          <button
            key={p.id}
            onClick={() => toggle('painPoints', p.id)}
            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium text-left transition ${
              data.painPoints.includes(p.id)
                ? 'border-[#FF6B00] bg-[#FF6B00]/10 text-[#FF6B00]'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className={`h-4 w-4 shrink-0 rounded border-2 flex items-center justify-center ${
              data.painPoints.includes(p.id) ? 'border-[#FF6B00] bg-[#FF6B00]' : 'border-white/30'
            }`}>
              {data.painPoints.includes(p.id) && (
                <svg className="h-2.5 w-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            {p.label}
          </button>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-white/60 mb-1.5">
          Nome da loja (opcional)
        </label>
        <input
          type="text"
          value={data.companyName}
          onChange={(e) => setData((prev) => ({ ...prev, companyName: e.target.value }))}
          placeholder="Royal Calçados"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#FF6B00]"
        />
      </div>
    </div>,
  ]

  const isLastStep = step === steps.length - 1
  const canAdvance =
    step === 0 ||
    (step === 1 && data.platforms.length > 0) ||
    (step === 2 && data.videoVolume !== '') ||
    (step === 3 && data.painPoints.length > 0)

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4">
      <div className="w-full max-w-md">
        {/* Progresso */}
        <div className="mb-8">
          <div className="flex gap-1.5 mb-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all ${
                  i <= step ? 'bg-[#FF6B00]' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-white/30 text-right">
            {step + 1} de {steps.length}
          </p>
        </div>

        {/* Conteúdo do passo atual */}
        <div className="rounded-2xl border border-white/5 bg-[#111111] p-8">
          {steps[step]}

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="text-sm text-white/40 hover:text-white transition"
              >
                Voltar
              </button>
            ) : (
              <div />
            )}

            {isLastStep ? (
              <button
                onClick={finish}
                disabled={!canAdvance || loading}
                className="flex items-center gap-2 rounded-xl bg-[#FF6B00] px-6 py-3 text-sm font-bold text-black disabled:opacity-40 hover:bg-[#FF8C00] transition"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? 'Salvando...' : 'Ir para o dashboard'}
              </button>
            ) : (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance}
                className="rounded-xl bg-[#FF6B00] px-6 py-3 text-sm font-bold text-black disabled:opacity-40 hover:bg-[#FF8C00] transition"
              >
                {step === 0 ? 'Começar' : 'Próximo'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
