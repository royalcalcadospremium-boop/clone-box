import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { LayoutTemplate, Plus, Zap, Lock } from 'lucide-react'

const CATEGORY_LABELS: Record<string, string> = {
  ugc: 'UGC',
  product: 'Produto',
  unboxing: 'Unboxing',
  lifestyle: 'Lifestyle',
  review: 'Review',
}

export default async function TemplatesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: myTemplates } = await supabase
    .from('templates')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const { data: publicTemplates } = await supabase
    .from('templates')
    .select('*')
    .eq('is_public', true)
    .neq('user_id', user!.id)
    .order('times_used', { ascending: false })
    .limit(12)

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Templates</h1>
          <p className="mt-1 text-sm text-white/50">
            Reutilize configurações de clonagens anteriores
          </p>
        </div>
      </div>

      {/* Meus templates */}
      <div>
        <h2 className="text-sm font-semibold text-white/50 mb-4">Meus templates</h2>

        {!myTemplates || myTemplates.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ffff00]/10 mb-3">
              <LayoutTemplate className="h-7 w-7 text-[#ffff00]" />
            </div>
            <h3 className="font-bold">Nenhum template ainda</h3>
            <p className="mt-1 text-sm text-white/40 max-w-xs">
              Após criar um vídeo, salve-o como template para reutilizar rapidamente
            </p>
            <Link
              href="/clone"
              className="mt-5 flex items-center gap-2 rounded-xl bg-[#ffff00] px-5 py-2.5 text-sm font-bold text-black hover:bg-[#ffff56] transition"
            >
              <Plus className="h-4 w-4" />
              Criar primeiro clone
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {myTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="rounded-2xl border border-white/5 bg-[#111111] overflow-hidden hover:border-white/10 transition"
              >
                {tpl.thumbnail_url ? (
                  <Image src={tpl.thumbnail_url} alt={tpl.name} width={400} height={160} className="w-full h-40 object-cover" unoptimized />
                ) : (
                  <div className="w-full h-40 bg-[#0A0A0A] flex items-center justify-center">
                    <LayoutTemplate className="h-10 w-10 text-white/10" />
                  </div>
                )}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">{tpl.name}</h3>
                    {tpl.is_public && (
                      <span className="text-xs text-[#ffff00] border border-[#ffff00]/30 rounded px-1.5 py-0.5">Público</span>
                    )}
                  </div>
                  {tpl.description && (
                    <p className="text-xs text-white/40 line-clamp-2">{tpl.description}</p>
                  )}
                  <div className="flex items-center justify-between pt-1">
                    {tpl.category && (
                      <span className="text-xs text-white/30">{CATEGORY_LABELS[tpl.category] ?? tpl.category}</span>
                    )}
                    <span className="text-xs text-white/30">
                      Usado {tpl.times_used}x
                    </span>
                  </div>
                  <Link
                    href={`/clone?template=${tpl.id}`}
                    className="block mt-2 w-full rounded-xl border border-[#ffff00]/30 py-2 text-center text-xs font-bold text-[#ffff00] hover:bg-[#ffff00]/10 transition"
                  >
                    Usar template
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Templates da comunidade */}
      {publicTemplates && publicTemplates.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-white/50 mb-4">Templates da comunidade</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {publicTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="rounded-2xl border border-white/5 bg-[#111111] overflow-hidden hover:border-white/10 transition"
              >
                {tpl.thumbnail_url ? (
                  <Image src={tpl.thumbnail_url} alt={tpl.name} width={400} height={160} className="w-full h-40 object-cover" unoptimized />
                ) : (
                  <div className="w-full h-40 bg-[#0A0A0A] flex items-center justify-center">
                    <LayoutTemplate className="h-10 w-10 text-white/10" />
                  </div>
                )}
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-sm">{tpl.name}</h3>
                  {tpl.description && (
                    <p className="text-xs text-white/40 line-clamp-2">{tpl.description}</p>
                  )}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-xs text-white/30">
                      <Zap className="h-3 w-3" />
                      {tpl.times_used} usos
                    </div>
                  </div>
                  <Link
                    href={`/clone?template=${tpl.id}`}
                    className="block mt-2 w-full rounded-xl border border-white/10 py-2 text-center text-xs font-medium hover:border-[#ffff00]/30 hover:text-[#ffff00] transition"
                  >
                    Usar template
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
