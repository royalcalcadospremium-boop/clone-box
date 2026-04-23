import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ videoId: string }> }
) {
  const { videoId } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

  const { data: video } = await supabase
    .from('videos')
    .select('id, status, output_video_url, thumbnail_url, error_message, credits_spent')
    .eq('id', videoId)
    .eq('user_id', user.id)
    .single()

  if (!video) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })

  return NextResponse.json(video)
}
