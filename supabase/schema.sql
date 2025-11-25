-- =================================================================
-- Schema do Banco de Dados - AgendadorPro
-- Supabase PostgreSQL
-- =================================================================

-- Habilita a extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =================================================================
-- TABELA: profiles
-- Estende auth.users com informações adicionais do perfil
-- =================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  business_name TEXT,
  business_type TEXT,
  timezone TEXT DEFAULT 'America/Sao_Paulo',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS (Row Level Security) para profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso para profiles
CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem inserir seu próprio perfil"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- =================================================================
-- TABELA: clients
-- Clientes que podem ser agendados
-- =================================================================
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS clients_user_id_idx ON public.clients(user_id);
CREATE INDEX IF NOT EXISTS clients_email_idx ON public.clients(email);

-- RLS para clients
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem gerenciar seus próprios clientes"
  ON public.clients FOR ALL
  USING (auth.uid() = user_id);

-- =================================================================
-- TABELA: appointments
-- Agendamentos/Compromissos
-- =================================================================
CREATE TYPE appointment_status AS ENUM ('scheduled', 'confirmed', 'cancelled', 'completed');

CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,

  -- Informações do agendamento
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,

  -- Data e hora
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,

  -- Status e controle
  status appointment_status DEFAULT 'scheduled' NOT NULL,
  color TEXT DEFAULT '#0066cc',

  -- Notificações
  send_reminder BOOLEAN DEFAULT true,
  reminder_sent_at TIMESTAMP WITH TIME ZONE,

  -- Metadados
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS appointments_user_id_idx ON public.appointments(user_id);
CREATE INDEX IF NOT EXISTS appointments_client_id_idx ON public.appointments(client_id);
CREATE INDEX IF NOT EXISTS appointments_start_time_idx ON public.appointments(start_time);
CREATE INDEX IF NOT EXISTS appointments_status_idx ON public.appointments(status);

-- RLS para appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem gerenciar seus próprios agendamentos"
  ON public.appointments FOR ALL
  USING (auth.uid() = user_id);

-- =================================================================
-- TABELA: appointment_notes
-- Notas e histórico de agendamentos
-- =================================================================
CREATE TABLE IF NOT EXISTS public.appointment_notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índices
CREATE INDEX IF NOT EXISTS appointment_notes_appointment_id_idx ON public.appointment_notes(appointment_id);

-- RLS
ALTER TABLE public.appointment_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem gerenciar notas de seus agendamentos"
  ON public.appointment_notes FOR ALL
  USING (auth.uid() = user_id);

-- =================================================================
-- FUNCTIONS E TRIGGERS
-- =================================================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at
CREATE TRIGGER handle_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_clients
  BEFORE UPDATE ON public.clients
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_appointments
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Função para criar perfil automaticamente após signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Novo Usuário')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil após signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =================================================================
-- VIEWS (Opcionais - para facilitar queries)
-- =================================================================

-- View de agendamentos com informações do cliente
CREATE OR REPLACE VIEW public.appointments_with_client AS
SELECT
  a.*,
  c.name as client_name,
  c.email as client_email,
  c.phone as client_phone
FROM public.appointments a
LEFT JOIN public.clients c ON a.client_id = c.id;

-- =================================================================
-- DADOS DE EXEMPLO (Desenvolvimento)
-- =================================================================

-- Comentar ou remover em produção
-- INSERT INTO public.clients (user_id, name, email, phone)
-- VALUES
--   ('user-id-aqui', 'João Silva', 'joao@example.com', '(11) 98765-4321'),
--   ('user-id-aqui', 'Maria Santos', 'maria@example.com', '(11) 91234-5678');
