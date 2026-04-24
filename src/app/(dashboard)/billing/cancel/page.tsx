'use client'

import { useRouter } from 'next/navigation'
import { XCircle, ArrowLeft } from 'lucide-react'

export default function BillingCancelPage() {
  const router = useRouter()

  return (
    <div className="max-w-md mx-auto mt-20 text-center space-y-6">
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
          <XCircle className="h-8 w-8 text-red-400" />
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold text-white">Pagamento cancelado</h1>
        <p className="mt-2 text-sm text-white/50">
          Não se preocupe, nenhuma cobrança foi realizada. Você pode tentar novamente quando quiser.
        </p>
      </div>
      <button
        onClick={() => router.push('/billing')}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-bold text-white hover:border-[#FF6B00] hover:text-[#FF6B00] transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para Planos
      </button>
    </div>
  )
}
