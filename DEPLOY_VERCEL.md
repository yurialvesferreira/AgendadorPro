# 🚀 Deploy no Vercel - Guia Passo a Passo

Deploy automático e gratuito do AgendadorPro no Vercel em **5 minutos**.

## ⚡ Quick Start

### 1️⃣ Preparar Código (Já feito!)

```bash
# Código já está no GitHub
# Branch: claude/improve-accessibility-wcag-01V2kCCWgy79oReRSP66PJrc
```

### 2️⃣ Deploy no Vercel

1. **Acesse:** [vercel.com](https://vercel.com)

2. **Login:**
   - Clique em "Sign Up" ou "Login"
   - Use sua conta GitHub

3. **Novo Projeto:**
   - Clique em "Add New..." → "Project"
   - Selecione o repositório: `yurialvesferreira/AgendadorPro`
   - Clique em "Import"

4. **Configuração do Projeto:**

```
Project Name: agendador-pro (ou seu nome preferido)
Framework Preset: Next.js (detectado automaticamente)
Root Directory: ./
Build Command: npm run build (preenchido automaticamente)
Output Directory: .next (preenchido automaticamente)
Install Command: npm install (preenchido automaticamente)
```

5. **Variáveis de Ambiente:**

Clique em "Environment Variables" e adicione:

```bash
# Copie do seu .env.local
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...sua-chave-aqui
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...sua-chave-service-aqui
NEXT_PUBLIC_APP_URL=https://seu-app.vercel.app
```

**IMPORTANTE:**
- ⚠️ Adicione as variáveis para **Production**, **Preview** e **Development**
- ⚠️ `NEXT_PUBLIC_APP_URL` vai mudar após o primeiro deploy

6. **Deploy:**
   - Clique em "Deploy"
   - Aguarde 2-3 minutos
   - 🎉 Pronto!

### 3️⃣ Configurar URL no Supabase

Após o primeiro deploy, você receberá uma URL tipo: `https://agendador-pro-xyz.vercel.app`

1. Copie a URL
2. Vá no Supabase Dashboard
3. **Authentication** → **URL Configuration**
4. Adicione em "Redirect URLs":
   ```
   https://seu-app.vercel.app
   https://seu-app.vercel.app/auth/callback
   ```

5. Volte ao Vercel
6. **Settings** → **Environment Variables**
7. Edite `NEXT_PUBLIC_APP_URL` com a URL real
8. **Redeploy** (Settings → Deployments → ... → Redeploy)

---

## 🔄 CI/CD Automático

### Deploy Automático Configurado

Cada push para as branches configuradas faz deploy automático:

- **`main`** → Deploy em produção (https://seu-app.vercel.app)
- **`claude/**`** → Deploy de preview (https://preview-xyz.vercel.app)
- **Pull Requests** → Preview automático

### Ver Logs

1. Vercel Dashboard → Seu Projeto
2. "Deployments"
3. Clique em qualquer deploy
4. Ver "Building", "Checks" e "Runtime Logs"

---

## ⚙️ Configurações Avançadas

### Domínio Customizado

1. Vercel → Seu Projeto → Settings → Domains
2. Adicione: `seudominio.com`
3. Configure DNS conforme instruções
4. SSL automático ✅

### Proteção de Branch

1. Settings → Git
2. Configure production branch: `main`
3. Habilite "Auto Deploy for Branch Pushes"

### Monitoring

1. Vercel Analytics (gratuito)
2. Vercel Speed Insights
3. Ver métricas em "Analytics" tab

---

## 🐛 Troubleshooting

### Build Failed

**Erro:** `Module not found` ou `Type error`

**Solução:**
```bash
# Testar localmente primeiro
npm run build

# Se passar localmente mas falhar no Vercel:
# 1. Checar variáveis de ambiente
# 2. Limpar cache: Settings → General → Clear Build Cache
```

### Error 500 em Produção

**Causa:** Variáveis de ambiente faltando

**Solução:**
1. Settings → Environment Variables
2. Verificar todas as 4 variáveis
3. Redeploy

### Login não funciona

**Causa:** URL não configurada no Supabase

**Solução:**
1. Supabase → Authentication → URL Configuration
2. Adicionar URL de produção
3. Testar novamente

### GitHub Actions falhando

**Causa:** Secrets não configurados

**Solução:**
1. GitHub → Repository → Settings → Secrets and variables → Actions
2. Adicionar:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📊 Métricas de Performance

### Lighthouse Scores Esperados

- **Performance:** 90+
- **Accessibility:** 100 ✅
- **Best Practices:** 100
- **SEO:** 100

### Web Vitals

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

---

## 🔐 Segurança

### Headers de Segurança

Já configurados em `next.config.js`:

- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy: origin-when-cross-origin

### HTTPS

- ✅ SSL automático via Vercel
- ✅ HTTP → HTTPS redirect automático

### Environment Variables

- ✅ Nunca commitar `.env.local`
- ✅ Usar Vercel Environment Variables
- ✅ Diferentes valores para Production/Preview/Development

---

## 💰 Custos

### Vercel Free Tier

✅ **Incluído gratuitamente:**
- Bandwidth: 100 GB/mês
- Build Minutes: 6.000 min/mês
- Serverless Functions: 100 GB-horas
- Edge Functions: 500k requests
- Deployments: Ilimitados
- Colaboradores: Ilimitados

### Supabase Free Tier

✅ **Incluído gratuitamente:**
- Database: 500 MB
- Storage: 1 GB
- Bandwidth: 2 GB/mês
- Edge Functions: 500k requests
- Auth Users: 50.000

**Total:** R$ 0,00/mês para começar! 🎉

---

## 📞 Suporte

### Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Vercel Discord](https://discord.gg/vercel)
- [Status Page](https://www.vercel-status.com/)

### Logs e Debug

```bash
# Ver logs em tempo real
vercel logs <url-do-deploy>

# Ver last deployment
vercel ls
```

---

## ✅ Checklist de Deploy

- [ ] Código commitado e pushed para GitHub
- [ ] Projeto importado no Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Primeiro deploy bem-sucedido
- [ ] URL de produção copiada
- [ ] URL adicionada no Supabase
- [ ] Redeploy após atualizar variáveis
- [ ] Teste de login em produção
- [ ] CI/CD rodando corretamente
- [ ] Lighthouse Audit > 90

---

**Deploy feito!** Agora seu app está no ar 24/7! 🚀

**URL:** https://seu-app.vercel.app
