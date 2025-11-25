'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { ClientInsert, ClientUpdate } from '@/types/database'

/**
 * Server Actions para gerenciar clientes
 */

type ActionResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string }

/**
 * Busca todos os clientes do usuário
 */
export async function getClients(): Promise<ActionResponse<any[]>> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Não autenticado' }
  }

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id)
    .order('name', { ascending: true })

  if (error) {
    return { success: false, error: 'Erro ao buscar clientes' }
  }

  return { success: true, data: data || [] }
}

/**
 * Cria um novo cliente
 */
export async function createClient(formData: FormData): Promise<ActionResponse<string>> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Não autenticado' }
  }

  const client: ClientInsert = {
    user_id: user.id,
    name: formData.get('name') as string,
    email: formData.get('email') as string | null,
    phone: formData.get('phone') as string | null,
    notes: formData.get('notes') as string | null,
  }

  // Validações
  if (!client.name || client.name.trim().length < 3) {
    return { success: false, error: 'Nome deve ter no mínimo 3 caracteres' }
  }

  const { data, error } = await supabase
    .from('clients')
    .insert(client)
    .select('id')
    .single()

  if (error) {
    return { success: false, error: 'Erro ao criar cliente' }
  }

  revalidatePath('/clientes')
  return { success: true, data: data.id }
}

/**
 * Atualiza um cliente existente
 */
export async function updateClient(
  id: string,
  formData: FormData
): Promise<ActionResponse> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Não autenticado' }
  }

  const updates: ClientUpdate = {
    name: formData.get('name') as string,
    email: formData.get('email') as string | null,
    phone: formData.get('phone') as string | null,
    notes: formData.get('notes') as string | null,
  }

  if (updates.name && updates.name.trim().length < 3) {
    return { success: false, error: 'Nome deve ter no mínimo 3 caracteres' }
  }

  const { error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { success: false, error: 'Erro ao atualizar cliente' }
  }

  revalidatePath('/clientes')
  return { success: true }
}

/**
 * Deleta um cliente
 */
export async function deleteClient(id: string): Promise<ActionResponse> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Não autenticado' }
  }

  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { success: false, error: 'Erro ao deletar cliente' }
  }

  revalidatePath('/clientes')
  return { success: true }
}
