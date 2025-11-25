# Guia de Acessibilidade - AgendadorPro

## 📋 Visão Geral

Este documento estabelece as diretrizes de acessibilidade para o AgendadorPro, baseado nas **WCAG 2.1 e 2.2** (Web Content Accessibility Guidelines). Nosso objetivo é atingir conformidade **nível AA** como mínimo, com implementações AAA onde possível.

## 🎯 Princípios WCAG (POUR)

### 1. **Perceptível** (Perceivable)
Informações e componentes da interface devem ser apresentados de forma que os usuários possam perceber.

### 2. **Operável** (Operable)
Componentes da interface e navegação devem ser operáveis.

### 3. **Compreensível** (Understandable)
Informações e operações da interface devem ser compreensíveis.

### 4. **Robusto** (Robust)
Conteúdo deve ser robusto o suficiente para ser interpretado por diversas tecnologias assistivas.

---

## ✅ Checklist de Conformidade WCAG 2.1/2.2

### 🔴 Nível A (Crítico - Obrigatório)

#### 1.1 Alternativas em Texto
- [ ] **1.1.1** Todas as imagens possuem texto alternativo apropriado (`alt`)
- [ ] Imagens decorativas usam `alt=""` ou `role="presentation"`
- [ ] Ícones informativos possuem labels acessíveis (`aria-label`)

#### 1.2 Mídia Temporizada
- [ ] **1.2.1** Áudio e vídeo pré-gravados têm alternativas (legendas, transcrições)
- [ ] **1.2.2** Legendas para todo conteúdo de áudio em vídeo
- [ ] **1.2.3** Audiodescrição ou alternativa de mídia para vídeo

#### 1.3 Adaptável
- [ ] **1.3.1** Informação e relacionamentos preservados (HTML semântico)
- [ ] **1.3.2** Sequência de leitura lógica e significativa
- [ ] **1.3.3** Instruções não dependem apenas de características sensoriais (cor, forma, tamanho)

#### 1.4 Distinguível
- [ ] **1.4.1** Cor não é o único meio de transmitir informação
- [ ] **1.4.2** Controle de áudio (pausar, parar, controlar volume)

#### 2.1 Acessível por Teclado
- [ ] **2.1.1** Toda funcionalidade disponível via teclado
- [ ] **2.1.2** Sem armadilhas de teclado (keyboard trap)
- [ ] **2.1.4** Atalhos de teclado podem ser desabilitados ou remapeados

#### 2.2 Tempo Suficiente
- [ ] **2.2.1** Timeouts são ajustáveis, extensíveis ou desabilitáveis
- [ ] **2.2.2** Conteúdo que pisca pode ser pausado, parado ou escondido

#### 2.3 Convulsões e Reações Físicas
- [ ] **2.3.1** Sem conteúdo que pisca mais de 3 vezes por segundo

#### 2.4 Navegável
- [ ] **2.4.1** Skip links para pular blocos repetidos
- [ ] **2.4.2** Títulos de página descritivos e únicos (`<title>`)
- [ ] **2.4.3** Ordem de foco lógica
- [ ] **2.4.4** Propósito dos links claro pelo texto ou contexto

#### 2.5 Modalidades de Entrada
- [ ] **2.5.1** Gestos complexos têm alternativas simples
- [ ] **2.5.2** Cancelamento de ações por toque/clique
- [ ] **2.5.3** Labels visíveis correspondem aos nomes acessíveis
- [ ] **2.5.4** Ativação por movimento pode ser desabilitada

#### 3.1 Legível
- [ ] **3.1.1** Idioma da página definido (`lang="pt-BR"`)

#### 3.2 Previsível
- [ ] **3.2.1** Foco não causa mudança de contexto automaticamente
- [ ] **3.2.2** Entrada de dados não causa mudança de contexto automaticamente

#### 3.3 Assistência de Entrada
- [ ] **3.3.1** Erros de formulário são identificados e descritos
- [ ] **3.3.2** Labels ou instruções para entrada de dados

#### 4.1 Compatível
- [ ] **4.1.1** HTML válido (sem erros de sintaxe críticos)
- [ ] **4.1.2** Name, role, value para todos os componentes de UI
- [ ] **4.1.3** Mensagens de status são programaticamente determinadas

---

### 🟡 Nível AA (Recomendado - Obrigatório)

