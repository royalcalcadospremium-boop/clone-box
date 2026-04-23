import Link from 'next/link'
import { ArrowRight, CheckCircle2, Play, Star, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6B00]">
                <Zap className="h-4 w-4 text-black" fill="black" />
              </div>
              <span className="text-lg font-bold tracking-tight">CloneBox</span>
            </div>
            <div className="hidden items-center gap-8 md:flex">
              <Link href="#como-funciona" className="text-sm text-white/60 transition hover:text-white">
                Como funciona
              </Link>
              <Link href="#precos" className="text-sm text-white/60 transition hover:text-white">
                Preços
              </Link>
              <Link href="#faq" className="text-sm text-white/60 transition hover:text-white">
                FAQ
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-white/60 transition hover:text-white"
              >
                Entrar
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-[#FF6B00] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#FF8C00]"
              >
                Começar grátis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24">
        {/* Glow de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#FF6B00]/10 blur-3xl" />
          <div className="absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-[#E61C1C]/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 px-4 py-1.5 text-sm text-[#FF6B00]">
            <Star className="h-3.5 w-3.5" fill="currentColor" />
            <span>R$ 2,64 por vídeo UGC viral — sem creators, sem espera</span>
          </div>

          {/* Headline */}
          <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Clone vídeos virais do{' '}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#E61C1C] bg-clip-text text-transparent">
              TikTok
            </span>{' '}
            pro seu produto em{' '}
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#E61C1C] bg-clip-text text-transparent">
              2 minutos
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 sm:text-xl">
            Cole o link de um vídeo viral da concorrência, envie a foto do seu produto e receba um
            vídeo UGC pronto pra publicar. Com voz realista em português, pacing idêntico ao viral.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="group flex items-center gap-2 rounded-xl bg-[#FF6B00] px-8 py-4 text-base font-bold text-black transition hover:bg-[#FF8C00]"
            >
              Começar com 100 créditos grátis
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <button className="flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Play className="h-4 w-4" fill="currentColor" />
              </div>
              Ver demonstração
            </button>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-sm text-white/40">
            Sem cartão de crédito · 7 dias para testar · Cancele quando quiser
          </p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black sm:text-4xl">Como funciona</h2>
            <p className="mt-4 text-white/60">4 passos. 2 minutos. Vídeo pronto.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Cole o vídeo viral',
                desc: 'Coloque o link do TikTok ou faça upload do vídeo que quer clonar.',
                color: 'from-[#FF6B00] to-[#FF8C00]',
              },
              {
                step: '02',
                title: 'Configure o vídeo',
                desc: 'Escolha estilo, duração, resolução e envie a foto do seu produto.',
                color: 'from-[#FF6B00] to-[#E61C1C]',
              },
              {
                step: '03',
                title: 'IA analisa e gera o prompt',
                desc: 'Claude analisa o viral, extrai o pacing e gera um prompt otimizado.',
                color: 'from-[#E61C1C] to-[#FF6B00]',
              },
              {
                step: '04',
                title: 'Vídeo pronto em 2 min',
                desc: 'Seedance gera o vídeo com seu produto. Baixe e publique imediatamente.',
                color: 'from-[#FF6B00] to-[#FF8C00]',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-white/5 bg-[#111111] p-6"
              >
                <div
                  className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-sm font-black text-black`}
                >
                  {item.step}
                </div>
                <h3 className="mb-2 font-bold">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREÇOS */}
      <section id="precos" className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black sm:text-4xl">Preços simples e transparentes</h2>
            <p className="mt-4 text-white/60">
              Comece grátis com 100 créditos. Sem cartão de crédito.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Starter */}
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-8">
              <h3 className="text-lg font-bold">Starter</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black">R$ 47</span>
                <span className="text-white/40">/mês</span>
              </div>
              <p className="mt-2 text-sm text-white/50">700 créditos mensais</p>
              <ul className="mt-6 space-y-3">
                {['~14 imagens com fundo branco', '~23 vídeos de 5s', '~12 clonagens completas'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF6B00]" />
                      <span className="text-white/70">{item}</span>
                    </li>
                  )
                )}
              </ul>
              <Link
                href="/signup"
                className="mt-8 block rounded-xl border border-white/10 py-3 text-center text-sm font-semibold transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
              >
                Começar grátis
              </Link>
            </div>

            {/* Growth — destaque */}
            <div className="relative rounded-2xl border border-[#FF6B00] bg-[#111111] p-8">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#FF6B00] px-4 py-1 text-xs font-bold text-black">
                MAIS POPULAR
              </div>
              <h3 className="text-lg font-bold">Growth</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black">R$ 97</span>
                <span className="text-white/40">/mês</span>
              </div>
              <p className="mt-2 text-sm text-white/50">1.500 créditos mensais</p>
              <ul className="mt-6 space-y-3">
                {['~30 vídeos de 5s', '~27 clonagens completas', 'Templates salvos ilimitados'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF6B00]" />
                      <span className="text-white/70">{item}</span>
                    </li>
                  )
                )}
              </ul>
              <Link
                href="/signup"
                className="mt-8 block rounded-xl bg-[#FF6B00] py-3 text-center text-sm font-bold text-black transition hover:bg-[#FF8C00]"
              >
                Começar grátis
              </Link>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-8">
              <h3 className="text-lg font-bold">Pro</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-black">R$ 197</span>
                <span className="text-white/40">/mês</span>
              </div>
              <p className="mt-2 text-sm text-white/50">3.000 créditos mensais</p>
              <ul className="mt-6 space-y-3">
                {[
                  '~60 vídeos de 5s',
                  '~54 clonagens completas',
                  'Download sem marca d\'água',
                  'Publicação direta TikTok Shop',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF6B00]" />
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="mt-8 block rounded-xl border border-white/10 py-3 text-center text-sm font-semibold transition hover:border-[#FF6B00] hover:text-[#FF6B00]"
              >
                Começar grátis
              </Link>
            </div>
          </div>

          {/* Custo por operação */}
          <div className="mt-12 rounded-2xl border border-white/5 bg-[#111111] p-8">
            <h3 className="mb-6 text-center font-bold">Custo por operação</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { op: 'Título + descrição + tags', creditos: 5, valor: 'R$ 0,24' },
                { op: 'Imagem fundo branco', creditos: 15, valor: 'R$ 0,72' },
                { op: 'Vídeo 5s TikTok', creditos: 30, valor: 'R$ 1,44' },
                { op: 'Vídeo 10s', creditos: 50, valor: 'R$ 2,40' },
                { op: 'Pack completo (título+imagem+vídeo 5s)', creditos: 40, valor: 'R$ 1,92' },
                {
                  op: 'Clonagem completa',
                  creditos: 55,
                  valor: 'R$ 2,64',
                  highlight: true,
                },
              ].map((item) => (
                <div
                  key={item.op}
                  className={`flex items-center justify-between rounded-xl p-4 ${
                    item.highlight
                      ? 'border border-[#FF6B00]/30 bg-[#FF6B00]/5'
                      : 'bg-white/3'
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium">{item.op}</p>
                    <p className="text-xs text-white/40">{item.creditos} créditos</p>
                  </div>
                  <span
                    className={`text-sm font-bold ${item.highlight ? 'text-[#FF6B00]' : 'text-white'}`}
                  >
                    {item.valor}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-black">Perguntas frequentes</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Os vídeos violam direitos autorais?',
                a: 'O CloneBox clona o ESTILO do vídeo — o pacing, o arco narrativo, o tipo de shot — não o conteúdo original. Os vídeos gerados são 100% originais com seu produto, criados por IA.',
              },
              {
                q: 'Quanto tempo leva para gerar um vídeo?',
                a: 'Entre 60 e 120 segundos. Você pode continuar usando o dashboard enquanto o vídeo é gerado em segundo plano. Você recebe uma notificação quando ficar pronto.',
              },
              {
                q: 'Os créditos acumulam de um mês para o outro?',
                a: 'Créditos mensais do plano NÃO acumulam — expiram no fim do ciclo. Pacotes avulsos de recarga acumulam por 12 meses.',
              },
              {
                q: 'Posso cancelar quando quiser?',
                a: 'Sim. Cancele a qualquer momento. O plano continua ativo até o fim do período pago. Sem multa, sem burocracia.',
              },
              {
                q: 'E se eu não gostar do vídeo gerado?',
                a: 'Você pode editar o prompt antes de gerar e tentar variações (mesma configuração, seed diferente). Se a API falhar por erro técnico, os créditos são devolvidos automaticamente.',
              },
            ].map((item) => (
              <div key={item.q} className="rounded-xl border border-white/5 bg-[#111111] p-6">
                <h3 className="font-semibold">{item.q}</h3>
                <p className="mt-2 text-sm text-white/60">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black sm:text-5xl">
            Pronto para parar de pagar{' '}
            <span className="text-[#E61C1C]">R$ 500</span> por vídeo?
          </h2>
          <p className="mt-6 text-lg text-white/60">
            Comece grátis com 100 créditos. Sem cartão. Cancele quando quiser.
          </p>
          <Link
            href="/signup"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-[#FF6B00] px-10 py-4 text-lg font-bold text-black transition hover:bg-[#FF8C00]"
          >
            Criar conta grátis
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#FF6B00]">
                <Zap className="h-3 w-3 text-black" fill="black" />
              </div>
              <span className="text-sm font-bold">CloneBox</span>
            </div>
            <p className="text-sm text-white/30">© 2026 CloneBox. Todos os direitos reservados.</p>
            <div className="flex gap-4 text-sm text-white/30">
              <Link href="/privacidade" className="hover:text-white/60">Privacidade</Link>
              <Link href="/termos" className="hover:text-white/60">Termos</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
