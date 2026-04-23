import { createClient } from '@/lib/supabase/server'
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { ConnectButton, ManageButtons } from './IntegrationButtons'

const PLATFORMS = [
  {
    id: 'nuvemshop',
    name: 'Nuvem Shop',
    description: 'Publique vídeos e sincronize produtos com sua loja Nuvem Shop',
    icon: '☁️',
    available: true,
  },
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'Adicione vídeos aos produtos e coleções da sua loja Shopify',
    icon: '🛍️',
    available: true,
  },
  {
    id: 'mercado_livre',
    name: 'Mercado Livre',
    description: 'Anexe vídeos aos seus anúncios do Mercado Livre',
    icon: '🟡',
    available: true,
  },
  {
    id: 'shopee',
    name: 'Shopee',
    description: 'Adicione mídia aos seus produtos na Shopee',
    icon: '🛒',
    available: true,
  },
  {
    id: 'tiktok_shop',
    name: 'TikTok Shop',
    description: 'Publique vídeos diretamente no TikTok Shop',
    icon: '🎵',
    available: true,
  },
]

const STATUS_CONFIG = {
  active: { label: 'Conectado', color: 'text-green-400', icon: CheckCircle2 },
  expired: { label: 'Token expirado', color: 'text-yellow-400', icon: AlertCircle },
  error: { label: 'Erro', color: 'text-red-400', icon: AlertCircle },
  revoked: { label: 'Revogado', color: 'text-red-400', icon: AlertCircle },
}

export default async function IntegrationsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: integrations } = await supabase
    .from('integrations')
    .select('*')
    .eq('user_id', user!.id)

  const connectedMap = Object.fromEntries(
    (integrations ?? []).map((i) => [i.platform, i])
  )

  return (
    <div className="max-w-[1200px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight">Integrações</h1>
        <p className="mt-1 text-sm text-white/50">
          Conecte suas plataformas de e-commerce para publicar vídeos diretamente do CloneBox
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLATFORMS.map((platform) => {
          const connected = connectedMap[platform.id]
          const statusInfo = connected
            ? STATUS_CONFIG[connected.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.active
            : null
          const StatusIcon = statusInfo?.icon

          return (
            <div
              key={platform.id}
              className={`rounded-xl border p-5 transition ${
                connected?.status === 'active'
                  ? 'border-green-500/20 bg-green-500/5'
                  : 'border-white/[0.06] bg-[#0F0F0F]'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-2xl">
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{platform.name}</h3>
                    <p className="text-xs text-white/40 mt-0.5 leading-snug">{platform.description}</p>
                  </div>
                </div>

                {connected && StatusIcon && (
                  <div className={`flex items-center gap-1 text-xs shrink-0 ${statusInfo.color}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {statusInfo.label}
                  </div>
                )}
              </div>

              {connected && (
                <div className="mt-3 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2">
                  <p className="text-xs text-white/60">
                    Loja: <span className="font-medium text-white/80">{connected.shop_name ?? 'Desconhecida'}</span>
                  </p>
                  {connected.last_publish_at && (
                    <p className="text-xs text-white/40 mt-0.5">
                      Última publicação: {new Date(connected.last_publish_at).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
              )}

              <div className="mt-4">
                {!platform.available ? (
                  <div className="flex items-center gap-1.5 text-xs text-white/30">
                    <Clock className="h-3.5 w-3.5" />
                    Em breve
                  </div>
                ) : connected?.status === 'active' ? (
                  <ManageButtons platformId={platform.id} />
                ) : (
                  <ConnectButton platformId={platform.id} platformName={platform.name} />
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#0F0F0F] p-5 text-sm text-white/40">
        <p>
          <span className="text-white font-medium">Nota:</span> As integrações usam OAuth 2.0 para conectar com segurança.
          Seus tokens são criptografados e nunca expostos no frontend. Para conectar, você precisa ter uma conta de vendedor
          ativa em cada plataforma e preencher as credenciais de API em <code className="text-[#A78BFA]">.env.local</code>.
        </p>
      </div>
    </div>
  )
}
