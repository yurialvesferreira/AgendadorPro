
import React, { useState, useEffect, useCallback } from 'react';
import { Service, TimeSlot, Booking, BookingStep } from '../types';
import { AVAILABLE_SERVICES, GEMINI_TEXT_MODEL } from '../constants';
import { useBooking } from '../services/bookingService';
import { GoogleGenAI } from '@google/genai';
import { Spinner } from './ui/Spinner';
import { Alert } from './ui/Alert';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';

const ServiceCard: React.FC<{
  service: Service;
  onSelect: (service: Service) => void;
  isLoadingDescription: boolean;
  enhancedDescription: string | null;
  onHover: (serviceName: string) => void;
}> = ({ service, onSelect, isLoadingDescription, enhancedDescription, onHover }) => (
  <Card 
    className="hover:shadow-teal-500/30 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    onMouseEnter={() => onHover(service.name)}
    onClick={() => onSelect(service)}
  >
    <div>
      <h3 className="text-xl font-semibold text-teal-400 mb-2">{service.name}</h3>
      <p className="text-sm text-slate-300 mb-1">Duração: {service.durationMinutes} min</p>
      <p className="text-sm text-slate-300 mb-3">Preço Base: R$ {service.basePrice.toFixed(2)}</p>
      {isLoadingDescription && <div className="my-2"><Spinner size="sm" /> <span className="text-xs text-slate-400">Carregando descrição otimizada...</span></div>}
      {enhancedDescription ? (
        <p className="text-xs text-slate-400 italic bg-slate-700 p-2 rounded">{enhancedDescription}</p>
      ) : (
        <p className="text-sm text-slate-400">{service.description}</p>
      )}
    </div>
    <Button onClick={() => onSelect(service)} className="mt-4 w-full" variant="primary">Selecionar Serviço</Button>
  </Card>
);


const BookingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.SELECT_SERVICE);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [clientDetails, setClientDetails] = useState({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enhancedDescriptions, setEnhancedDescriptions] = useState<Record<string, string | null>>({});
  const [loadingDescriptionServiceId, setLoadingDescriptionServiceId] = useState<string | null>(null);
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [addressFetched, setAddressFetched] = useState(false);


  const { getAvailableSlotsForService, createBooking, addToast } = useBooking();
  const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

  const fetchEnhancedDescription = useCallback(async (serviceName: string, serviceId: string) => {
    if (!ai || enhancedDescriptions[serviceId] !== undefined) return;
    setLoadingDescriptionServiceId(serviceId);
    try {
      const prompt = `Para uma aplicação de agendamento de serviços, forneça uma descrição concisa e atraente de 2-3 frases para o serviço "${serviceName}". Destaque seus principais benefícios para um cliente em potencial. Responda em português brasileiro.`;
      const response = await ai.models.generateContent({
        model: GEMINI_TEXT_MODEL,
        contents: prompt,
      });
      setEnhancedDescriptions(prev => ({ ...prev, [serviceId]: response.text }));
    } catch (err) {
      console.error("Error fetching enhanced description from Gemini:", err);
      setEnhancedDescriptions(prev => ({ ...prev, [serviceId]: null }));
    } finally {
      setLoadingDescriptionServiceId(null);
    }
  }, [ai, enhancedDescriptions]);


  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentStep(BookingStep.SELECT_DATE_TIME);
    fetchSlots(new Date(), service);
  };

  const fetchSlots = useCallback(async (date: Date, service: Service) => {
    if (!service) return;
    setIsLoading(true);
    setError(null);
    try {
      const slots = await getAvailableSlotsForService(date, service.id, service.durationMinutes);
      setAvailableSlots(slots);
    } catch (err) {
      setError('Falha ao carregar horários disponíveis.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [getAvailableSlotsForService]);

  useEffect(() => {
    if (selectedService && currentStep === BookingStep.SELECT_DATE_TIME) {
      fetchSlots(selectedDate, selectedService);
    }
  }, [selectedDate, selectedService, currentStep, fetchSlots]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value + 'T00:00:00');
    setSelectedDate(date);
  };
  
  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setCurrentStep(BookingStep.CONFIRM_DETAILS);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClientDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 5) {
      value = value.slice(0, 5) + '-' + value.slice(5, 8);
    }
    setClientDetails(prev => ({ ...prev, zipCode: value }));

    if (value.replace('-', '').length < 8) {
      setClientDetails(prev => ({
        ...prev,
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        complement: '',
        zipCode: value // keep the current input value
      }));
      setAddressError(null);
      setAddressFetched(false);
    }
  };

  const fetchAddressFromCEP = async (cep: string) => {
    setIsFetchingAddress(true);
    setAddressError(null);
    setAddressFetched(false);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error('Falha ao buscar CEP. Verifique o CEP digitado e sua conexão.');
      }
      const data = await response.json();
      if (data.erro) {
        setAddressError('CEP não encontrado ou inválido.');
        setClientDetails(prev => ({ ...prev, street: '', neighborhood: '', city: '', state: '', complement: '' }));
      } else {
        setClientDetails(prev => ({
          ...prev,
          street: data.logradouro || '',
          neighborhood: data.bairro || '',
          city: data.localidade || '',
          state: data.uf || '',
          complement: data.complemento || '',
        }));
        setAddressFetched(true);
        addToast('Endereço preenchido automaticamente!', 'info');
        document.getElementsByName("number")[0]?.focus();
      }
    } catch (error: any) {
      console.error("Error fetching CEP:", error);
      setAddressError(error.message || 'Erro ao buscar endereço. Tente novamente.');
      setClientDetails(prev => ({ ...prev, street: '', neighborhood: '', city: '', state: '', complement: '' }));
    } finally {
      setIsFetchingAddress(false);
    }
  };

  const handleZipCodeBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      fetchAddressFromCEP(cep);
    } else if (cep.length > 0) {
      setAddressError("CEP inválido. Deve conter 8 dígitos.");
    } else {
      setAddressError(null);
    }
  };

  const handleSubmitBooking = async () => {
    if (!selectedService || !selectedSlot || !clientDetails.name || !clientDetails.phone || // Email is now optional
        !clientDetails.zipCode || !clientDetails.street || !clientDetails.number || 
        !clientDetails.neighborhood || !clientDetails.city || !clientDetails.state
    ) {
      setError('Por favor, preencha todos os campos obrigatórios (*). Verifique o CEP, número do endereço e telefone.');
      addToast('Preencha todos os campos obrigatórios.', 'error');
      return;
    }
    // Optional: Validate email format if provided
    if (clientDetails.email && !/\S+@\S+\.\S+/.test(clientDetails.email)) {
        setError('O formato do email é inválido.');
        addToast('Formato de email inválido.', 'error');
        return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const newBookingData: Omit<Booking, 'id' | 'endTime'> = {
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        clientName: clientDetails.name,
        clientEmail: clientDetails.email, // Can be empty string if not provided
        clientPhone: clientDetails.phone,
        zipCode: clientDetails.zipCode,
        street: clientDetails.street,
        number: clientDetails.number,
        complement: clientDetails.complement,
        neighborhood: clientDetails.neighborhood,
        city: clientDetails.city,
        state: clientDetails.state,
        startTime: selectedSlot.startTime,
        notes: clientDetails.notes,
      };
      await createBooking(newBookingData, selectedService.durationMinutes);
      setCurrentStep(BookingStep.COMPLETED);
      addToast('Agendamento confirmado com sucesso!', 'success');
    } catch (err) {
      setError('Falha ao criar agendamento.');
      addToast('Erro ao confirmar agendamento.', 'error');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFlow = () => {
    setCurrentStep(BookingStep.SELECT_SERVICE);
    setSelectedService(null);
    setSelectedSlot(null);
    setClientDetails({
      name: '', email: '', phone: '',
      zipCode: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '',
      notes: ''
    });
    setError(null);
    setSelectedDate(new Date());
    setAddressError(null);
    setIsFetchingAddress(false);
    setAddressFetched(false);
  };

  const today = new Date();
  today.setHours(0,0,0,0); 

  if (currentStep === BookingStep.SELECT_SERVICE) {
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold text-center text-teal-400 mb-8">Escolha um Serviço</h2>
        {!ai && <Alert type="info" message="API Key do Gemini não configurada. Descrições otimizadas não estarão disponíveis." />}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AVAILABLE_SERVICES.map(service => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onSelect={handleServiceSelect}
              isLoadingDescription={loadingDescriptionServiceId === service.id}
              enhancedDescription={enhancedDescriptions[service.id]}
              onHover={(name) => fetchEnhancedDescription(name, service.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (currentStep === BookingStep.SELECT_DATE_TIME) {
    return (
      <Card>
        <h2 className="text-2xl font-semibold text-teal-400 mb-2">Selecione Data e Horário</h2>
        <p className="text-slate-300 mb-6">Para o serviço: <span className="font-semibold">{selectedService?.name}</span></p>
        <div className="mb-6">
          <label htmlFor="booking-date" className="block text-sm font-medium text-slate-300 mb-1">Escolha uma data:</label>
          <Input 
            type="date" 
            id="booking-date" 
            value={selectedDate.toISOString().split('T')[0]}
            min={today.toISOString().split('T')[0]}
            onChange={handleDateChange} 
            className="w-full md:w-1/2"
          />
        </div>
        {isLoading && <Spinner message="Carregando horários..." />}
        {error && <Alert type="error" message={error} />}
        {!isLoading && !error && availableSlots.length === 0 && (
          <p className="text-slate-400">Nenhum horário disponível para esta data ou serviço. Por favor, tente outra data.</p>
        )}
        {!isLoading && availableSlots.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-slate-200 mb-3">Horários disponíveis para {selectedDate.toLocaleDateString('pt-BR')}:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {availableSlots.map(slot => (
                <Button 
                  key={slot.id} 
                  onClick={() => handleSlotSelect(slot)} 
                  variant={slot.isBooked || slot.isBlockedByProvider ? "disabled" : "secondary"}
                  disabled={slot.isBooked || slot.isBlockedByProvider}
                  className="w-full text-center"
                >
                  {slot.startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </Button>
              ))}
            </div>
          </div>
        )}
        <Button onClick={() => setCurrentStep(BookingStep.SELECT_SERVICE)} className="mt-8" variant="neutral">Voltar para Serviços</Button>
      </Card>
    );
  }
  
  if (currentStep === BookingStep.CONFIRM_DETAILS) {
    return (
      <Card>
        <h2 className="text-2xl font-semibold text-teal-400 mb-2">Confirme seus Dados</h2>
        <p className="text-slate-300 mb-1">Serviço: <span className="font-semibold">{selectedService?.name}</span></p>
        <p className="text-slate-300 mb-6">Horário: <span className="font-semibold">{selectedSlot?.startTime.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span></p>
        
        {error && <Alert type="error" message={error} className="mb-4" />}
        <form onSubmit={(e) => { e.preventDefault(); handleSubmitBooking(); }} className="space-y-4">
          <Input label="Nome Completo*" type="text" name="name" value={clientDetails.name} onChange={handleInputChange} required />
          <Input label="Email (Opcional)" type="email" name="email" value={clientDetails.email} onChange={handleInputChange} />
          <Input label="Telefone*" type="tel" name="phone" value={clientDetails.phone} onChange={handleInputChange} required />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <Input 
                label="CEP*" 
                type="text" 
                name="zipCode" 
                value={clientDetails.zipCode} 
                onChange={handleZipCodeChange}
                onBlur={handleZipCodeBlur}
                maxLength={9} 
                placeholder="00000-000"
                required 
              />
              {isFetchingAddress && <Spinner size="sm" message="Buscando..." className="mt-1" />}
              {addressError && <Alert type="error" message={addressError} className="mt-1 text-xs py-1 px-2" />}
            </div>
            <div className="md:col-span-2">
              <Input label="Rua/Logradouro*" type="text" name="street" value={clientDetails.street} onChange={handleInputChange} required readOnly={addressFetched} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Número*" type="text" name="number" value={clientDetails.number} onChange={handleInputChange} required />
            <Input label="Complemento" type="text" name="complement" value={clientDetails.complement} onChange={handleInputChange} readOnly={addressFetched && !clientDetails.complement && clientDetails.complement !== ''} />
             <Input label="Bairro*" type="text" name="neighborhood" value={clientDetails.neighborhood} onChange={handleInputChange} required readOnly={addressFetched} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input label="Cidade*" type="text" name="city" value={clientDetails.city} onChange={handleInputChange} required readOnly={addressFetched} />
            </div>
            <Input label="UF*" type="text" name="state" value={clientDetails.state} onChange={handleInputChange} required readOnly={addressFetched} />
          </div>
          
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-slate-300 mb-1">Observações (Opcional)</label>
            <textarea 
              id="notes" 
              name="notes" 
              value={clientDetails.notes} 
              onChange={handleInputChange} 
              rows={3}
              className="w-full bg-slate-700 border border-slate-600 text-slate-100 rounded-md p-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              placeholder="Ex: Ponto de referência, informações sobre o local, etc."
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="button" onClick={() => setCurrentStep(BookingStep.SELECT_DATE_TIME)} variant="neutral" className="w-full sm:w-auto">Voltar</Button>
            <Button type="submit" disabled={isLoading || isFetchingAddress} className="w-full sm:w-auto flex-grow">
              {isLoading ? <Spinner size="sm" /> : 'Confirmar Agendamento'}
            </Button>
          </div>
        </form>
      </Card>
    );
  }

  if (currentStep === BookingStep.COMPLETED) {
    const fullAddress = `${clientDetails.street}, ${clientDetails.number}${clientDetails.complement ? ' - ' + clientDetails.complement : ''} - ${clientDetails.neighborhood}, ${clientDetails.city} - ${clientDetails.state}, CEP: ${clientDetails.zipCode}`;
    return (
      <Card className="text-center">
        <div className="text-5xl text-green-400 mb-4">🎉</div>
        <h2 className="text-2xl font-semibold text-green-400 mb-2">Agendamento Confirmado!</h2>
        <p className="text-slate-300 mb-1">
          Obrigado, {clientDetails.name}! Seu agendamento para <span className="font-semibold">{selectedService?.name}</span> em <span className="font-semibold">{selectedSlot?.startTime.toLocaleString('pt-BR', { dateStyle: 'full', timeStyle: 'short' })}</span> foi confirmado.
        </p>
        <p className="text-slate-400 text-sm mb-4">
          Endereço do serviço: <span className="font-semibold">{fullAddress}</span>.
        </p>
        {clientDetails.email && <p className="text-slate-400 text-sm mb-6">Uma confirmação foi (simuladamente) enviada para {clientDetails.email}.</p>}
        {!clientDetails.email && <p className="text-slate-400 text-sm mb-6">Seu agendamento está confirmado. Anote os detalhes!</p>}
        <Button onClick={resetFlow} variant="primary">Agendar Outro Serviço</Button>
      </Card>
    );
  }

  return null; 
};

export default BookingFlow;
