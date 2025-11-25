# 🚀 Guia de Implementação Completa - AgendadorPro

Este guia contém todas as instruções para implementar as funcionalidades restantes e fazer deploy no Vercel.

## 📋 Status Atual

### ✅ Implementado
- [x] Estrutura completa Next.js + TypeScript
- [x] Sistema de design acessível (WCAG AA)
- [x] Componentes base (Button, Input, Modal, Alert, Select, Textarea, DateTimeInput)
- [x] Integração Supabase (Auth + Database)
- [x] Autenticação (Login, Cadastro, Recuperação de senha)
- [x] Server Actions (appointments, clients, auth)
- [x] Formulário de agendamento (create/edit)
- [x] Middleware de proteção de rotas
- [x] Documentação completa

### 🔄 Em Andamento
- [ ] Integrar formulário na lista de agendamentos
- [ ] Página de clientes (/clientes)
- [ ] Calendário visual
- [ ] Sistema de temas
- [ ] Deploy Vercel com CI/CD

---

## 1️⃣ Integrar Formulário de Agendamento

### Atualizar `src/components/appointments/AppointmentsList.tsx`

Adicione o estado e handlers para o modal:

```typescript
'use client'

import { useState } from 'react'
import { AppointmentForm } from './AppointmentForm'
// ... imports existentes

export function AppointmentsList({ initialAppointments, initialClients }: Props) {
  const [appointments, setAppointments] = useState(initialAppointments)
  const [clients] = useState(initialClients)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<AppointmentWithClient | null>(null)

  const handleCreateClick = () => {
    setEditingAppointment(null)
    setIsFormOpen(true)
  }

  const handleEditClick = (appointment: AppointmentWithClient) => {
    setEditingAppointment(appointment)
    setIsFormOpen(true)
  }

  const handleFormSuccess = () => {
    // Recarregar dados
    window.location.reload()
  }

  return (
    <div>
      {/* Botão + Novo Agendamento */}
      <Button onClick={handleCreateClick}>
        + Novo Agendamento
      </Button>

      {/* Tabela de agendamentos... */}

      {/* Modal de formulário */}
      <AppointmentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
        appointment={editingAppointment}
        clients={clients}
      />
    </div>
  )
}
```

### Atualizar `src/app/agendamentos/page.tsx`

Busque clientes junto com agendamentos:

```typescript
// Busca clientes
const { data: clients } = await supabase
  .from('clients')
  .select('*')
  .eq('user_id', user.id)
  .order('name', { ascending: true })

<AppointmentsList
  initialAppointments={appointments || []}
  initialClients={clients || []}
/>
```

---

## 2️⃣ Criar Página de Clientes

### `src/app/clientes/page.tsx`

```typescript
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ClientsList } from '@/components/clients/ClientsList'

export default async function ClientesPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id)
    .order('name', { ascending: true })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 bg-gray-50">
        <div className="container-accessible py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Meus Clientes
          </h1>
          <ClientsList initialClients={clients || []} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
```

### `src/components/clients/ClientsList.tsx`

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ClientForm } from './ClientForm'
import { deleteClient } from '@/app/actions/clients'
import type { Client } from '@/types/database'

export function ClientsList({ initialClients }: { initialClients: Client[] }) {
  const [clients, setClients] = useState(initialClients)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return

    const result = await deleteClient(id)
    if (result.success) {
      window.location.reload()
    }
  }

  return (
    <div>
      <Button onClick={() => setIsFormOpen(true)}>
        + Novo Cliente
      </Button>

      {/* Tabela de clientes similar ao AppointmentsList */}
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>
                <Button onClick={() => {
                  setEditingClient(client)
                  setIsFormOpen(true)
                }}>
                  Editar
                </Button>
                <Button onClick={() => handleDelete(client.id)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ClientForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        client={editingClient}
      />
    </div>
  )
}
```

### `src/components/clients/ClientForm.tsx`

```typescript
'use client'

import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { createClient, updateClient } from '@/app/actions/clients'

export function ClientForm({ isOpen, onClose, client }: Props) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = client
      ? await updateClient(client.id, formData)
      : await createClient(formData)

    if (result.success) {
      window.location.reload()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={client ? 'Editar Cliente' : 'Novo Cliente'}
    >
      <form onSubmit={handleSubmit}>
        <Input label="Nome" name="name" required defaultValue={client?.name} />
        <Input label="E-mail" name="email" type="email" defaultValue={client?.email || ''} />
        <Input label="Telefone" name="phone" defaultValue={client?.phone || ''} />
        <Textarea label="Observações" name="notes" defaultValue={client?.notes || ''} />

        <Button type="submit">
          {client ? 'Salvar' : 'Criar Cliente'}
        </Button>
      </form>
    </Modal>
  )
}
```

---

## 3️⃣ Calendário Visual

### Instalar dependência

```bash
npm install react-big-calendar date-fns
```

### `src/app/calendario/page.tsx`

```typescript
import { createClient } from '@/lib/supabase/server'
import { CalendarView } from '@/components/calendar/CalendarView'

