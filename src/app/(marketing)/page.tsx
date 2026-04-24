import Link from 'next/link'
import { ArrowRight, CheckCircle2, Play, Star, Zap, Video, Image, Grid3x3, Sparkles, ChevronRight } from 'lucide-react'

const AI_MODELS = [
  { name: 'Seedance 2.0', type: 'Vídeo', icon: '🎬', color: '#7C3AED', desc: 'Áudio nativo + lip-sync' },
  { name: 'Kling 1.6', type: 'Vídeo', icon: '🎥', color: '#3B82F6', desc: 'Ultra-fotorrealista' },
  { name: 'WAN 2.1', type: 'Vídeo', icon: '⚡', color: '#06B6D4', desc: 'Geração veloz' },
  { name: 'Flux Schnell', type: 'Imagem', icon: '✨', color: '#EC4899', desc: 'Imagem em 2 segundos' },
  { name: 'Flux Dev', type: 'Imagem', icon: '🎨', color: '#A78BFA', desc: 'Qualidade máxima' },
  { name: 'SDXL Turbo', type: 'Imagem', icon: '🖼️', color: '#F59E0B', desc: 'Versátil e rápido' },
]

const FEATURES = [
  {
    icon: Video,
    title: 'Multi-Modelo de Vídeo',
    description: 'Acesse Seedance 2.0, Kling 1.6 e WAN 2.1 em uma única plataforma. Escolha o modelo ideal para cada projeto.',
    color: '#7C3AED',
  },
  {
    icon: Image,
    title: 'Geração de Imagem IA',
    description: 'Flux Schnell, Flux Dev e SDXL. Imagens profissionais de produto em segundos para seus anúncios.',
    color: '#EC4899',
  },
  {
    icon: Sparkles,
    title: 'Marketing Studio',
    description: 'Crie UGC ads virais otimizados para TikTok Shop, Shopee e Mercado Livre com IA adaptada ao Brasil.',
    color: '#10B981',
  },
  {
    icon: Grid3x3,
    title: '20+ Apps de IA',
    description: 'Lipsync, face swap, remoção de fundo, upscale, transições e muito mais em um único lugar.',
    color: '#F59E0B',
  },
]

