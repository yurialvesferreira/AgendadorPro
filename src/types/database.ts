/**
 * Tipos TypeScript para o banco de dados Supabase
 * Gerados a partir do schema PostgreSQL
 */

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'cancelled' | 'completed'

export interface Profile {
  id: string
  full_name: string
  phone: string | null
  avatar_url: string | null
  business_name: string | null
  business_type: string | null
  timezone: string
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  user_id: string
  name: string
  email: string | null
  phone: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  user_id: string
  client_id: string | null
  title: string
  description: string | null
  location: string | null
  start_time: string
  end_time: string
  status: AppointmentStatus
  color: string
  send_reminder: boolean
  reminder_sent_at: string | null
  created_at: string
  updated_at: string
}

export interface AppointmentNote {
  id: string
  appointment_id: string
  user_id: string
  note: string
  created_at: string
}

// Tipos para inserção (sem campos auto-gerados)
export type ProfileInsert = Omit<Profile, 'created_at' | 'updated_at'>
export type ClientInsert = Omit<Client, 'id' | 'created_at' | 'updated_at'>
export type AppointmentInsert = Omit<Appointment, 'id' | 'created_at' | 'updated_at'>
export type AppointmentNoteInsert = Omit<AppointmentNote, 'id' | 'created_at'>

// Tipos para atualização (todos os campos opcionais)
export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
export type ClientUpdate = Partial<Omit<Client, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
export type AppointmentUpdate = Partial<Omit<Appointment, 'id' | 'user_id' | 'created_at' | 'updated_at'>>

// View com join de cliente
export interface AppointmentWithClient extends Appointment {
  client_name: string | null
  client_email: string | null
  client_phone: string | null
}

// Tipo para o Supabase Database
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: ProfileInsert
        Update: ProfileUpdate
      }
      clients: {
        Row: Client
        Insert: ClientInsert
        Update: ClientUpdate
      }
      appointments: {
        Row: Appointment
        Insert: AppointmentInsert
        Update: AppointmentUpdate
      }
      appointment_notes: {
        Row: AppointmentNote
        Insert: AppointmentNoteInsert
        Update: Partial<AppointmentNoteInsert>
      }
    }
    Views: {
      appointments_with_client: {
        Row: AppointmentWithClient
      }
    }
  }
}