export default async function CalendarioPage() {
  const supabase = createClient()
  // Buscar agendamentos e clientes

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1">
        <CalendarView appointments={appointments} clients={clients} />
      </main>
      <Footer />
    </div>
  )
}
```

### `src/components/calendar/CalendarView.tsx`

```typescript
'use client'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export function CalendarView({ appointments, clients }) {
  const events = appointments.map(apt => ({
    id: apt.id,
    title: apt.title,
    start: new Date(apt.start_time),
    end: new Date(apt.end_time),
    resource: apt,
  }))

  return (
    <div className="h-screen p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        messages={{
          next: "Próximo",
          previous: "Anterior",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
        }}
      />
    </div>
  )
}
```

---

## 4️⃣ Sistema de Temas

### `src/contexts/ThemeContext.tsx`

```typescript
'use client'

import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>({
    primary: '#0066cc',
    secondary: '#28A745',
    // ... outras cores
  })

  const updateTheme = (newTheme: Partial<Theme>) => {
    setTheme(prev => ({ ...prev, ...newTheme }))
    // Salvar no localStorage
    localStorage.setItem('theme', JSON.stringify({ ...theme, ...newTheme }))
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

### Configuração de Cores Personalizadas

Criar página `/configuracoes` com seletor de cores.

---

## 5️⃣ Deploy no Vercel

### Setup Automático

1. **Conectar GitHub ao Vercel:**

```bash
# No terminal:
# 1. Push do código para GitHub (já feito)
git push origin claude/improve-accessibility-wcag-01V2kCCWgy79oReRSP66PJrc

# 2. Acesse vercel.com e faça login
# 3. Clique em "Add New Project"
# 4. Import do GitHub: yurialvesferreira/AgendadorPro
# 5. Configure:
```

2. **Variáveis de Ambiente no Vercel:**

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service
NEXT_PUBLIC_APP_URL=https://seu-app.vercel.app
```

3. **Deploy:**
- Vercel faz deploy automático ao fazer push
- Cada PR cria um preview deployment
- Produção atualiza ao merge na main

### `vercel.json`

Criar na raiz do projeto:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "framework": "nextjs",
  "regions": ["gru1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-key"
  }
}
```

---

## 6️⃣ CI/CD com GitHub Actions

### `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main, claude/**]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run accessibility linting
        run: npm run lint:a11y

      - name: Type check
        run: npm run type-check

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
```

### `.github/workflows/deploy.yml`

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 7️⃣ Otimizações de Performance

### `next.config.js` - Adicionar

```javascript
const nextConfig = {
  // ... configuração existente

  // Otimizações
  images: {
    domains: ['supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },

  // Compressão
  compress: true,

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

---

## 📊 Checklist Final

### Funcionalidades
- [ ] Formulário de agendamento integrado
- [ ] Página de clientes completa
- [ ] Calendário visual funcionando
- [ ] Sistema de temas implementado
- [ ] Notificações (opcional)

### Deploy
- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] URL de produção adicionada no Supabase
- [ ] CI/CD rodando sem erros
- [ ] SSL/HTTPS ativo

### Acessibilidade
- [ ] Lighthouse Accessibility Score > 95
- [ ] Teste com NVDA/VoiceOver
- [ ] Navegação por teclado completa
- [ ] Contraste validado

### Performance
- [ ] Lighthouse Performance Score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s

---

## 🆘 Troubleshooting

### Build Error no Vercel

```bash
# Verificar localmente primeiro
npm run build

# Se falhar, checar:
# - Variáveis de ambiente
# - Tipos TypeScript
# - Imports incorretos
```

### Erro 403 ao fazer deploy

Certifique-se que a branch começa com `claude/` conforme configurado no git.

---

## 📚 Próximas Funcionalidades Sugeridas

1. **Notificações Push**
2. **Exportação PDF de agendamentos**
3. **Integração WhatsApp/SMS**
4. **Dashboard de Analytics**
5. **Multi-usuário/Equipes**
6. **Agendamento online (página pública)**
7. **Pagamentos integrados**

---

**Documentação criada em:** 2025-11-25
**Status:** Ready for Implementation