#### 1.4 Distinguível (continuação)
- [ ] **1.4.3** Contraste mínimo de 4.5:1 para texto normal
- [ ] **1.4.3** Contraste mínimo de 3:1 para texto grande (18pt+ ou 14pt+ bold)
- [ ] **1.4.4** Texto pode ser redimensionado até 200% sem perda de conteúdo
- [ ] **1.4.5** Texto como imagem apenas para decoração ou quando essencial
- [ ] **1.4.10** Reflow: conteúdo adaptável até 320px sem scroll horizontal
- [ ] **1.4.11** Contraste de 3:1 para componentes de UI e gráficos
- [ ] **1.4.12** Espaçamento de texto ajustável sem perda de conteúdo
- [ ] **1.4.13** Conteúdo adicional (hover/focus) é dismissible, hoverable e persistente

#### 2.4 Navegável (continuação)
- [ ] **2.4.5** Múltiplas formas de encontrar páginas (menu, busca, mapa do site)
- [ ] **2.4.6** Headings e labels descritivos
- [ ] **2.4.7** Indicador de foco visível

#### 2.5 Modalidades de Entrada (continuação)
- [ ] **2.5.7** Ações de arrastar têm alternativas
- [ ] **2.5.8** Tamanho de toque mínimo de 24x24 pixels (WCAG 2.2)

#### 3.1 Legível (continuação)
- [ ] **3.1.2** Idioma de partes do conteúdo definido quando diferente

#### 3.2 Previsível (continuação)
- [ ] **3.2.3** Navegação consistente entre páginas
- [ ] **3.2.4** Identificação consistente de componentes

#### 3.3 Assistência de Entrada (continuação)
- [ ] **3.3.3** Sugestões de correção de erros
- [ ] **3.3.4** Prevenção de erros em transações legais/financeiras

---

### 🟢 Nível AAA (Excelência - Opcional)

- [ ] **1.4.6** Contraste de 7:1 para texto normal
- [ ] **1.4.8** Justificação de texto evitada, espaçamento adequado
- [ ] **2.1.3** Toda funcionalidade disponível apenas por teclado
- [ ] **2.4.8** Indicação de localização atual (breadcrumbs)
- [ ] **2.4.9** Propósito dos links apenas pelo texto
- [ ] **2.4.10** Headings de seção presentes
- [ ] **3.1.3** Explicação de jargão técnico e idiomas incomuns
- [ ] **3.3.5** Ajuda contextual disponível
- [ ] **3.3.6** Prevenção de erros em todos os formulários

---

## 🛠️ Implementações Técnicas

### HTML Semântico

```html
<!-- ✅ BOM -->
<header>
  <nav aria-label="Navegação principal">
    <ul>
      <li><a href="/">Início</a></li>
    </ul>
  </nav>
</header>

<main>
  <h1>Título Principal</h1>
  <section aria-labelledby="eventos">
    <h2 id="eventos">Meus Eventos</h2>
  </section>
</main>

<footer>
  <!-- Informações do rodapé -->
</footer>

<!-- ❌ RUIM -->
<div class="header">
  <div class="nav">
    <div class="link">Início</div>
  </div>
</div>
```

### ARIA (Accessible Rich Internet Applications)

```jsx
// ✅ Uso apropriado de ARIA
<button
  aria-label="Fechar modal"
  aria-pressed={isActive}
  aria-expanded={isOpen}
  onClick={handleClick}
>
  <X aria-hidden="true" />
</button>

// Live regions para atualizações dinâmicas
<div role="status" aria-live="polite" aria-atomic="true">
  {mensagemSucesso}
</div>

// ❌ ARIA desnecessário
<button aria-label="Salvar">Salvar</button> {/* Redundante */}
```

### Navegação por Teclado

```jsx
// ✅ Componente acessível por teclado
function AccessibleDropdown() {
  const handleKeyDown = (e) => {
    switch(e.key) {
      case 'Escape':
        closeDropdown();
        break;
      case 'ArrowDown':
        e.preventDefault();
        focusNextItem();
        break;
      case 'ArrowUp':
        e.preventDefault();
        focusPreviousItem();
        break;
      case 'Home':
        e.preventDefault();
        focusFirstItem();
        break;
      case 'End':
        e.preventDefault();
        focusLastItem();
        break;
    }
  };

  return (
    <div role="menu" onKeyDown={handleKeyDown}>
      {/* items */}
    </div>
  );
}
```

### Contraste de Cores

```css
/* ✅ Contraste adequado (AA) */
:root {
  /* Ratio 7:1 - AAA */
  --text-primary: #1a1a1a;
  --bg-primary: #ffffff;

  /* Ratio 4.5:1 - AA */
  --text-secondary: #595959;

  /* Ratio 3:1 para UI components - AA */
  --border-color: #767676;

  /* Estados de foco visíveis */
  --focus-ring: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

*:focus-visible {
  outline: 2px solid var(--text-primary);
  outline-offset: 2px;
}

/* ❌ Contraste insuficiente */
.bad-contrast {
  color: #999999; /* Ratio 2.8:1 - Falha AA */
  background: #ffffff;
}
```

