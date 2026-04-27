import { createClient } from '@/lib/supabase/server'
import { DashboardExplore } from '@/components/higgsfield/DashboardExplore'

export default async function DashboardHome() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('credits_balance, credits_bonus_balance, full_name, plan')
    .eq('id', user!.id)
    .single()

  const { data: recentVideos } = await supabase
    .from('videos')
    .select('id, status, output_video_url, thumbnail_url, style, created_at, credits_spent, duration')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(20)

  const totalCredits = (profile?.credits_balance ?? 0) + (profile?.credits_bonus_balance ?? 0)
  const firstName = profile?.full_name?.split(' ')[0] ?? 'Criador'

  return (
    <DashboardExplore
      videos={recentVideos ?? []}
      firstName={firstName}
      totalCredits={totalCredits}
    />
  )
}
