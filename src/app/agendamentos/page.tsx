import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AppointmentsList } from '@/components/appointments/AppointmentsList'

/**
 * Página de Agendamentos (Dashboard)
 *
 * Server Component com dados buscados no servidor
 * Mantém acessibilidade total mesmo sendo server-side
 */
export default async function AgendamentosPage() {
  const supabase = createClient()

  // Verifica autenticação
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Busca perfil do usuário
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Busca agendamentos
  const { data: appointments } = await supabase
    .from('appointments_with_client')
    .select('*')
    .eq('user_id', user.id)
    .order('start_time', { ascending: true })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1 bg-gray-50">
        <div className="container-accessible py-8">
          {/* Cabeçalho da página */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Olá, {profile?.full_name || 'Usuário'}!
            </h1>
            <p className="text-lg text-gray-600">
              Gerencie seus agendamentos e compromissos
            </p>
          </div>

          {/* Lista de agendamentos */}
          <AppointmentsList initialAppointments={appointments || []} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
