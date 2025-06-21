
import React, { useEffect, useState } from 'react';
import { useBooking } from '../../services/bookingService';
import { Booking } from '../../types';
import { Card } from '../ui/Card';
import { Link } from 'react-router-dom';

const ProviderOverview: React.FC = () => {
  const { bookings, providerNotifications } = useBooking();
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [recentNotifications, setRecentNotifications] = useState<string[]>([]);

  useEffect(() => {
    const now = new Date();
    const futureBookings = bookings
      .filter(b => b.startTime >= now)
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
      .slice(0, 3); // Show next 3
    setUpcomingBookings(futureBookings);

    setRecentNotifications(providerNotifications.slice(-5).reverse()); // Show last 5
  }, [bookings, providerNotifications]);

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="text-2xl font-semibold text-teal-400 mb-4">Visão Geral Rápida</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-slate-200 mb-2">Próximos Agendamentos ({upcomingBookings.length})</h3>
            {upcomingBookings.length > 0 ? (
              <ul className="space-y-2 text-sm">
                {upcomingBookings.map(b => (
                  <li key={b.id} className="text-slate-300">
                    <span className="font-semibold">{b.serviceName}</span> com {b.clientName} <br />
                    <span className="text-xs text-teal-300">{b.startTime.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 text-sm">Nenhum agendamento futuro próximo.</p>
            )}
            <Link to="/provider/bookings" className="text-teal-400 hover:text-teal-300 text-sm mt-3 inline-block">Ver todos &rarr;</Link>
          </div>
          <div className="bg-slate-700 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-slate-200 mb-2">Notificações Recentes ({recentNotifications.length})</h3>
             {recentNotifications.length > 0 ? (
              <ul className="space-y-1 text-sm">
                {recentNotifications.map((n, i) => (
                  <li key={i} className="text-slate-300 text-xs p-1 bg-slate-600 rounded">📢 {n}</li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 text-sm">Nenhuma notificação recente.</p>
            )}
          </div>
        </div>
      </Card>
      
      <Card>
          <h2 className="text-xl font-semibold text-teal-400 mb-4">Ações Rápidas</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/provider/agenda" className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Gerenciar Minha Agenda
            </Link>
            <Link to="/book" className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Simular Agendamento Cliente
            </Link>
          </div>
      </Card>

      <div className="mt-8 p-6 bg-slate-800 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-slate-100 mb-3">Dica do Dia!</h3>
        <p className="text-slate-300 text-sm">
          Mantenha sua agenda atualizada para evitar conflitos e garantir a satisfação dos seus clientes. Bloqueios de horários são essenciais para seu controle pessoal.
        </p>
      </div>

    </div>
  );
};

export default ProviderOverview;

