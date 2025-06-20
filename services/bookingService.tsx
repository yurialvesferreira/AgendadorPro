
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Booking, Service, TimeSlot, AvailabilityData, ToastMessage } from '../types';
import { AVAILABLE_SERVICES, BUSINESS_HOURS, TIME_SLOT_INTERVAL_MINUTES } from '../constants';

// Helper to generate date key 'YYYY-MM-DD'
const getDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

interface BookingContextType {
  bookings: Booking[];
  availability: AvailabilityData;
  services: Service[];
  providerNotifications: string[];
  getAvailableSlotsForService: (date: Date, serviceId: string, serviceDurationMinutes: number) => Promise<TimeSlot[]>;
  getSlotsForDayManagement: (date: Date) => Promise<TimeSlot[]>;
  createBooking: (bookingDetails: Omit<Booking, 'id' | 'endTime'>, serviceDurationMinutes: number) => Promise<Booking>;
  toggleSlotBlock: (slotId: string, block: boolean) => Promise<void>;
  addToast: (message: string, type: ToastMessage['type']) => void;
  removeToast: (id: number) => void;
  toasts: ToastMessage[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const savedBookings = localStorage.getItem('bookings');
    return savedBookings ? JSON.parse(savedBookings).map((b: any) => ({...b, startTime: new Date(b.startTime), endTime: new Date(b.endTime)})) : [];
  });
  const [availability, setAvailability] = useState<AvailabilityData>(() => {
     const savedAvailability = localStorage.getItem('availability');
     if (savedAvailability) {
        const parsed = JSON.parse(savedAvailability);
        Object.keys(parsed).forEach(dateKey => {
            parsed[dateKey] = parsed[dateKey].map((s: any) => ({...s, startTime: new Date(s.startTime), endTime: new Date(s.endTime)}));
        });
        return parsed;
     }
     return {};
  });
  const [services] = useState<Service[]>(AVAILABLE_SERVICES);
  const [providerNotifications, setProviderNotifications] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('availability', JSON.stringify(availability));
  }, [availability]);

  const addToast = useCallback((message: string, type: ToastMessage['type']) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);
  
  const addProviderNotification = (message: string) => {
    setProviderNotifications(prev => [...prev, `${new Date().toLocaleTimeString('pt-BR')}: ${message}`]);
  };

  const generateSlotsForDay = useCallback((date: Date): TimeSlot[] => {
    const daySlots: TimeSlot[] = [];
    const dateKey = getDateKey(date);
    
    if (availability[dateKey]) {
        return availability[dateKey].map(slot => {
            const isBooked = bookings.some(b => 
                b.startTime.getTime() <= slot.startTime.getTime() && b.endTime.getTime() > slot.startTime.getTime()
            );
            return {...slot, isBooked };
        });
    }

    for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour++) {
      for (let minute = 0; minute < 60; minute += TIME_SLOT_INTERVAL_MINUTES) {
        const startTime = new Date(date);
        startTime.setHours(hour, minute, 0, 0);

        const endTime = new Date(startTime);
        endTime.setMinutes(startTime.getMinutes() + TIME_SLOT_INTERVAL_MINUTES);
        
        if (endTime.getHours() > BUSINESS_HOURS.end || (endTime.getHours() === BUSINESS_HOURS.end && endTime.getMinutes() > 0) ) {
            continue;
        }

        const slotId = `${dateKey}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        const isBooked = bookings.some(b => 
            b.startTime.getTime() <= startTime.getTime() && b.endTime.getTime() > startTime.getTime()
        );

        daySlots.push({
          id: slotId,
          startTime,
          endTime,
          isBooked,
          isBlockedByProvider: false, 
        });
      }
    }
     setAvailability(prev => ({...prev, [dateKey]: daySlots}));
    return daySlots;
  }, [bookings, availability]);


  const getAvailableSlotsForService = useCallback(async (date: Date, serviceId: string, serviceDurationMinutes: number): Promise<TimeSlot[]> => {
    const baseSlots = generateSlotsForDay(date);
    const service = services.find(s => s.id === serviceId);
    if (!service) return [];

    const slotsNeeded = Math.ceil(serviceDurationMinutes / TIME_SLOT_INTERVAL_MINUTES);
    
    const availableServiceSlots: TimeSlot[] = [];

    for (let i = 0; i <= baseSlots.length - slotsNeeded; i++) {
        let canFitService = true;
        for (let j = 0; j < slotsNeeded; j++) {
            if (baseSlots[i+j].isBooked || baseSlots[i+j].isBlockedByProvider) {
                canFitService = false;
                break;
            }
        }
        if (canFitService) {
            availableServiceSlots.push({
                ...baseSlots[i], 
            });
        }
    }
    return availableServiceSlots;
  }, [generateSlotsForDay, services]);

  const getSlotsForDayManagement = useCallback(async (date: Date): Promise<TimeSlot[]> => {
    return generateSlotsForDay(date);
  }, [generateSlotsForDay]);

  const createBooking = useCallback(async (bookingDetails: Omit<Booking, 'id'|'endTime'>, serviceDurationMinutes: number): Promise<Booking> => {
    const newId = `booking-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const endTime = new Date(bookingDetails.startTime);
    endTime.setMinutes(endTime.getMinutes() + serviceDurationMinutes);

    // Ensure all parts of bookingDetails are included, especially the new address fields
    const newBooking: Booking = { 
        ...bookingDetails, 
        id: newId, 
        endTime 
    };
    
    setBookings(prev => [...prev, newBooking]);
    addProviderNotification(`Novo agendamento: ${newBooking.serviceName} com ${newBooking.clientName}.`);
    
    const dateKey = getDateKey(newBooking.startTime);
    setAvailability(prev => {
        const updatedDaySlots = (prev[dateKey] || []).map(slot => {
            if (slot.startTime >= newBooking.startTime && slot.startTime < newBooking.endTime) {
                return {...slot, isBooked: true};
            }
            return slot;
        });
        return {...prev, [dateKey]: updatedDaySlots };
    });

    return newBooking;
  }, []);

  const toggleSlotBlock = useCallback(async (slotId: string, block: boolean): Promise<void> => {
    const dateKey = slotId.substring(0, 10); 
    setAvailability(prev => {
        const daySlots = prev[dateKey] || [];
        const updatedSlots = daySlots.map(s => s.id === slotId ? { ...s, isBlockedByProvider: block } : s);
        return { ...prev, [dateKey]: updatedSlots };
    });
    addProviderNotification(`Horário ${slotId.substring(11)} de ${dateKey} foi ${block ? 'bloqueado' : 'desbloqueado'}.`);
  }, []);

  return (
    <BookingContext.Provider value={{ bookings, availability, services, providerNotifications, getAvailableSlotsForService, getSlotsForDayManagement, createBooking, toggleSlotBlock, addToast, removeToast, toasts }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};