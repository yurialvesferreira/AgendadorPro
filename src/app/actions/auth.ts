'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

/**
 * Server Actions para autenticação
 * Mantém acessibilidade através de progressive enhancement
 */

// Schemas de validação com Zod
const signUpSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  fullName: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
})

const signInSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

// Tipos de resposta
type ActionResponse =
  | { success: true; message?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string> }

/**
 * Cadastro de novo usuário
 */
export async function signUp(formData: FormData): Promise<ActionResponse> {
  const supabase = createClient()

  // Validação dos dados
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    fullName: formData.get('fullName') as string,
  }

  const validation = signUpSchema.safeParse(data)

  if (!validation.success) {
    const fieldErrors: Record<string, string> = {}
    validation.error.errors.forEach((error) => {
      if (error.path[0]) {
        fieldErrors[error.path[0] as string] = error.message
      }
    })

    return {
      success: false,
      error: 'Erro de validação',
      fieldErrors,
    }
  }

  // Criar usuário no Supabase
  const { error } = await supabase.auth.signUp({
    email: validation.data.email,
    password: validation.data.password,
    options: {
      data: {
        full_name: validation.data.fullName,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) {
    return {
      success: false,
      error: error.message === 'User already registered'
        ? 'Este e-mail já está cadastrado'
        : 'Erro ao criar conta. Tente novamente.',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=Verifique seu e-mail para confirmar o cadastro')
}

/**
 * Login de usuário
 */
export async function signIn(formData: FormData): Promise<ActionResponse> {
  const supabase = createClient()

  // Validação dos dados
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const validation = signInSchema.safeParse(data)

  if (!validation.success) {
    const fieldErrors: Record<string, string> = {}
    validation.error.errors.forEach((error) => {
      if (error.path[0]) {
        fieldErrors[error.path[0] as string] = error.message
      }
    })

    return {
      success: false,
      error: 'Erro de validação',
      fieldErrors,
    }
  }

  // Login
  const { error } = await supabase.auth.signInWithPassword(validation.data)

  if (error) {
    return {
      success: false,
      error: error.message === 'Invalid login credentials'
        ? 'E-mail ou senha incorretos'
        : 'Erro ao fazer login. Tente novamente.',
    }
  }

  revalidatePath('/', 'layout')

  // Redirecionar para página solicitada ou dashboard
  const redirectTo = formData.get('redirectTo') as string
  redirect(redirectTo || '/agendamentos')
}

/**
 * Logout de usuário
 */
export async function signOut(): Promise<void> {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

/**
 * Recuperação de senha
 */
export async function resetPassword(formData: FormData): Promise<ActionResponse> {
  const supabase = createClient()

  const email = formData.get('email') as string

  if (!email || !z.string().email().safeParse(email).success) {
    return {
      success: false,
      error: 'E-mail inválido',
    }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  })

  if (error) {
    return {
      success: false,
      error: 'Erro ao enviar e-mail de recuperação. Tente novamente.',
    }
  }

  return {
    success: true,
    message: 'Verifique seu e-mail para redefinir sua senha',
  }
}

/**
 * Atualizar senha
 */
export async function updatePassword(formData: FormData): Promise<ActionResponse> {
  const supabase = createClient()

  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    return {
      success: false,
      error: 'As senhas não coincidem',
    }
  }

  if (password.length < 8) {
    return {
      success: false,
      error: 'Senha deve ter no mínimo 8 caracteres',
    }
  }

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return {
      success: false,
      error: 'Erro ao atualizar senha. Tente novamente.',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/agendamentos?message=Senha atualizada com sucesso')
}
