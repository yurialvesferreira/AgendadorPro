
import React, { useState, useEffect, useCallback } from 'react';
import { TimeSlot } from '../../types';
import { useBooking } from '../../services/bookingService';
import { Spinner } from '../ui/Spinner';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

const AgendaManager: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [slotsForDay, setSlotsForDay] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getSlotsForDayManagement, toggleSlotBlock, addToast } = useBooking();

  const fetchSlots = useCallback(async (date: Date) => {
    setIsLoading(true);
    setError(null);
    try {
      const slots = await getSlotsForDayManagement(date);
      setSlotsForDay(slots);
    } catch (err) {
      setError('Falha ao carregar horários.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [getSlotsForDayManagement]);

  useEffect(() => {
    fetchSlots(selectedDate);
  }, [selectedDate, fetchSlots]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value + 'T00:00:00'); // Ensure local timezone
    setSelectedDate(date);
  };

  const handleToggleBlock = async (slotId: string, currentlyBlocked: boolean) => {
    try {
      await toggleSlotBlock(slotId, !currentlyBlocked);
      addToast(`Horário ${!currentlyBlocked ? 'bloqueado' : 'desbloqueado'} com sucesso.`, 'success');
      // Refetch slots to show updated state
      fetchSlots(selectedDate);
    } catch (err) {
      setError('Falha ao atualizar horário.');
      addToast('Erro ao atualizar horário.', 'error');
      console.error(err);
    }
  };
  
  const today = new Date();
  today.setHours(0,0,0,0);

  return (
    <Card>
      <h2 className="text-2xl font-semibold text-teal-400 mb-6">Gerenciar Minha Agenda</h2>
      <div className="mb-6">
        <label htmlFor="agenda-date" className="block text-sm font-medium text-slate-300 mb-1">Escolha uma data para gerenciar:</label>
        <Input 
          type="date" 
          id="agenda-date" 
          value={selectedDate.toISOString().split('T')[0]}
          min={today.toISOString().split('T')[0]} // Optional: allow managing past dates for records? For now, only future.
          onChange={handleDateChange} 
          className="w-full md:w-1/2"
        />
      </div>

      {isLoading && <Spinner message="Carregando horários..." />}
      {error && <Alert type="error" message={error} />}
      
      {!isLoading && !error && slotsForDay.length === 0 && (
        <p className="text-slate-400">Nenhum horário gerado para esta data (verifique as configurações de horário comercial).</p>
      )}

      {!isLoading && slotsForDay.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-slate-200 mb-3">Horários para {selectedDate.toLocaleDateString('pt-BR')}:</h3>
          <p className="text-xs text-slate-400 mb-4">Clique em um horário para bloquear ou desbloquear. Horários já agendados por clientes não podem ser bloqueados aqui.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {slotsForDay.map(slot => (
              <Button
                key={slot.id}
                onClick={() => !slot.isBooked && handleToggleBlock(slot.id, slot.isBlockedByProvider)}
                disabled={slot.isBooked} // Cannot block/unblock if already booked by a client
                className={`w-full text-center transition-all duration-200
                  ${slot.isBooked ? 'bg-red-700 hover:bg-red-600 cursor-not-allowed text-white' : 
                    slot.isBlockedByProvider ? 'bg-yellow-600 hover:bg-yellow-500 text-white' : 
                    'bg-slate-600 hover:bg-slate-500 text-slate-100'}`}
                title={slot.isBooked ? "Agendado por cliente" : slot.isBlockedByProvider ? "Bloqueado por você (Clique para desbloquear)" : "Disponível (Clique para bloquear)"}
              >
                {slot.startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                {slot.isBooked && <span className="block text-xs">(Agendado)</span>}
                {!slot.isBooked && slot.isBlockedByProvider && <span className="block text-xs">(Bloqueado)</span>}
              </Button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default AgendaManager;
