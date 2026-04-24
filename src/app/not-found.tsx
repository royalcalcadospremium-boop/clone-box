import Link from 'next/link'
import { FileQuestion, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
            <FileQuestion className="h-8 w-8 text-white/40" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-black text-white">404</h1>
          <p className="mt-2 text-sm text-white/50">
            Página não encontrada. Verifique o endereço ou volte para o início.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl gradient-purple px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Dashboard
        </Link>
      </div>
    </div>
  )
}