### Formulários Acessíveis

```jsx
// ✅ Formulário acessível completo
<form onSubmit={handleSubmit} noValidate>
  <div>
    <label htmlFor="email">
      E-mail *
      <span className="sr-only">(obrigatório)</span>
    </label>
    <input
      id="email"
      type="email"
      required
      aria-required="true"
      aria-invalid={errors.email ? 'true' : 'false'}
      aria-describedby={errors.email ? 'email-error' : undefined}
    />
    {errors.email && (
      <span id="email-error" role="alert" className="error">
        {errors.email}
      </span>
    )}
  </div>

  <button type="submit">
    Enviar formulário
  </button>
</form>

// ❌ Formulário inacessível
<input placeholder="Digite seu e-mail" /> {/* Sem label */}
```

### Skip Links

```jsx
// ✅ Skip link para navegação rápida
<a href="#main-content" className="skip-link">
  Pular para o conteúdo principal
</a>

// CSS
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

---

## 🧪 Ferramentas de Teste

### Automáticas
- **axe DevTools** - Extensão de browser
- **Lighthouse** - Auditoria integrada no Chrome
- **eslint-plugin-jsx-a11y** - Linting em tempo de desenvolvimento
- **@axe-core/react** - Testes em desenvolvimento

### Manuais
- **Navegação apenas por teclado** (Tab, Enter, Esc, Arrow keys)
- **Leitores de tela**:
  - NVDA (Windows - gratuito)
  - JAWS (Windows)
  - VoiceOver (macOS/iOS)
  - TalkBack (Android)
- **Zoom de página** até 200%
- **Modo de alto contraste**
- **Simuladores de daltonismo**

### Testes Automatizados

```javascript
// Exemplo com @axe-core/react
import { axe } from '@axe-core/react';

if (process.env.NODE_ENV !== 'production') {
  axe(React, ReactDOM, 1000);
}
```

---

## 📱 Responsividade e Acessibilidade Mobile

- Tamanho mínimo de toque: **44x44px** (WCAG 2.1 AAA) ou **24x24px** (WCAG 2.2 AA)
- Espaçamento adequado entre elementos interativos
- Suporte a zoom até 200% sem perda de funcionalidade
- Orientação não bloqueada (portrait/landscape)

---

## 🎨 Sistema de Design Acessível

### Paleta de Cores com Contraste Validado

```
Primária: #0066CC (azul) - Contraste 7.2:1 com branco
Secundária: #28A745 (verde) - Contraste 4.5:1 com branco
Erro: #DC3545 (vermelho) - Contraste 5.3:1 com branco
Aviso: #856404 (amarelo escuro) - Contraste 6.4:1 com branco
Texto principal: #1a1a1a - Contraste 15.8:1 com branco
Texto secundário: #595959 - Contraste 7.0:1 com branco
```

### Tipografia

- Tamanho mínimo: **16px** (1rem)
- Altura de linha: **1.5** mínimo (1.6 recomendado)
- Espaçamento entre parágrafos: **1.5x** o tamanho da fonte
- Fontes legíveis: sans-serif para UI, serif para longos textos

---

## 📚 Recursos e Referências

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [Inclusive Components](https://inclusive-components.design/)

---

## 🚀 Prioridades de Implementação

### Fase 1: Fundação (Sprint 1-2)
1. HTML semântico
2. Navegação por teclado
3. Labels e textos alternativos
4. Contraste de cores

### Fase 2: Aprimoramento (Sprint 3-4)
1. ARIA onde necessário
2. Skip links
3. Gestão de foco
4. Validação de formulários

### Fase 3: Refinamento (Sprint 5-6)
1. Testes com leitores de tela
2. Otimizações de performance
3. Documentação
4. Testes com usuários

---

## ⚠️ Antipadrões Comuns a Evitar

1. ❌ Usar `div` ou `span` com `onClick` ao invés de `button`
2. ❌ Remover o outline de foco sem substituto visível
3. ❌ Usar `placeholder` como substituto de `label`
4. ❌ Abrir modais sem gerenciar o foco
5. ❌ Conteúdo visível apenas no hover (sem foco por teclado)
6. ❌ Usar ARIA quando HTML semântico é suficiente
7. ❌ Navegação não linear ou ordem de tabulação forçada
8. ❌ Texto em imagens
9. ❌ Timeouts sem aviso ou controle
10. ❌ CAPTCHAs sem alternativa acessível

---

**Última atualização:** 2025-11-25
**Responsável:** Equipe AgendadorPro
**Contato:** [email do responsável por acessibilidade]
