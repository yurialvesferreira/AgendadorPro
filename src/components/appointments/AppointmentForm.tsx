'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { DateTimeInput } from '@/components/ui/DateTimeInput'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { createAppointment, updateAppointment } from '@/app/actions/appointments'
import type { AppointmentWithClient, Client } from '@/types/database'

/**
 * Formulário de Agendamento - Totalmente Acessível WCAG 2.1/2.2 AA
 *
 * Características de acessibilidade:
 * - Modal com focus trap
 * - Labels associados a todos os campos
 * - Validação client e server-side
 * - Mensagens de erro acessíveis
 * - Estados de loading claros
 * - Progressive enhancement
 */

interface AppointmentFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  appointment?: AppointmentWithClient | null
  clients: Client[]
}

export function AppointmentForm({
  isOpen,
  onClose,
  onSuccess,
  appointment,
  clients,
}: AppointmentFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const isEditing = !!appointment

  // Reset form state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setError(null)
      setSuccess(false)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const result = isEditing
        ? await updateAppointment(appointment.id, formData)
        : await createAppointment(formData)

      if (!result.success) {
        setError(result.error)
        setIsLoading(false)
        return
      }

      // Sucesso!
      setSuccess(true)
      setIsLoading(false)

      // Aguarda um pouco antes de fechar para mostrar mensagem de sucesso
      setTimeout(() => {
        onSuccess?.()
        onClose()
      }, 1500)
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
      setIsLoading(false)
    }
  }

  // Opções de status
  const statusOptions = [
    { value: 'scheduled', label: 'Agendado' },
    { value: 'confirmed', label: 'Confirmado' },
    { value: 'cancelled', label: 'Cancelado' },
    { value: 'completed', label: 'Concluído' },
  ]

  // Opções de clientes
  const clientOptions = [
    { value: '', label: 'Nenhum cliente' },
    ...clients.map((client) => ({
      value: client.id,
      label: client.name,
    })),
  ]

  // Cores disponíveis para o agendamento
  const colorOptions = [
    { value: '#0066cc', label: 'Azul (Padrão)' },
    { value: '#28A745', label: 'Verde' },
    { value: '#DC3545', label: 'Vermelho' },
    { value: '#856404', label: 'Amarelo Escuro' },
    { value: '#6b7280', label: 'Cinza' },
    { value: '#9333ea', label: 'Roxo' },
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar Agendamento' : 'Novo Agendamento'}
      description={
        isEditing
          ? 'Atualize as informações do agendamento'
          : 'Preencha os dados para criar um novo agendamento'
      }
      size="lg"
    >
      {success && (
        <div className="mb-6">
          <Alert variant="success" title="Sucesso!">
            {isEditing
              ? 'Agendamento atualizado com sucesso'
              : 'Agendamento criado com sucesso'}
          </Alert>
        </div>
      )}

      {error && (
        <div className="mb-6">
          <Alert variant="error" title="Erro" onClose={() => setError(null)}>
            {error}
          </Alert>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Título */}
        <Input
          label="Título"
          name="title"
          id="appointment-title"
          required
          defaultValue={appointment?.title}
          helperText="Nome do agendamento ou serviço"
          placeholder="Ex: Consulta, Reunião, Atendimento"
        />

        {/* Cliente */}
        <Select
          label="Cliente"
          name="client_id"
          id="appointment-client"
          options={clientOptions}
          defaultValue={appointment?.client_id || ''}
          helperText="Selecione um cliente (opcional)"
        />

        {/* Data e Hora de Início */}
        <DateTimeInput
          label="Data e Hora de Início"
          name="start_time"
          id="appointment-start"
          type="datetime-local"
          required
          defaultValue={
            appointment?.start_time
              ? format(new Date(appointment.start_time), "yyyy-MM-dd'T'HH:mm")
              : ''
          }
          helperText="Quando o agendamento começa"
        />

        {/* Data e Hora de Término */}
        <DateTimeInput
          label="Data e Hora de Término"
          name="end_time"
          id="appointment-end"
          type="datetime-local"
          required
          defaultValue={
            appointment?.end_time
              ? format(new Date(appointment.end_time), "yyyy-MM-dd'T'HH:mm")
              : ''
          }
          helperText="Quando o agendamento termina"
        />

        {/* Descrição */}
        <Textarea
          label="Descrição"
          name="description"
          id="appointment-description"
          defaultValue={appointment?.description || ''}
          rows={3}
          helperText="Informações adicionais sobre o agendamento (opcional)"
          placeholder="Ex: Observações, procedimentos, preparação necessária..."
        />

        {/* Localização */}
        <Input
          label="Localização"
          name="location"
          id="appointment-location"
          defaultValue={appointment?.location || ''}
          helperText="Onde o agendamento acontecerá (opcional)"
          placeholder="Ex: Sala 1, Online, Endereço"
        />

        {/* Status (apenas ao editar) */}
        {isEditing && (
          <Select
            label="Status"
            name="status"
            id="appointment-status"
            options={statusOptions}
            defaultValue={appointment?.status || 'scheduled'}
            helperText="Status atual do agendamento"
          />
        )}

        {/* Cor */}
        <Select
          label="Cor"
          name="color"
          id="appointment-color"
          options={colorOptions}
          defaultValue={appointment?.color || '#0066cc'}
          helperText="Cor para identificação no calendário"
        />

        {/* Enviar Lembrete */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="send-reminder"
              name="send_reminder"
              type="checkbox"
              defaultChecked={appointment?.send_reminder ?? true}
              value="true"
              className="h-4 w-4 text-primary-500 focus-visible:ring-primary-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="send-reminder" className="font-medium text-gray-900">
              Enviar lembrete
            </label>
            <p className="text-gray-600">
              Enviar lembrete automático por e-mail antes do agendamento
            </p>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            isLoading={isLoading}
            loadingText={isEditing ? 'Salvando...' : 'Criando...'}
          >
            {isEditing ? 'Salvar Alterações' : 'Criar Agendamento'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
