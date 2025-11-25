'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import type { AppointmentWithClient } from '@/types/database'

/**
 * Lista de Agendamentos - Client Component
 *
 * Características de acessibilidade:
 * - Tabela semântica com cabeçalhos apropriados
 * - Botões de ação acessíveis
 * - Estados visuais claros
 * - Mensagens de feedback
 */

interface AppointmentsListProps {
  initialAppointments: AppointmentWithClient[]
}

export function AppointmentsList({ initialAppointments }: AppointmentsListProps) {
  const [appointments] = useState(initialAppointments)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      scheduled: 'Agendado',
      confirmed: 'Confirmado',
      cancelled: 'Cancelado',
      completed: 'Concluído',
    }
    return labels[status] || status
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      scheduled: 'bg-primary-100 text-primary-800',
      confirmed: 'bg-success-100 text-success-800',
      cancelled: 'bg-gray-100 text-gray-800',
      completed: 'bg-gray-200 text-gray-900',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-16 w-16 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          Nenhum agendamento ainda
        </h2>
        <p className="mt-2 text-gray-600">
          Comece criando seu primeiro agendamento.
        </p>
        <div className="mt-6">
          <Button variant="primary" size="lg">
            Criar Agendamento
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Mensagem de feedback */}
      {message && (
        <div className="mb-6">
          <Alert
            variant={message.type}
            onClose={() => setMessage(null)}
          >
            {message.text}
          </Alert>
        </div>
      )}

      {/* Ações do cabeçalho */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Seus Agendamentos
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {appointments.length} {appointments.length === 1 ? 'agendamento' : 'agendamentos'}
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="md">
            Filtrar
          </Button>
          <Button variant="primary" size="md">
            + Novo Agendamento
          </Button>
        </div>
      </div>

      {/* Tabela de agendamentos */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Data/Hora
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Título
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Cliente
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {format(new Date(appointment.start_time), "dd 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </div>
                    <div className="text-sm text-gray-600">
                      {format(new Date(appointment.start_time), 'HH:mm', {
                        locale: ptBR,
                      })}{' '}
                      -{' '}
                      {format(new Date(appointment.end_time), 'HH:mm', {
                        locale: ptBR,
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {appointment.title}
                    </div>
                    {appointment.description && (
                      <div className="text-sm text-gray-600 truncate max-w-xs">
                        {appointment.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {appointment.client_name || '-'}
                    </div>
                    {appointment.client_phone && (
                      <div className="text-sm text-gray-600">
                        {appointment.client_phone}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {getStatusLabel(appointment.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`Ver detalhes de ${appointment.title}`}
                      >
                        Ver
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`Editar ${appointment.title}`}
                      >
                        Editar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
