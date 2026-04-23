import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { validateCPF } from '@/lib/utils/cpf'
import { Resend } from 'resend'

const schema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  cpf: z.string().min(11),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, cpf } = schema.parse(body)

    const cpfDigits = cpf.replace(/\D/g, '')

    if (!validateCPF(cpfDigits)) {
      return NextResponse.json({ error: 'CPF inválido.' }, { status: 400 })
    }

    const admin = createAdminClient()

    // Verifica se CPF já existe
    const { data: existing } = await admin
      .from('profiles')
      .select('id')
      .eq('cpf_cnpj', cpfDigits)
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        { error: 'Este CPF já está cadastrado. Se você já tem conta, faça login.' },
        { status: 409 }
      )
    }

    // Cria o usuário
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      user_metadata: { full_name: name, cpf: cpfDigits },
    })

    if (error) {
      if (error.message.includes('already registered')) {
        return NextResponse.json({ error: 'Este email já está cadastrado.' }, { status: 409 })
      }
      throw error
    }

    // Salva o CPF no perfil
    await admin
      .from('profiles')
      .update({ cpf_cnpj: cpfDigits })
      .eq('id', data.user.id)

    // Gera link de confirmação e envia via Resend
    const { data: linkData } = await admin.auth.admin.generateLink({
      type: 'signup',
      email,
      password,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    if (linkData?.properties?.action_link) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'CloneBox <onboarding@resend.dev>',
        to: email,
        subject: 'Confirme seu email — CloneBox',
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#121212;color:#fff;padding:32px;border-radius:16px;">
            <h2 style="color:#1DB954;margin-bottom:8px;">Bem-vindo ao CloneBox!</h2>
            <p style="color:#aaa;">Olá ${name}, sua conta foi criada com sucesso.</p>
            <p style="color:#aaa;">Clique no botão abaixo para confirmar seu email e ativar seus <strong style="color:#1DB954;">20 créditos grátis</strong>:</p>
            <a href="${linkData.properties.action_link}"
               style="display:inline-block;background:#1DB954;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:15px;margin-top:16px;">
              Confirmar email e ativar créditos
            </a>
            <p style="margin-top:32px;color:#555;font-size:12px;">
              Se você não criou uma conta no CloneBox, ignore este email.
            </p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
    }
    console.error('signup error:', error)
    return NextResponse.json({ error: 'Erro ao criar conta. Tente novamente.' }, { status: 500 })
  }
}
