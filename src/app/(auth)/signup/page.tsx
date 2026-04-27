'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Zap, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react'
import { formatCPF, validateCPF } from '@/lib/utils/cpf'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [cpf, setCpf] = useState('')
  const [cpfError, setCpfError] = useState('')

  function handleCPFChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatCPF(e.target.value)
    setCpf(formatted)
    if (formatted.replace(/\D/g, '').length === 11) {
      setCpfError(validateCPF(formatted) ? '' : 'CPF inválido')
    } else {
      setCpfError('')
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    if (!validateCPF(cpf)) {
      setCpfError('CPF inválido')
      return
    }

    setLoading(true)
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, cpf }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d1fe17]/10">
              <CheckCircle2 className="h-8 w-8 text-[#d1fe17]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Confirme seu email</h1>
          <p className="mt-3 text-muted-foreground">
            Enviamos um link de confirmação para o seu email. Clique nele para ativar sua conta e
            receber seus <span className="text-[#d1fe17] font-semibold">20 créditos grátis</span>.
          </p>
          <Link href="/login" className="mt-8 inline-block text-sm text-[#d1fe17] hover:underline">
            Voltar para o login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121212] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d1fe17]">
              <Zap className="h-5 w-5 text-black" fill="black" />
            </div>
            <span className="text-xl font-black">Ninja Box</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Criar conta grátis</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ganhe <span className="text-[#d1fe17]">20 créditos grátis</span> para começar
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8">
          <button
            onClick={handleGoogle}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-muted py-3 text-sm font-medium transition hover:bg-secondary"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Entrar com Google
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">ou com email</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1.5">
                Nome completo
              </label>
              <input
                id="name" name="name" type="text" required placeholder="Fellipe Silva"
                className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 outline-none transition focus:border-[#d1fe17] focus:ring-1 focus:ring-[#d1fe17]"
              />
            </div>

            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-muted-foreground mb-1.5">
                CPF
              </label>
              <input
                id="cpf" name="cpf" type="text" required
                placeholder="000.000.000-00"
                value={cpf}
                onChange={handleCPFChange}
                className={`w-full rounded-xl border bg-muted px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 outline-none transition focus:ring-1 ${
                  cpfError
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-border focus:border-[#d1fe17] focus:ring-[#d1fe17]'
                }`}
              />
              {cpfError && <p className="mt-1 text-xs text-red-400">{cpfError}</p>}
              <p className="mt-1 text-xs text-muted-foreground">Usado para evitar contas duplicadas</p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1.5">
                Email
              </label>
              <input
                id="email" name="email" type="email" required placeholder="seu@email.com"
                className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder-muted-foreground/50 outline-none transition focus:border-[#d1fe17] focus:ring-1 focus:ring-[#d1fe17]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1.5">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password" name="password"
                  type={showPassword ? 'text' : 'password'}
                  required minLength={8} placeholder="Mínimo 8 caracteres"
                  className="w-full rounded-xl border border-border bg-muted px-4 py-3 pr-10 text-sm text-foreground placeholder-muted-foreground/50 outline-none transition focus:border-[#d1fe17] focus:ring-1 focus:ring-[#d1fe17]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading || !!cpfError}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d1fe17] py-3 text-sm font-bold text-black transition hover:bg-[#c4f000] disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? 'Criando conta...' : 'Criar conta e ganhar 20 créditos'}
            </button>

            <p className="text-center text-xs text-white/30">
              Ao criar uma conta, você concorda com os{' '}
              <Link href="/termos" className="text-white/50 hover:text-white">Termos de Uso</Link>{' '}
              e a{' '}
              <Link href="/privacidade" className="text-white/50 hover:text-white">Política de Privacidade</Link>.
            </p>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Já tem conta?{' '}
          <Link href="/login" className="text-[#d1fe17] hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  )
}
