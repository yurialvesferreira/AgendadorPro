
import { Service } from './types';

export const AVAILABLE_SERVICES: Service[] = [
  {
    id: 'ac-install',
    name: 'Instalação de Ar Condicionado',
    description: 'Instalação completa de unidades de ar condicionado split ou de janela.',
    durationMinutes: 120, // 2 hours
    basePrice: 300,
  },
  {
    id: 'ac-maintenance',
    name: 'Manutenção de Ar Condicionado',
    description: 'Limpeza, verificação de gás e reparos gerais em sistemas de ar condicionado.',
    durationMinutes: 60, // 1 hour
    basePrice: 150,
  },
  {
    id: 'electrical-repair',
    name: 'Reparo Elétrico Residencial',
    description: 'Solução de problemas elétricos, troca de fiação, instalação de tomadas e disjuntores.',
    durationMinutes: 90, // 1.5 hours
    basePrice: 200,
  },
];

export const TIME_SLOT_INTERVAL_MINUTES: number = 30; // Smallest slot unit
export const BUSINESS_HOURS = {
  start: 8, // 8 AM
  end: 18,   // 6 PM (last slot can start at 17:30 if interval is 30min and duration is 30min)
};

export const GEMINI_TEXT_MODEL = 'gemini-2.5-flash-preview-04-17';
