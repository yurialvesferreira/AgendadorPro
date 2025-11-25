# 🗄️ Configuração do Supabase - AgendadorPro

Guia completo para configurar o backend com Supabase (PostgreSQL + Auth + Realtime).

## 📋 Índice

- [O que é Supabase?](#o-que-é-supabase)
- [Criando um Projeto](#criando-um-projeto)
- [Configurando o Banco de Dados](#configurando-o-banco-de-dados)
- [Configurando Autenticação](#configurando-autenticação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Testando a Integração](#testando-a-integração)
- [Deploy](#deploy)
- [Troubleshooting](#troubleshooting)

## 🎯 O que é Supabase?

Supabase é uma alternativa open-source ao Firebase que oferece:

- ✅ **PostgreSQL** - Banco de dados relacional poderoso
- ✅ **Authentication** - Sistema de autenticação completo
- ✅ **Realtime** - Atualizações em tempo real
- ✅ **Storage** - Armazenamento de arquivos
- ✅ **Edge Functions** - Serverless functions
- ✅ **Row Level Security (RLS)** - Segurança granular

## 🚀 Criando um Projeto

### Passo 1: Criar Conta

1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Crie uma conta (pode usar GitHub)

### Passo 2: Criar Novo Projeto

1. No dashboard, clique em "New Project"
2. Preencha as informações:
   - **Name:** `agendador-pro` (ou nome de sua preferência)
   - **Database Password:** Escolha uma senha forte (anote!)
   - **Region:** Escolha a região mais próxima (ex: South America - São Paulo)
   - **Pricing Plan:** Free (para começar)
3. Clique em "Create new project"
4. Aguarde 2-3 minutos para o projeto ser criado

## 📊 Configurando o Banco de Dados

### Passo 1: Executar o Schema SQL

1. No dashboard do Supabase, vá em **SQL Editor** (menu lateral)
2. Clique em "New query"
3. Copie TODO o conteúdo do arquivo `supabase/schema.sql` deste repositório
4. Cole no editor SQL
5. Clique em "Run" ou pressione Ctrl/Cmd + Enter
6. Você verá a mensagem "Success. No rows returned"

### Passo 2: Verificar Tabelas Criadas

1. Vá em **Table Editor** (menu lateral)
2. Você deve ver as seguintes tabelas:
   - `profiles` - Perfis de usuários
   - `clients` - Clientes
   - `appointments` - Agendamentos
   - `appointment_notes` - Notas de agendamentos

### Passo 3: Verificar RLS (Row Level Security)

1. Clique em qualquer tabela (ex: `profiles`)
2. Vá na aba "Policies"
3. Você deve ver as políticas de segurança criadas
4. **IMPORTANTE:** Nunca desabilite RLS em produção!

## 🔐 Configurando Autenticação

### Passo 1: Configurar Providers

1. Vá em **Authentication** → **Providers** (menu lateral)
2. **Email** deve estar habilitado por padrão
3. Configure as opções:
   - ✅ Enable email confirmations (recomendado)
   - ✅ Enable email change confirmations
   - ✅ Secure password change

### Passo 2: Configurar Email Templates (Opcional mas Recomendado)

1. Vá em **Authentication** → **Email Templates**
2. Personalize os templates:
   - **Confirm signup** - E-mail de confirmação
   - **Magic Link** - Login sem senha
   - **Reset Password** - Recuperação de senha

### Passo 3: Configurar Redirect URLs

1. Vá em **Authentication** → **URL Configuration**
2. Adicione as URLs permitidas:
   ```
   http://localhost:3000
   http://localhost:3000/auth/callback
   https://seu-dominio.com (quando fizer deploy)
   https://seu-dominio.com/auth/callback
   ```

## 🔑 Variáveis de Ambiente

### Passo 1: Obter Credenciais

1. Vá em **Settings** → **API** (menu lateral)
2. Você verá:
   - **Project URL** - URL do seu projeto
   - **Project API keys:**
     - `anon/public` - Chave pública (pode ser exposta no frontend)
     - `service_role` - Chave secreta (NUNCA exponha no frontend!)

### Passo 2: Configurar `.env.local`

1. Na raiz do projeto, abra o arquivo `.env.local`
2. Substitua os valores placeholder:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://seuprojetoid.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role-aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Exemplo real:**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBh...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBh...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### ⚠️ Segurança Importante

- ✅ **NUNCA** commite o arquivo `.env.local` no Git
- ✅ `.env.local` já está no `.gitignore`
- ✅ Use `.env.example` como template
- ✅ A chave `service_role` é secreta - use apenas no servidor
- ✅ A chave `anon` é pública - pode ser exposta no frontend

## 🧪 Testando a Integração

### Passo 1: Instalar Dependências

```bash
npm install
```

### Passo 2: Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

### Passo 3: Testar Autenticação

1. Abra [http://localhost:3000/cadastro](http://localhost:3000/cadastro)
2. Crie uma conta de teste:
   - Nome: Seu Nome
   - E-mail: seu-email@example.com
   - Senha: suasenha123
3. Se tudo estiver correto:
   - Você receberá um e-mail de confirmação (se habilitado)
   - Ou será redirecionado para a página de login

### Passo 4: Verificar Dados no Supabase

1. Volte ao dashboard do Supabase
2. Vá em **Authentication** → **Users**
3. Você deve ver o usuário criado
4. Vá em **Table Editor** → **profiles**
5. Você deve ver o perfil criado automaticamente (graças ao trigger!)

### Passo 5: Testar Login

1. Vá em [http://localhost:3000/login](http://localhost:3000/login)
2. Faça login com as credenciais criadas
3. Você deve ser redirecionado para `/agendamentos`

## 🚀 Deploy

### Deploy no Vercel (Recomendado)

1. Faça push do código para GitHub
2. Vá em [vercel.com](https://vercel.com)
3. Importe o repositório
4. Adicione as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL` (use a URL do Vercel)
5. Deploy!

### Após Deploy

1. Volte ao Supabase → **Authentication** → **URL Configuration**
2. Adicione a URL de produção:
   ```
   https://seu-app.vercel.app
   https://seu-app.vercel.app/auth/callback
   ```

## 🔧 Troubleshooting

### Erro: "Failed to fetch"

**Problema:** Não consegue conectar ao Supabase

**Solução:**
1. Verifique se as variáveis de ambiente estão corretas
2. Reinicie o servidor de desenvolvimento
3. Verifique se o projeto Supabase está ativo (não pausado por inatividade)

### Erro: "JWT expired"

**Problema:** Token de autenticação expirou

**Solução:**
1. Faça logout e login novamente
2. Limpe os cookies do navegador
3. Verifique configurações de sessão no Supabase

### Erro: "Row Level Security policy violation"

**Problema:** Tentando acessar dados sem permissão

**Solução:**
1. Verifique se as políticas RLS foram criadas corretamente
2. Execute novamente o `schema.sql`
3. Verifique se o usuário está autenticado

### Erro: "Email confirmations are enabled"

**Problema:** E-mail não confirmado

**Solução:**
1. Confirme o e-mail clicando no link enviado
2. Ou desabilite confirmação de e-mail:
   - Supabase → Authentication → Providers
   - Desmarque "Enable email confirmations" (não recomendado para produção)

### Banco de Dados Pausou (Plano Free)

**Problema:** Projeto inativo há 7 dias

**Solução:**
1. No dashboard, clique em "Resume project"
2. Considere fazer um request por semana para manter ativo
3. Ou upgrade para plano Pro

## 📚 Recursos Adicionais

### Documentação

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

### Ferramentas Úteis

- [Supabase CLI](https://supabase.com/docs/guides/cli) - Gerenciar projeto via terminal
- [Database Migrations](https://supabase.com/docs/guides/cli/local-development) - Versionamento do schema
- [Studio](https://supabase.com/dashboard) - Dashboard visual

### Comunidade

- [Discord](https://discord.supabase.com)
- [GitHub Discussions](https://github.com/supabase/supabase/discussions)
- [Twitter](https://twitter.com/supabase)

## 🎓 Próximos Passos

Agora que o Supabase está configurado:

1. ✅ Explore o dashboard do Supabase
2. ✅ Teste criar agendamentos (veja [DESENVOLVIMENTO.md](./DESENVOLVIMENTO.md))
3. ✅ Configure backup automático (Settings → Database → Backups)
4. ✅ Monitore uso e performance (Settings → Usage)
5. ✅ Configure alertas de erro (Settings → API → Webhooks)

## ❓ Dúvidas?

Se encontrar problemas:

1. Consulte a [documentação oficial](https://supabase.com/docs)
2. Procure em [GitHub Issues](https://github.com/yurialvesferreira/AgendadorPro/issues)
3. Abra uma [nova issue](https://github.com/yurialvesferreira/AgendadorPro/issues/new)

---

**Boa sorte com seu projeto! 🚀**
