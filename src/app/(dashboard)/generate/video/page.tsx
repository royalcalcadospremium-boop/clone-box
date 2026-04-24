import { VideoGeneratorClient } from './VideoGeneratorClient'

export const metadata = { title: 'Geração de Vídeo — Ninja Box' }

export default function VideoGeneratorPage({
  searchParams,
}: {
  searchParams: Promise<{ model?: string }>
}) {
  return (
    <div className="h-full flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-black tracking-tight">Geração de Vídeo IA</h1>
        <p className="mt-0.5 text-sm text-white/40">
          Seedance 2.0, Kling 1.6, WAN 2.1 — todos os modelos em um só lugar
        </p>
      </div>
      <VideoGeneratorPageInner searchParams={searchParams} />
    </div>
  )
}

async function VideoGeneratorPageInner({
  searchParams,
}: {
  searchParams: Promise<{ model?: string }>
}) {
  const params = await searchParams
  return <VideoGeneratorClient initialModel={params.model} />
}
