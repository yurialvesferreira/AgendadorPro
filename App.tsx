
import React from 'react';
import { HashRouter, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import { BookingProvider } from './services/bookingService';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import BookingFlow from './components/BookingFlow';
import ProviderDashboard from './components/Provider/ProviderDashboard';
import { ToastContainer } from './components/ui/Toast';

const Layout: React.FC = () => {
  const location = useLocation();
  const isProviderPath = location.pathname.startsWith('/provider');

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <Header isProvider={isProviderPath} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

const Header: React.FC<{ isProvider: boolean }> = ({ isProvider }) => {
  return (
    <header className="bg-slate-800 shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-teal-400 hover:text-teal-300 transition-colors">
          AgendamentoPro
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-slate-300 hover:text-teal-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Início</Link>
          <Link to="/book" className="text-slate-300 hover:text-teal-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">Agendar Serviço</Link>
          <Link 
            to="/provider" 
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isProvider ? 'bg-teal-500 text-white' : 'text-slate-300 hover:text-teal-400'}`}
          >
            Painel do Prestador
          </Link>
        </div>
      </nav>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-center py-6 text-sm text-slate-400">
      <p>&copy; {new Date().getFullYear()} AgendamentoPro. Todos os direitos reservados.</p>
      <p className="mt-1">Otimizando seu tempo, um agendamento por vez.</p>
    </footer>
  );
};

const HomePage: React.FC = () => (
  <>
    <HeroSection />
    <FeaturesSection />
  </>
);

function App() {
  return (
    <BookingProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="book" element={<BookingFlow />} />
            <Route path="provider/*" element={<ProviderDashboard />} />
            <Route path="*" element={<div className="text-center py-10"><h2>Página não encontrada</h2><Link to="/" className="text-teal-400 hover:underline">Voltar para Início</Link></div>} />
          </Route>
        </Routes>
      </HashRouter>
    </BookingProvider>
  );
}

export default App;
