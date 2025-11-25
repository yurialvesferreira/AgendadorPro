/**
 * Configuração do axe-core para desenvolvimento
 *
 * Este arquivo integra o axe-core/react no ambiente de desenvolvimento
 * para detectar violações de acessibilidade em tempo real.
 *
 * As violações serão exibidas no console do navegador.
 */

let axeInitialized = false

export const initAxe = async () => {
  if (
    typeof window === 'undefined' ||
    process.env.NODE_ENV === 'production' ||
    axeInitialized
  ) {
    return
  }

  try {
    const React = await import('react')
    const ReactDOM = await import('react-dom')
    const axe = await import('@axe-core/react')

    await axe.default(React, ReactDOM, 1000, {
      rules: [
        // Configurações de regras específicas se necessário
        {
          id: 'color-contrast',
          enabled: true,
        },
        {
          id: 'label',
          enabled: true,
        },
        {
          id: 'button-name',
          enabled: true,
        },
        {
          id: 'link-name',
          enabled: true,
        },
      ],
    })

    axeInitialized = true
    console.log('✅ axe-core inicializado para testes de acessibilidade em tempo real')
  } catch (error) {
    console.error('Erro ao inicializar axe-core:', error)
  }
}
