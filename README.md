# AgendadorPro 📅

> Sistema profissional, acessível e intuitivo para gerenciamento de agendamentos e compromissos.

[![WCAG 2.1 Level AA](https://img.shields.io/badge/WCAG-2.1%20Level%20AA-green)](https://www.w3.org/WAI/WCAG21/quickref/)
[![WCAG 2.2](https://img.shields.io/badge/WCAG-2.2-blue)](https://www.w3.org/WAI/WCAG22/quickref/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌟 Destaques

- ✅ **Acessibilidade Nível AA WCAG 2.1/2.2** - Desenvolvido com acessibilidade desde o início
- 🎨 **Design System Acessível** - Paleta de cores com contraste validado
- ⌨️ **Navegação por Teclado** - Todas as funcionalidades acessíveis via teclado
- 🔍 **Testes Automatizados** - Testes de acessibilidade com jest-axe
- 📱 **Responsivo** - Funciona perfeitamente em todos os dispositivos
- 🚀 **Performance** - Otimizado com Next.js 14 e React 18

## 📋 Índice

- [Sobre Acessibilidade](#-sobre-acessibilidade)
- [Instalação](#-instalação)
- [Desenvolvimento](#-desenvolvimento)
- [Testes](#-testes)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Componentes Acessíveis](#-componentes-acessíveis)
- [Diretrizes de Contribuição](#-diretrizes-de-contribuição)
- [Recursos](#-recursos)

## ♿ Sobre Acessibilidade

O AgendadorPro foi desenvolvido seguindo as **WCAG 2.1 e 2.2 (Web Content Accessibility Guidelines)** nível AA, com algumas características AAA.

### Conformidade WCAG

Nosso projeto implementa:

- ✅ **Perceptível**: Todo conteúdo tem alternativas textuais, contraste adequado e é adaptável
- ✅ **Operável**: Navegação completa por teclado, tempo ajustável, sem armadilhas de foco
- ✅ **Compreensível**: Linguagem clara, comportamento previsível, prevenção de erros
- ✅ **Robusto**: Compatível com tecnologias assistivas (leitores de tela, etc.)

### Recursos de Acessibilidade

- 🎯 **Skip Links** - Navegação rápida para conteúdo principal
- 🎨 **Contraste AA/AAA** - Todas as cores validadas (mínimo 4.5:1)
- ⌨️ **Keyboard Navigation** - Tab, Enter, Esc, Arrow keys
- 🔊 **Screen Reader Support** - ARIA labels, roles, live regions
- 📏 **Touch Targets** - Mínimo 44x44px (WCAG AAA) ou 24x24px (WCAG 2.2 AA)
- 🔍 **Focus Indicators** - Indicadores visuais claros em todos os elementos interativos
- 📱 **Responsive** - Zoom até 200% sem perda de funcionalidade

📖 **Documentação completa**: Veja [ACCESSIBILITY.md](./ACCESSIBILITY.md) para diretrizes detalhadas.

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Passo a Passo

```bash
# Clone o repositório
git clone https://github.com/yurialvesferreira/AgendadorPro.git

# Entre no diretório
cd AgendadorPro

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

## 💻 Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Abra http://localhost:3000 no navegador
```

### Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Cria build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint
npm run lint:a11y    # Verifica violações de acessibilidade
npm run type-check   # Verifica tipos TypeScript
npm run test         # Executa testes
npm run test:a11y    # Executa testes de acessibilidade
npm run test:watch   # Executa testes em modo watch
```

### Ferramentas de Desenvolvimento

O projeto inclui ferramentas para garantir acessibilidade durante o desenvolvimento:

- **ESLint + jsx-a11y**: Detecta problemas de acessibilidade em tempo real
- **axe-core/react**: Auditoria automática no console do navegador (dev mode)
- **jest-axe**: Testes automatizados de acessibilidade

## 🧪 Testes

### Testes de Acessibilidade

```bash
# Executar todos os testes de acessibilidade
npm run test:a11y

# Executar teste específico
npm test Button.a11y.test.tsx
```

### Exemplo de Teste

```typescript
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Button } from './Button'

test('Button should not have accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

## 📁 Estrutura do Projeto

```
AgendadorPro/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Layout raiz com skip links
│   │   ├── page.tsx            # Página inicial
│   │   └── globals.css         # Estilos globais acessíveis
│   ├── components/
│   │   ├── layout/             # Componentes de layout
│   │   │   ├── Header.tsx      # Navegação acessível
│   │   │   └── Footer.tsx      # Rodapé semântico
│   │   └── ui/                 # Componentes de UI acessíveis
│   │       ├── Button.tsx      # Botão com estados ARIA
│   │       ├── Input.tsx       # Input com labels associados
│   │       ├── Modal.tsx       # Modal com focus trap
│   │       └── Alert.tsx       # Alertas com live regions
│   ├── hooks/                  # React Hooks customizados
│   │   ├── useFocusTrap.ts     # Gerenciamento de foco
│   │   └── useKeyPress.ts      # Atalhos de teclado
│   └── utils/
│       ├── cn.ts               # Utilitário de classes
│       └── axe-setup.ts        # Configuração axe-core
├── ACCESSIBILITY.md            # Guia completo de acessibilidade
├── CONTRIBUTING.md             # Guia de contribuição
├── .eslintrc.json             # ESLint com regras a11y
├── tailwind.config.ts         # Tailwind com paleta acessível
└── jest.config.js             # Configuração de testes

```

## 🧩 Componentes Acessíveis

Todos os componentes seguem as melhores práticas WCAG:

### Button

```tsx
<Button
  variant="primary"
  size="md"
  isLoading={isLoading}
  aria-label="Salvar alterações"
>
  Salvar
</Button>
```

**Características**:
- Tamanho mínimo de toque (44x44px)
- Estados visuais claros
- Loading state com aria-busy
- Contraste adequado

### Input

```tsx
<Input
  label="E-mail"
  type="email"
  error={errors.email}
  helperText="Informe um e-mail válido"
  required
/>
```

**Características**:
- Label sempre associado
- Mensagens de erro via aria-describedby
- aria-invalid para validação
- aria-required para campos obrigatórios

### Modal

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Título do Modal"
  description="Descrição opcional"
>
  {children}
</Modal>
```

**Características**:
- Focus trap automático
- Fechamento com ESC
- Gestão de foco (retorna ao elemento que abriu)
- role="dialog" e aria-modal="true"

### Alert

```tsx
<Alert
  variant="success"
  title="Sucesso!"
  role="status"
>
  Operação realizada com sucesso.
</Alert>
```

**Características**:
- role="alert" ou "status"
- aria-live implícito
- Contraste validado para todas as variantes
- Botão de fechar acessível

## 📝 Diretrizes de Contribuição

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para diretrizes completas de contribuição.

### Checklist de Acessibilidade para PRs

Antes de abrir um Pull Request, verifique:

- [ ] Código passa no linting de acessibilidade (`npm run lint:a11y`)
- [ ] Componentes têm testes de acessibilidade
- [ ] Contraste de cores validado (mínimo 4.5:1)
- [ ] Navegação por teclado funciona completamente
- [ ] HTML semântico utilizado
- [ ] ARIA usado corretamente (quando necessário)
- [ ] Testado com leitor de tela
- [ ] Foco visível em elementos interativos
- [ ] Formulários têm labels associados
- [ ] Imagens têm alt text apropriado

## 🔧 Tecnologias

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18
- **Linguagem**: TypeScript
- **Estilos**: Tailwind CSS
- **Testes**: Jest + Testing Library + jest-axe
- **Linting**: ESLint + eslint-plugin-jsx-a11y
- **Acessibilidade**: axe-core, ARIA

## 📚 Recursos

### Documentação WCAG

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)

### Ferramentas

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Screen Reader - NVDA](https://www.nvaccess.org/download/) (Windows - Gratuito)

### Comunidade

- [A11y Project](https://www.a11yproject.com/)
- [Inclusive Components](https://inclusive-components.design/)
- [WebAIM](https://webaim.org/)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 👥 Autor

**Yuri Ferreira**

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Por favor, leia [CONTRIBUTING.md](./CONTRIBUTING.md) para detalhes sobre nosso código de conduta e processo de submissão de pull requests.

---

**Desenvolvido com ♿ acessibilidade em mente**
