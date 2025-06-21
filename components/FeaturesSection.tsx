
import React from 'react';

interface FeatureCardProps {
  icon: string; // Unicode icon or simple text
  title: string;
  description: string;
  bgColor?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, bgColor = 'bg-slate-800' }) => {
  return (
    <div className={`${bgColor} p-6 rounded-xl shadow-lg hover:shadow-teal-500/20 transition-shadow duration-300 h-full flex flex-col`}>
      <div className="text-3xl text-teal-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-300 text-sm leading-relaxed flex-grow">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const challenges = [
    {
      icon: '🕒',
      title: 'Perda de Tempo',
      description: 'Gestão manual de agendamentos consome tempo valioso que poderia ser dedicado à execução de serviços ou ao desenvolvimento do negócio.',
    },
    {
      icon: '📉',
      title: 'Perda de Clientes',
      description: 'Dificuldade em responder rapidamente pode levar à perda de clientes. Atrasos ou indisponibilidade imediata fazem o cliente procurar concorrentes.',
    },
    {
      icon: '❌',
      title: 'Erros e Conflitos',
      description: 'Anotação manual está sujeita a erros, como duplicidade de horários, gerando retrabalho e insatisfação.',
    },
  ];

  const benefits = [
    {
      icon: '⏳',
      title: 'Economia de Tempo',
      description: 'Automação libera o prestador para focar em tarefas de maior valor. Clientes agendam por conta própria, a qualquer hora.',
    },
    {
      icon: '🌐',
      title: 'Disponibilidade 24/7',
      description: 'Clientes verificam disponibilidade e agendam serviços a qualquer momento, resultando em mais agendamentos e maior satisfação.',
    },
    {
      icon: '🔔',
      title: 'Notificações Automatizadas',
      description: 'Sistema envia notificações automáticas aos clientes e ao prestador, minimizando esquecimentos e faltas.',
    },
    {
      icon: '📈',
      title: 'Otimização de Horários',
      description: 'Visão clara da agenda permite otimizar horários, evitando lacunas e sobreposições, maximizando atendimentos diários.',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-slate-100 mb-6">
          Desafios da Gestão Manual de Agendamentos
        </h2>
        <p className="text-center text-slate-400 max-w-2xl mx-auto mb-12">
          Muitos prestadores enfrentam estes obstáculos diariamente. A automação é a chave para superá-los.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {challenges.map((challenge) => (
            <FeatureCard key={challenge.title} {...challenge} bgColor="bg-slate-800/70" />
          ))}
        </div>

        <h2 className="text-3xl font-bold text-center text-slate-100 mb-6">
          Benefícios da Automação de Agendamentos
        </h2>
        <p className="text-center text-slate-400 max-w-2xl mx-auto mb-12">
          Transforme sua operação, tornando-a mais eficiente, profissional e lucrativa.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <FeatureCard key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
