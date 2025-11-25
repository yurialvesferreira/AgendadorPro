# Guia de Contribuição - AgendadorPro

Obrigado por considerar contribuir com o AgendadorPro! Este documento fornece diretrizes para contribuir com o projeto, com foco especial em **acessibilidade**.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Padrões de Acessibilidade](#padrões-de-acessibilidade)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Testes](#testes)
- [Commits e Pull Requests](#commits-e-pull-requests)

## 📜 Código de Conduta

Este projeto segue um código de conduta de inclusão e respeito. Ao participar, você concorda em manter um ambiente acolhedor para todos.

### Nossos Compromissos

- Usar linguagem inclusiva e acolhedora
- Respeitar diferentes pontos de vista e experiências
- Aceitar críticas construtivas graciosamente
- Focar no que é melhor para a comunidade
- Demonstrar empatia com outros membros da comunidade

## 🤝 Como Posso Contribuir?

### Reportando Bugs

Antes de criar um bug report:

1. Verifique se o bug já não foi reportado
2. Verifique se o bug persiste na última versão
3. Colete informações sobre o bug

**Template de Bug Report:**

```markdown
**Descrição do Bug**
Descrição clara e concisa do bug.

**Para Reproduzir**
Passos para reproduzir:
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

**Comportamento Esperado**
O que você esperava que acontecesse.

**Impacto na Acessibilidade**
- [ ] Afeta navegação por teclado
- [ ] Afeta leitores de tela
- [ ] Problema de contraste
- [ ] Outro: ___________

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
 - OS: [ex: Windows 10]
 - Browser: [ex: Chrome 120]
 - Tecnologia Assistiva: [ex: NVDA, JAWS]
```

### Reportando Problemas de Acessibilidade

Problemas de acessibilidade são tratados como **ALTA PRIORIDADE**. Use o template acima e marque com a label `accessibility`.

### Sugerindo Melhorias

Para sugerir melhorias:

1. Verifique se a melhoria já não foi sugerida
2. Descreva o problema atual
3. Descreva a solução proposta
4. Descreva alternativas consideradas
5. Se for relacionado a acessibilidade, cite as diretrizes WCAG relevantes

## ♿ Padrões de Acessibilidade

**TODOS** os componentes e funcionalidades DEVEM seguir WCAG 2.1/2.2 nível AA no mínimo.

### Checklist de Acessibilidade Obrigatória

Antes de submeter qualquer código, verifique:

#### 1. HTML Semântico

```tsx
// ✅ BOM
<button onClick={handleClick}>Clique aqui</button>

// ❌ RUIM
<div onClick={handleClick}>Clique aqui</div>
```

#### 2. Labels e Textos Alternativos

```tsx
// ✅ BOM
<img src="logo.png" alt="Logo AgendadorPro" />
<Input label="Nome" id="name" />

// ❌ RUIM
<img src="logo.png" />
<input placeholder="Nome" />
```

#### 3. Navegação por Teclado

```tsx
// ✅ BOM - Modal com gestão de foco
function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      // Captura foco
      // Previne scroll
    }
  }, [isOpen])

  return (
    <div role="dialog" aria-modal="true">
      {/* Conteúdo com focus trap */}
    </div>
  )
}
```

#### 4. Contraste de Cores

Use apenas cores da paleta validada em `tailwind.config.ts`:

```tsx
// ✅ BOM - Contraste 7.2:1
<div className="bg-primary-500 text-white">

// ❌ RUIM - Contraste insuficiente
<div className="bg-yellow-200 text-white">
```

**Ferramentas de verificação:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

#### 5. Estados de Foco Visíveis

```css
/* ✅ BOM - Foco sempre visível */
button:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* ❌ RUIM - Remove outline sem substituto */
button:focus {
  outline: none;
}
```

#### 6. ARIA - Use com Moderação

```tsx
// ✅ BOM - HTML semântico é suficiente
<button>Fechar</button>

// 🟡 OK - ARIA quando necessário
<button aria-label="Fechar modal">
  <X aria-hidden="true" />
</button>

// ❌ RUIM - ARIA redundante
<button aria-label="Salvar">Salvar</button>
```

**Primeira regra do ARIA:**
> Se você pode usar um elemento HTML nativo com a semântica e comportamento que você precisa, **faça isso** ao invés de reutilizar um elemento e adicionar ARIA.

#### 7. Formulários Acessíveis

```tsx
// ✅ BOM
<form>
  <label htmlFor="email">
    E-mail *
  </label>
  <input
    id="email"
    type="email"
    required
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <span id="email-error" role="alert">
      E-mail inválido
    </span>
  )}
</form>

// ❌ RUIM
<input placeholder="E-mail *" />
{hasError && <span style={{color: 'red'}}>Erro!</span>}
```

#### 8. Tamanhos de Toque

```tsx
// ✅ BOM - Mínimo 44x44px (AAA) ou 24x24px (AA)
<button className="min-h-touch min-w-touch">

// ❌ RUIM - Área de toque muito pequena
<button className="h-4 w-4">
```

#### 9. Headings Hierárquicos

```tsx
// ✅ BOM
<h1>Título Principal</h1>
<section>
  <h2>Seção 1</h2>
  <h3>Subseção 1.1</h3>
  <h3>Subseção 1.2</h3>
</section>
<section>
  <h2>Seção 2</h2>
</section>

// ❌ RUIM
<h1>Título</h1>
<h3>Pulou o h2</h3>
<h2>Ordem errada</h2>
```

#### 10. Live Regions

```tsx
// ✅ BOM - Anúncios para leitores de tela
<div role="status" aria-live="polite">
  {successMessage}
</div>

<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

### Testando Acessibilidade

#### Testes Automatizados (Obrigatório)

```tsx
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

test('Component should not have accessibility violations', async () => {
  const { container } = render(<Component />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

#### Testes Manuais (Recomendado)

1. **Navegação por Teclado**
   - [ ] Tab percorre todos os elementos interativos
   - [ ] Shift+Tab navega na ordem reversa
   - [ ] Enter/Space ativam botões e links
   - [ ] Esc fecha modals e dropdowns
   - [ ] Arrow keys navegam em listas e menus

2. **Leitor de Tela**
   - [ ] Testar com NVDA (Windows) ou VoiceOver (Mac)
   - [ ] Todos os elementos interativos são anunciados
   - [ ] Anúncios são claros e compreensíveis
   - [ ] Estados (expandido, selecionado, etc.) são anunciados

3. **Zoom**
   - [ ] Testar zoom de 200% (mínimo AA)
   - [ ] Conteúdo permanece visível
   - [ ] Funcionalidade não é perdida
   - [ ] Sem scroll horizontal

4. **Contraste**
   - [ ] Verificar com ferramentas automáticas
   - [ ] Testar em modo de alto contraste
   - [ ] Testar com simuladores de daltonismo

## 🔧 Processo de Desenvolvimento

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub

# Clone seu fork
git clone https://github.com/SEU-USUARIO/AgendadorPro.git
cd AgendadorPro

# Adicione o upstream
git remote add upstream https://github.com/yurialvesferreira/AgendadorPro.git
```

### 2. Crie uma Branch

```bash
# Atualize sua main
git checkout main
git pull upstream main

# Crie uma branch para sua feature/fix
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-bug
# ou
git checkout -b a11y/melhoria-acessibilidade
```

### 3. Desenvolva

```bash
# Instale dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Execute linting durante desenvolvimento
npm run lint:a11y
```

### 4. Teste

```bash
# Execute todos os testes
npm test

# Execute testes de acessibilidade
npm run test:a11y

# Verifique tipos
npm run type-check
```

### 5. Commit

```bash
# Adicione suas mudanças
git add .

# Commit com mensagem descritiva
git commit -m "feat: adiciona componente Select acessível

- Implementa Select com navegação por teclado
- Adiciona suporte a ARIA (role, aria-expanded, etc.)
- Testes de acessibilidade com jest-axe
- Contraste validado para todas as variantes

Closes #123"
```

**Convenção de Commits:**

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `a11y:` - Melhoria de acessibilidade
- `docs:` - Documentação
- `style:` - Formatação de código
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Manutenção

### 6. Push e Pull Request

```bash
# Push para seu fork
git push origin feature/nome-da-feature
```

Abra um Pull Request no GitHub com:

- **Título claro**: "feat: adiciona componente Select acessível"
- **Descrição detalhada**: O que foi mudado e por quê
- **Checklist de acessibilidade** (veja seção abaixo)
- **Screenshots/GIFs** se aplicável
- **Issue relacionada**: "Closes #123"

## ✅ Checklist para Pull Requests

Copie e cole este checklist no seu PR:

```markdown
## Checklist de Acessibilidade

- [ ] Código passa em `npm run lint:a11y` sem erros
- [ ] Testes de acessibilidade adicionados/atualizados
- [ ] Contraste de cores validado (mínimo 4.5:1)
- [ ] Navegação por teclado funciona completamente
- [ ] Testado com Tab, Enter, Esc, Arrow keys
- [ ] HTML semântico utilizado
- [ ] ARIA usado corretamente (quando necessário)
- [ ] Testado com leitor de tela (NVDA/VoiceOver)
- [ ] Foco visível em todos os elementos interativos
- [ ] Formulários têm labels apropriadamente associados
- [ ] Imagens têm alt text descritivo
- [ ] Tamanhos de toque adequados (mínimo 24x24px)
- [ ] Headings em ordem hierárquica
- [ ] Zoom de 200% testado

## Checklist Geral

- [ ] Testes unitários passam
- [ ] Build de produção funciona (`npm run build`)
- [ ] Documentação atualizada se necessário
- [ ] Sem console.log ou código de debug
```

## 📝 Padrões de Código

### TypeScript

- Use TypeScript para todo código novo
- Evite `any` - use tipos apropriados
- Exporte interfaces e types quando reutilizáveis

### React

- Use componentes funcionais e hooks
- Prefira composição sobre herança
- Mantenha componentes pequenos e focados
- Use `forwardRef` quando apropriado

### Estilos

- Use Tailwind CSS classes
- Para estilos customizados, use classes CSS no `globals.css`
- Sempre use a paleta de cores validada
- Prefira utility classes sobre estilos inline

### Nomenclatura

```typescript
// Componentes: PascalCase
export const Button = () => {}

// Hooks: camelCase com prefixo 'use'
export const useKeyPress = () => {}

// Utilitários: camelCase
export const formatDate = () => {}

// Constantes: UPPER_CASE
export const MAX_FILE_SIZE = 5000000
```

## 🚀 Recursos Adicionais

### Documentação

- [ACCESSIBILITY.md](./ACCESSIBILITY.md) - Guia completo de acessibilidade
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Ferramentas

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Aprendizado

- [Web Accessibility by Google (Udacity)](https://www.udacity.com/course/web-accessibility--ud891)
- [A11ycasts (YouTube)](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
- [Inclusive Components](https://inclusive-components.design/)

## ❓ Dúvidas?

Se você tiver dúvidas:

1. Consulte a [documentação](./README.md)
2. Procure em [issues existentes](https://github.com/yurialvesferreira/AgendadorPro/issues)
3. Abra uma [nova issue](https://github.com/yurialvesferreira/AgendadorPro/issues/new)

## 🙏 Agradecimentos

Obrigado por contribuir com o AgendadorPro e ajudar a tornar a web mais acessível para todos!

---

**Desenvolvido com ♿ acessibilidade em mente**
