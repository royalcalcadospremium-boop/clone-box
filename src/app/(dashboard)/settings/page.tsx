'use client'

import { useState, useEffect } from 'react'
import { Loader2, CheckCircle2, Link2, Copy, Check, AlertCircle } from 'lucide-react'

export default function SettingsPage() {
  const [profile, setProfile] = useState<{
    full_name: string | null
    email: string
    company_name: string | null
    phone: string | null
    referral_code: string
  } | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ full_name: '', company_name: '', phone: '' })

  useEffect(() => {
    async function load() {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('profiles')
        .select('full_name, email, company_name, phone, referral_code')
        .eq('id', user.id)
        .single()

      if (data) {
        setProfile(data)
        setForm({
          full_name: data.full_name ?? '',
          company_name: data.company_name ?? '',
          phone: data.phone ?? '',
        })
      }
    }
    load()
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    setSaveError('')

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setSaveError('Sessão expirada. Faça login novamente.')
        return
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: form.full_name || null,
          company_name: form.company_name || null,
          phone: form.phone || null,
        })
        .eq('id', user.id)

      if (updateError) throw updateError
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Erro ao salvar. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteAccount() {
    const confirmed = confirm(
      'Tem certeza? Esta ação é irreversível. Todos os seus vídeos e créditos serão removidos permanentemente.'
    )
    if (!confirmed) return
    // TODO: Implementar exclusão de conta via API
    window.location.href = 'mailto:suporte@ninjabox.com.br?subject=Solicitação de exclusão de conta'
  }

  function copyReferralLink() {
    if (!profile?.referral_code) return
    const link = `${window.location.origin}/signup?ref=${profile.referral_code}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const referralLink = profile?.referral_code
    ? `${typeof window !== 'undefined' ? window.location.origin : 'https://ninjabox.com.br'}/signup?ref=${profile.referral_code}`
    : ''

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-black">Configurações</h1>
        <p className="mt-1 text-sm text-white/50">Gerencie suas informações pessoais</p>
      </div>

      {/* Perfil */}
      <div className="rounded-2xl border border-white/5 bg-[#111111] p-6">
        <h2 className="font-bold mb-5">Informações do perfil</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">Email</label>
            <input
              type="email"
              value={profile?.email ?? ''}
              disabled
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/40 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-white/30">O email não pode ser alterado</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">Nome completo</label>
            <input
              type="text"
              value={form.full_name}
              onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
              placeholder="Fellipe Silva"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ffff00]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">Nome da loja</label>
            <input
              type="text"
              value={form.company_name}
              onChange={(e) => setForm((f) => ({ ...f, company_name: e.target.value }))}
              placeholder="Royal Calçados"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ffff00]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/60 mb-1.5">Telefone / WhatsApp</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="(11) 99999-9999"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#ffff00]"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-[#ffff00] px-5 py-2.5 text-sm font-bold text-black disabled:opacity-50 hover:bg-[#ffff56] transition"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? 'Salvando...' : 'Salvar alterações'}
            </button>
            {saved && (
              <div className="flex items-center gap-1.5 text-sm text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                Salvo!
              </div>
            )}
            {saveError && (
              <div className="flex items-center gap-1.5 text-sm text-red-400">
                <AlertCircle className="h-4 w-4" />
                {saveError}
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Referral */}
      <div className="rounded-2xl border border-white/5 bg-[#111111] p-6">
        <h2 className="font-bold mb-1">Seu link de indicação</h2>
        <p className="text-sm text-white/40 mb-4">
          Indique amigos e ganhe <span className="text-[#ffff00] font-semibold">100 créditos</span> para cada assinatura convertida.
          Seu amigo ganha <span className="text-[#ffff00] font-semibold">50 créditos</span> de bônus.
        </p>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <Link2 className="h-4 w-4 text-white/30 shrink-0" />
            <span className="text-sm text-white/60 truncate">{referralLink}</span>
          </div>
          <button
            onClick={copyReferralLink}
            className="flex items-center gap-2 rounded-xl border border-[#ffff00]/30 bg-[#ffff00]/10 px-4 py-3 text-sm font-medium text-[#ffff00] hover:bg-[#ffff00]/20 transition"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      {/* Zona de perigo */}
      <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-6">
        <h2 className="font-bold text-red-400 mb-1">Zona de perigo</h2>
        <p className="text-sm text-white/40 mb-4">
          A exclusão da conta remove permanentemente todos os seus dados, vídeos e créditos. Esta ação não pode ser desfeita.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="rounded-xl border border-red-500/30 px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
        >
          Solicitar exclusão de conta
        </button>
      </div>
    </div>
  )
}
