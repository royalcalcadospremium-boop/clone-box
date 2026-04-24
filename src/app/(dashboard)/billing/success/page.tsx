import { redirect } from 'next/navigation'
import { stripe } from '@/lib/payments/stripe'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Props {
  searchParams: Promise<{ session_id?: string }>
}

export default async function BillingSuccessPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams

  if (!sessionId) {
    redirect('/billing')
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') {
      redirect('/billing')
    }
  } catch {
    redirect('/billing')
  }

  return (
    <div className="max-w-md mx-auto mt-20 text-center space-y-6">
      <div className="flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle2 className="h-8 w-8 text-green-400" />
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold text-white">Pagamento confirmado!</h1>
        <p className="mt-2 text-sm text-white/50">
          Seus créditos foram adicionados à conta. Você será redirecionado em instantes...
        </p>
      </div>
      <Link
        href="/billing"
        className="inline-flex items-center gap-2 rounded-xl gradient-purple px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 transition"
      >
        Ir para Planos
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
