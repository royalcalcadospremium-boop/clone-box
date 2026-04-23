import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { validateCPF } from '@/lib/utils/cpf'

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

    // Envia email de confirmação
    await admin.auth.admin.generateLink({
      type: 'signup',
      email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 })
    }
    console.error('signup error:', error)
    return NextResponse.json({ error: 'Erro ao criar conta. Tente novamente.' }, { status: 500 })
  }
}
