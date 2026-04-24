'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Zap, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react'

export default function RecuperarSenhaPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/nova-senha`,
      })
      if (error) throw error
      setSent(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar email. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6B00]/10">
              <CheckCircle2 className="h-8 w-8 text-[#FF6B00]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Email enviado!</h1>
          <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
            Enviamos um link de redefinição para{' '}
            <span className="text-foreground font-medium">{email}</span>.
            <br />
            Verifique sua caixa de entrada e spam.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex items-center gap-2 text-sm text-[#FF6B00] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar para o login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF6B00]">
              <Zap className="h-5 w-5 text-black" fill="black" />
            </div>
            <span className="text-xl font-black">Ninja Box</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Recuperar senha</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Digite seu email e enviaremos um link de redefinição
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1.5">
                Email da conta
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 outline-none transition focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] py-3 text-sm font-bold text-black transition hover:bg-[#FF8C00] disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? 'Enviando...' : 'Enviar link de redefinição'}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  )
}
