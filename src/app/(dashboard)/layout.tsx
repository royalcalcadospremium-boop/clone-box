import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TopNav } from '@/components/higgsfield/TopNav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (process.env.NEXT_PUBLIC_DESIGN_PREVIEW === '1') {
    return (
      <div className="min-h-screen bg-[#0f1011] text-white">
        <TopNav />
        <main className="min-h-[calc(100vh-58px)] overflow-x-hidden">
          {children}
        </main>
      </div>
    )
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile && !profile.onboarding_completed) {
    redirect('/onboarding')
  }

  return (
    <div className="min-h-screen bg-[#0f1011] text-white">
      <TopNav />
      <main className="min-h-[calc(100vh-58px)] overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
