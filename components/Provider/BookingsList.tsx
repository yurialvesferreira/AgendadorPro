
import React, { useState, useMemo } from 'react';
import { useBooking } from '../../services/bookingService';
import { Booking } from '../../types';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

const BookingsList: React.FC = () => {
  const { bookings } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  const filteredBookings = useMemo(() => {
    const now = new Date();
    return bookings
      .filter(booking => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const matchesSearch = 
          booking.clientName.toLowerCase().includes(lowerSearchTerm) ||
          booking.serviceName.toLowerCase().includes(lowerSearchTerm) ||
          booking.clientEmail.toLowerCase().includes(lowerSearchTerm) ||
          booking.zipCode.toLowerCase().includes(lowerSearchTerm) ||
          booking.street.toLowerCase().includes(lowerSearchTerm) ||
          booking.neighborhood.toLowerCase().includes(lowerSearchTerm) ||
          booking.city.toLowerCase().includes(lowerSearchTerm) ||
          booking.state.toLowerCase().includes(lowerSearchTerm);

        if (!matchesSearch) return false;

        if (filter === 'upcoming') return booking.startTime >= now;
        if (filter === 'past') return booking.startTime < now;
        return true; // 'all'
      })
      .sort((a, b) => {
        if (filter === 'upcoming') return a.startTime.getTime() - b.startTime.getTime(); 
        return b.startTime.getTime() - a.startTime.getTime(); 
      });
  }, [bookings, searchTerm, filter]);

  return (
    <Card>
      <h2 className="text-2xl font-semibold text-teal-400 mb-6">Meus Agendamentos</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          type="text"
          placeholder="Buscar por cliente, serviço, email, endereço..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value as 'all' | 'upcoming' | 'past')}
          className="bg-slate-700 border border-slate-600 text-slate-100 rounded-md p-2.5 focus:ring-teal-500 focus:border-teal-500 transition-colors"
          aria-label="Filtrar agendamentos"
        >
          <option value="upcoming">Próximos</option>
          <option value="past">Passados</option>
          <option value="all">Todos</option>
        </select>
      </div>

      {filteredBookings.length === 0 ? (
        <p className="text-slate-400">Nenhum agendamento encontrado com os filtros atuais.</p>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking: Booking) => (
            <div key={booking.id} className="bg-slate-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-teal-300">{booking.serviceName}</h3>
              <p className="text-sm text-slate-300">Cliente: {booking.clientName} ({booking.clientEmail})</p>
              {booking.clientPhone && <p className="text-sm text-slate-300">Telefone: {booking.clientPhone}</p>}
              <p className="text-sm text-slate-300">
                Endereço: {booking.street}, {booking.number}{booking.complement ? `, ${booking.complement}` : ''} - {booking.neighborhood}, {booking.city} - {booking.state}, CEP: {booking.zipCode}
              </p>
              <p className="text-sm text-slate-300">
                Horário: {booking.startTime.toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })} 
                {' - '} 
                {booking.endTime.toLocaleTimeString('pt-BR', { timeStyle: 'short' })}
              </p>
              {booking.notes && <p className="text-xs text-slate-400 mt-1 italic">Observações: {booking.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default BookingsList;