import { useEffect } from 'react'

/**
 * Hook para detectar pressionamento de teclas específicas
 * Útil para atalhos de teclado e navegação acessível
 *
 * @param targetKey - Tecla alvo (ex: 'Escape', 'Enter', 'ArrowDown')
 * @param callback - Função a ser chamada quando a tecla é pressionada
 * @param options - Opções adicionais (preventDefault, etc)
 */
export function useKeyPress(
  targetKey: string,
  callback: (event: KeyboardEvent) => void,
  options?: {
    preventDefault?: boolean
    stopPropagation?: boolean
  }
) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        if (options?.preventDefault) {
          event.preventDefault()
        }
        if (options?.stopPropagation) {
          event.stopPropagation()
        }
        callback(event)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [targetKey, callback, options])
}
