import { CheckCircle2 } from 'lucide-react'

interface PublishedEntry {
  platform: string
  published_at: string
  external_url?: string | null
  status: string
}

const PLATFORM_NAMES: Record<string, string> = {
  mercado_livre: 'Mercado Livre',
  shopify: 'Shopify',
  woocommerce: 'WooCommerce',
  nuvemshop: 'Nuvem Shop',
  shopee: 'Shopee',
  tiktok_shop: 'TikTok Shop',
}

export function PublishedBadge({ publishedTo }: { publishedTo: unknown }) {
  const entries = (publishedTo as PublishedEntry[] | null) ?? []
  if (entries.length === 0) return null

  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {entries.map((entry, i) => (
        <a
          key={i}
          href={entry.external_url ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-400 hover:bg-green-500/20 transition max-w-[140px]"
          title={`Publicado em ${new Date(entry.published_at).toLocaleDateString('pt-BR')}`}
        >
          <CheckCircle2 className="h-3 w-3 shrink-0" />
          <span className="truncate">{PLATFORM_NAMES[entry.platform] ?? entry.platform}</span>
        </a>
      ))}
    </div>
  )
}