const STEPS = [
  {
    step: '01',
    title: 'Cole o vídeo viral',
    desc: 'Insira o link do TikTok ou faça upload do vídeo que quer clonar para seu produto.',
    gradient: 'from-[#7C3AED] to-[#A78BFA]',
  },
  {
    step: '02',
    title: 'Configure o estilo',
    desc: 'Escolha modelo de IA, duração, resolução e envie a foto do seu produto.',
    gradient: 'from-[#A78BFA] to-[#EC4899]',
  },
  {
    step: '03',
    title: 'IA gera o prompt',
    desc: 'Kimi Vision analisa o viral, extrai pacing e gera prompt cinematográfico otimizado.',
    gradient: 'from-[#EC4899] to-[#F59E0B]',
  },
  {
    step: '04',
    title: 'Vídeo pronto em 2 min',
    desc: 'O modelo de IA gera o vídeo com seu produto. Baixe em HD e publique imediatamente.',
    gradient: 'from-[#F59E0B] to-[#10B981]',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-purple">
                <Video className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-[15px] font-black tracking-tight">Ninja Box</span>
            </div>

            <div className="hidden items-center gap-6 md:flex">
              {[
                { href: '#modelos', label: 'Modelos' },
                { href: '#como-funciona', label: 'Como funciona' },
                { href: '#precos', label: 'Preços' },
                { href: '#faq', label: 'FAQ' },
              ].map(item => (
                <Link key={item.href} href={item.href} className="text-sm text-muted-foreground transition hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm text-muted-foreground transition hover:text-foreground">
                Entrar
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1.5 rounded-lg gradient-purple px-4 py-2 text-sm font-bold text-white transition hover:opacity-90 glow-purple-sm"
              >
                Começar grátis
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24">
        {/* Background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[#7C3AED]/12 blur-[120px]" />
          <div className="absolute top-32 right-0 h-[500px] w-[500px] rounded-full bg-[#EC4899]/8 blur-[100px]" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#3B82F6]/6 blur-[80px]" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-4 py-1.5 text-sm">
            <Star className="h-3.5 w-3.5 text-[#A78BFA]" fill="currentColor" />
            <span className="text-[#A78BFA] font-medium">Plataforma multi-modelo de IA para criadores</span>
          </div>

          {/* Headline */}
          <h1 className="mx-auto max-w-5xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl leading-[1.1]">
            Infraestrutura de IA para{' '}
            <span className="gradient-text">Vídeo & Imagem</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
            Seedance 2.0, Kling 1.6, WAN 2.1, Flux — todos os melhores modelos de IA em uma plataforma.
            Crie vídeos virais, imagens e conteúdo de marketing para e-commerce brasileiro.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="group flex items-center gap-2 rounded-xl gradient-purple px-8 py-4 text-base font-bold text-white transition hover:opacity-90 glow-purple"
            >
              Começar com 20 créditos grátis
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <button className="flex items-center gap-2.5 rounded-xl border border-border bg-muted px-6 py-4 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary">
                <Play className="h-3 w-3 fill-white ml-0.5" />
              </div>
              Ver demonstração
            </button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Sem cartão de crédito · Acesso imediato · Cancele quando quiser
          </p>

          {/* Model pills */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {AI_MODELS.map(model => (
              <div
                key={model.name}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{ background: `${model.color}15`, color: model.color, border: `1px solid ${model.color}25` }}
              >
                <span>{model.icon}</span>
                <span>{model.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODELOS */}
      <section id="modelos" className="py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black sm:text-4xl">
              Os melhores modelos de IA{' '}
              <span className="gradient-text">em um só lugar</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Acesse todos os modelos líderes de vídeo e imagem sem precisar de múltiplas assinaturas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {AI_MODELS.map(model => (
              <div
                key={model.name}
                className="group relative rounded-xl border border-border bg-card p-5 overflow-hidden hover:border-border transition-all"
              >
                <div
                  className="absolute -top-6 -right-6 h-16 w-16 rounded-full opacity-10 blur-xl group-hover:opacity-20 transition-opacity"
                  style={{ background: model.color }}
                />
                <div
                  className="mb-3 h-10 w-10 flex items-center justify-center rounded-xl text-xl"
                  style={{ background: `${model.color}15`, border: `1px solid ${model.color}25` }}
                >
                  {model.icon}
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 inline-block"
                  style={{ background: `${model.color}20`, color: model.color }}
                >
                  {model.type}
                </span>
                <h3 className="font-bold text-base text-white">{model.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{model.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black sm:text-4xl">
              Tudo que você precisa para criar
            </h2>
            <p className="mt-4 text-muted-foreground">Uma plataforma. Todos os modelos. Infinitas possibilidades.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {FEATURES.map(({ icon: Icon, title, description, color }) => (
              <div
                key={title}
                className="group relative rounded-xl border border-border bg-card p-6 overflow-hidden hover:border-border transition-all"
              >
                <div
                  className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-8 blur-2xl group-hover:opacity-15 transition-opacity"
                  style={{ background: color }}
                />
                <div
                  className="mb-4 h-12 w-12 flex items-center justify-center rounded-xl"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                >
                  <Icon className="h-6 w-6" style={{ color }} />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black sm:text-4xl">Como funciona</h2>
            <p className="mt-4 text-muted-foreground">4 passos. 2 minutos. Vídeo viral pronto.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {STEPS.map((item) => (
              <div key={item.step} className="rounded-xl border border-border bg-card p-5">
                <div
                  className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-sm font-black text-white`}
                >
                  {item.step}
                </div>
                <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREÇOS */}
      <section id="precos" className="py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black sm:text-4xl">Preços simples</h2>
            <p className="mt-4 text-muted-foreground">Comece grátis com 20 créditos. Sem cartão de crédito.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: 'R$ 47',
                credits: '700 créditos/mês',
                features: ['~23 vídeos de 5s', '~14 imagens Flux HD', '~12 clonagens completas'],
                cta: 'Começar grátis',
                highlight: false,
              },
              {
                name: 'Growth',
                price: 'R$ 97',
                credits: '1.500 créditos/mês',
                features: ['~50 vídeos de 5s', '~50 imagens Flux HD', '~27 clonagens completas', 'Templates ilimitados'],
                cta: 'Mais popular',
                highlight: true,
              },
              {
                name: 'Pro',
                price: 'R$ 197',
                credits: '3.000 créditos/mês',
                features: ['~100 vídeos de 5s', '100+ imagens HD', '~54 clonagens', 'Download sem marca d\'água', 'API access'],
                cta: 'Começar grátis',
                highlight: false,
              },
            ].map(plan => (
              <div
                key={plan.name}
                className={`relative rounded-xl p-6 ${
                  plan.highlight
                    ? 'border border-[#7C3AED]/50 bg-[#7C3AED]/5'
                    : 'border border-border bg-card'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-purple px-4 py-1 text-xs font-bold text-white">
                    MAIS POPULAR
                  </div>
                )}
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-black">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">/mês</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{plan.credits}</p>
                <ul className="mt-5 space-y-2.5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#A78BFA]" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`mt-6 block rounded-xl py-3 text-center text-sm font-bold transition ${
                    plan.highlight
                      ? 'gradient-purple text-white hover:opacity-90'
                      : 'border border-border text-muted-foreground hover:border-[#7C3AED]/40 hover:text-[#A78BFA]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 border-t border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-black">Perguntas frequentes</h2>
          <div className="space-y-3">
            {[
              {
                q: 'Os vídeos violam direitos autorais?',
                a: 'O Ninja Box clona o ESTILO do vídeo — pacing, arco narrativo, tipos de shot — não o conteúdo. Os vídeos gerados são 100% originais com seu produto, criados por IA do zero.',
              },
              {
                q: 'Quanto tempo leva para gerar?',
                a: 'Entre 30 segundos e 3 minutos dependendo do modelo e duração. O Flux Schnell gera imagens em 2-4 segundos. Você recebe notificação quando ficar pronto.',
              },
              {
                q: 'Posso usar qualquer modelo de IA?',
                a: 'Sim. Seedance 2.0, Kling 1.6, WAN 2.1 para vídeo. Flux Schnell, Flux Dev e SDXL para imagem. Todos incluídos em todos os planos.',
              },
              {
                q: 'Os créditos acumulam de um mês para o outro?',
                a: 'Créditos mensais do plano NÃO acumulam — expiram no fim do ciclo. Pacotes avulsos de recarga acumulam por 12 meses.',
              },
              {
                q: 'E se o vídeo gerado falhar?',
                a: 'Se houver erro técnico no servidor, os créditos são devolvidos automaticamente. Você pode gerar variações com seeds diferentes sem custo adicional.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-white">{q}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 border-t border-border">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#7C3AED]/8 blur-3xl rounded-full" />
            <div className="relative">
              <h2 className="text-4xl font-black sm:text-5xl leading-tight">
                Infraestrutura de IA para{' '}
                <span className="gradient-text">criadores brasileiros</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Crie vídeos virais, imagens profissionais e conteúdo de marketing com os melhores modelos de IA.
              </p>
              <Link
                href="/signup"
                className="mt-10 inline-flex items-center gap-2 rounded-xl gradient-purple px-10 py-4 text-base font-bold text-white transition hover:opacity-90 glow-purple"
              >
                Criar conta grátis
                <ArrowRight className="h-5 w-5" />
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">20 créditos grátis · Sem cartão · Acesso imediato</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md gradient-purple">
                <Video className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm font-bold">Ninja Box</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 Ninja Box. Todos os direitos reservados.</p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/privacidade" className="hover:text-foreground/60 transition">Privacidade</Link>
              <Link href="/termos" className="hover:text-foreground/60 transition">Termos</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
