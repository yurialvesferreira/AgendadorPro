
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AgendaManager from './AgendaManager';
import BookingsList from './BookingsList';
import ProviderOverview from './ProviderOverview';

const ProviderDashboard: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/provider', label: 'Visão Geral', exact: true },
    { path: '/provider/bookings', label: 'Meus Agendamentos' },
    { path: '/provider/agenda', label: 'Gerenciar Agenda' },
  ];
  
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="md:w-64 bg-slate-800 p-6 rounded-lg shadow-md md:sticky md:top-8 self-start">
        <h2 className="text-xl font-semibold text-teal-400 mb-6">Painel do Prestador</h2>
        <nav className="space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2 rounded-md transition-colors text-slate-200 hover:bg-teal-500 hover:text-white
                ${(link.exact && location.pathname === link.path) || (!link.exact && location.pathname.startsWith(link.path)) ? 'bg-teal-600 text-white font-medium' : 'hover:bg-slate-700'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1">
        <Routes>
          <Route index element={<ProviderOverview />} />
          <Route path="bookings" element={<BookingsList />} />
          <Route path="agenda" element={<AgendaManager />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProviderDashboard;
