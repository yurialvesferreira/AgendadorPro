# 🚀 Início Rápido - Supabase com AgendadorPro

Guia prático para colocar o projeto no ar em **10 minutos**.

## ✅ Checklist de Setup

- [ ] Conta no Supabase criada
- [ ] Projeto Supabase criado
- [ ] Schema SQL executado
- [ ] Variáveis de ambiente configuradas
- [ ] Dependências instaladas
- [ ] Servidor rodando
- [ ] Conta de teste criada

## 📝 Passo a Passo

### 1️⃣ Criar Conta e Projeto no Supabase (3 min)

```bash
1. Acesse: https://supabase.com
2. Clique em "Start your project"
3. Cadastre-se (pode usar GitHub)
4. Clique em "New Project"
5. Preencha:
   - Nome: agendador-pro
   - Database Password: [escolha uma senha forte e anote!]
   - Region: South America (São Paulo)
6. Clique em "Create new project"
7. Aguarde 2-3 minutos (projeto sendo criado)
```

### 2️⃣ Executar Schema SQL (2 min)

```bash
1. No menu lateral, clique em "SQL Editor"
2. Clique em "New query"
3. Abra o arquivo: AgendadorPro/supabase/schema.sql
4. Copie TODO o conteúdo (Ctrl/Cmd + A, Ctrl/Cmd + C)
5. Cole no SQL Editor do Supabase
6. Clique em "Run" (ou Ctrl/Cmd + Enter)
7. Aguarde mensagem: "Success. No rows returned" ✅
```

### 3️⃣ Obter Credenciais (1 min)

```bash
1. No menu lateral, clique em "Settings" (ícone de engrenagem)
2. Clique em "API"
3. Você verá:
   - Project URL: https://abcdefg.supabase.co
   - API Keys:
     - anon public: eyJhbGc... [copie]
     - service_role: eyJhbGc... [copie]
```

### 4️⃣ Configurar Variáveis de Ambiente (1 min)

```bash
1. No projeto AgendadorPro, abra: .env.local
2. Substitua os valores:

NEXT_PUBLIC_SUPABASE_URL=https://abcdefg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_APP_URL=http://localhost:3000

3. Salve o arquivo (Ctrl/Cmd + S)
```

### 5️⃣ Instalar e Rodar (2 min)

```bash
# No terminal, dentro da pasta AgendadorPro:

# Instale as dependências
npm install

# Inicie o servidor
npm run dev

# Abra o navegador em: http://localhost:3000
```

### 6️⃣ Criar Conta de Teste (1 min)

```bash
1. Acesse: http://localhost:3000/cadastro
2. Preencha:
   - Nome: Seu Nome
   - E-mail: seu-email@example.com
   - Senha: teste12345
   - Confirmar senha: teste12345
   - [✓] Concordo com termos
3. Clique em "Criar conta gratuita"
```

**⚠️ Confirmação de E-mail:**

Por padrão, o Supabase pede confirmação de e-mail. Você tem 2 opções:

**Opção A - Confirmar E-mail (Recomendado):**
1. Verifique seu e-mail
2. Clique no link de confirmação
3. Faça login

**Opção B - Desabilitar Confirmação (Apenas Dev):**
1. Supabase Dashboard → Authentication → Providers
2. Desmarque "Enable email confirmations"
3. Salve
4. Sua conta já está ativa!

### 7️⃣ Fazer Login e Usar (1 min)

```bash
1. Acesse: http://localhost:3000/login
2. Entre com:
   - E-mail: seu-email@example.com
   - Senha: teste12345
3. Clique em "Entrar"
4. Você será redirecionado para /agendamentos
5. 🎉 Sucesso!
```

## ✅ Verificar se Funcionou

### No Supabase Dashboard

1. **Authentication** → **Users**
   - Deve aparecer o usuário criado ✅

2. **Table Editor** → **profiles**
   - Deve aparecer o perfil criado automaticamente ✅

3. **Table Editor** → **clients**
   - Deve estar vazia (ainda não criou clientes) ✅

4. **Table Editor** → **appointments**
   - Deve estar vazia (ainda não criou agendamentos) ✅

### No Navegador

1. Acesse http://localhost:3000/agendamentos
2. Você deve ver a mensagem: "Nenhum agendamento ainda"
3. Tente criar um agendamento (botão "+ Novo Agendamento")

## 🎯 Próximos Passos

Agora que está funcionando:

1. **Criar seu primeiro cliente:**
   - Acesse /clientes (quando implementado)
   - Adicione um cliente

2. **Criar seu primeiro agendamento:**
   - Acesse /agendamentos
   - Clique em "+ Novo Agendamento"
   - Preencha os dados

3. **Explorar o dashboard:**
   - Veja o calendário
   - Gerencie seus agendamentos
   - Configure notificações

## 🐛 Problemas Comuns

### "Failed to fetch" ou "Network error"

**Causa:** Variáveis de ambiente incorretas

**Solução:**
1. Verifique se copiou corretamente do Supabase Dashboard
2. Verifique se não tem espaços extras
3. Reinicie o servidor: Ctrl+C e depois `npm run dev`

### "Row Level Security policy violation"

**Causa:** Schema SQL não foi executado corretamente

**Solução:**
1. Volte ao SQL Editor do Supabase
2. Execute o schema.sql novamente
3. Verifique em Table Editor → [tabela] → Policies

### "Email confirmations are enabled"

**Causa:** Supabase pede confirmação de e-mail

**Solução:**
1. Confirme o e-mail OU
2. Desabilite em: Authentication → Providers → Email

### Página em branco / Erro 500

**Causa:** Variáveis de ambiente não carregadas

**Solução:**
1. Verifique `.env.local` está na raiz do projeto
2. Reinicie completamente o servidor
3. Limpe cache: `rm -rf .next` e depois `npm run dev`

## 📞 Precisa de Ajuda?

- 📖 [Guia Completo do Supabase](./SUPABASE_SETUP.md)
- 📖 [Documentação do Supabase](https://supabase.com/docs)
- 🐛 [Abrir Issue](https://github.com/yurialvesferreira/AgendadorPro/issues)

---

**Tempo total estimado: 10 minutos** ⏱️
