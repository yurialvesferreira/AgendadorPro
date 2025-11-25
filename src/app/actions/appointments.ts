'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { AppointmentInsert, AppointmentUpdate } from '@/types/database'

/**
 * Server Actions para gerenciar agendamentos
 * Todas as ações mantém acessibilidade e validação
 */

type ActionResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string }

/**
 * Busca todos os agendamentos do usuário
 */
export async function getAppointments(): Promise<ActionResponse<any[]>> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Não autenticado' }
  }

  const { data, error } = await supabase
    .from('appointments_with_client')
    .select('*')
    .eq('user_id', user.id)
    .order('start_time', { ascending: true })

  if (error) {
    return { success: false, error: 'Erro ao buscar agendamentos' }
  }

  return { success: true, data: data || [] }
}

/**
 * Busca um agendamento específico
 */
export async function getAppointment(id: string): Promise<ActionResponse<any>> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Não autenticado' }
  }

  const { data, error } = await supabase
    .from('appointments_with_client')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error) {
    return { success: false, error: 'Erro ao buscar agendamento' }
  }

  return { success: true, data }
}

/**
 * Cria um novo agendamento
 */
export async function createAppointment(
  formData: FormData
): Promise<ActionResponse<string>> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Não autenticado' }
  }

  const appointment: AppointmentInsert = {
    user_id: user.id,
    client_id: formData.get('client_id') as string | null,
    title: formData.get('title') as string,
    description: formData.get('description') as string | null,
    location: formData.get('location') as string | null,
    start_time: formData.get('start_time') as string,
    end_time: formData.get('end_time') as string,
    status: (formData.get('status') as any) || 'scheduled',
    color: (formData.get('color') as string) || '#0066cc',
    send_reminder: formData.get('send_reminder') === 'true',
    reminder_sent_at: null,
  }

  // Validações básicas
  if (!appointment.title || appointment.title.trim().length < 3) {
    return { success: false, error: 'Título deve ter no mínimo 3 caracteres' }
  }

  if (!appointment.start_time || !appointment.end_time) {
    return { success: false, error: 'Datas são obrigatórias' }
  }

  if (new Date(appointment.end_time) <= new Date(appointment.start_time)) {
    return { success: false, error: 'Data final deve ser após data inicial' }
  }

  const { data, error } = await supabase
    .from('appointments')
    .insert(appointment)
    .select('id')
    .single()

  if (error) {
    return { success: false, error: 'Erro ao criar agendamento' }
  }

  revalidatePath('/agendamentos')
  return { success: true, data: data.id }
}

/**
 * Atualiza um agendamento existente
 */
export async function updateAppointment(
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

  const updates: AppointmentUpdate = {}

  // Atualiza apenas campos enviados
  const fields = [
    'client_id',
    'title',
    'description',
    'location',
    'start_time',
    'end_time',
    'status',
    'color',
  ]

  fields.forEach((field) => {
    const value = formData.get(field)
    if (value !== null) {
      ;(updates as any)[field] = value
    }
  })

  if (formData.has('send_reminder')) {
    updates.send_reminder = formData.get('send_reminder') === 'true'
  }

  const { error } = await supabase
    .from('appointments')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { success: false, error: 'Erro ao atualizar agendamento' }
  }

  revalidatePath('/agendamentos')
  return { success: true }
}

/**
 * Deleta um agendamento
 */
export async function deleteAppointment(id: string): Promise<ActionResponse> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Não autenticado' }
  }

  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { success: false, error: 'Erro ao deletar agendamento' }
  }

  revalidatePath('/agendamentos')
  return { success: true }
}

/**
 * Cancela um agendamento (soft delete)
 */
export async function cancelAppointment(id: string): Promise<ActionResponse> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Não autenticado' }
  }

  const { error } = await supabase
    .from('appointments')
    .update({ status: 'cancelled' })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { success: false, error: 'Erro ao cancelar agendamento' }
  }

  revalidatePath('/agendamentos')
  return { success: true }
}
