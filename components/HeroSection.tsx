
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-center rounded-lg shadow-2xl mb-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-400 to-indigo-400 mb-6 leading-tight">
          Otimizando Agendamentos para Prestadores de Serviços
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
          Uma solução digital para otimizar o processo de agendamento de serviços, focando em prestadores autônomos e pequenas empresas. Libere seu tempo da gestão manual e foque no que realmente importa: a execução do serviço.
        </p>
        <Link
          to="/book"
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Agendar um Serviço Agora
        </Link>
      </div>
       <div className="mt-16 max-w-4xl mx-auto p-2">
         <img src="https://picsum.photos/1024/400?grayscale&blur=2" alt="Calendário de agendamentos" className="rounded-lg shadow-xl opacity-80" />
       </div>
    </section>
  );
};

export default HeroSection;
