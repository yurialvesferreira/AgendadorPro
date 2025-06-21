
export interface Service {
  id: string;
  name: string;
  description: string; // Base description
  durationMinutes: number; 
  basePrice: number;
}

export interface TimeSlot {
  id: string; // e.g., '2024-07-30T09:00:00'
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
  isBlockedByProvider: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  // New structured address fields
  zipCode: string;       // CEP
  street: string;        // Rua/Logradouro
  number: string;        // Número
  complement?: string;   // Complemento (opcional)
  neighborhood: string;  // Bairro
  city: string;          // Cidade
  state: string;         // UF (Estado)
  startTime: Date;
  endTime: Date;
  notes?: string;
}

export interface AvailabilityData {
  [dateKey: string]: TimeSlot[]; // dateKey format: 'YYYY-MM-DD'
}

export enum BookingStep {
  SELECT_SERVICE,
  SELECT_DATE_TIME,
  CONFIRM_DETAILS,
  COMPLETED,
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}