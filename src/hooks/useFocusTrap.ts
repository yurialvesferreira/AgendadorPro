import { useEffect, RefObject } from 'react'

/**
 * Hook para capturar o foco dentro de um elemento (focus trap)
 * Útil para modais, dropdowns e outros componentes que precisam manter o foco
 *
 * @param elementRef - Referência ao elemento que deve capturar o foco
 * @param isActive - Se o focus trap está ativo
 */
export function useFocusTrap(
  elementRef: RefObject<HTMLElement>,
  isActive: boolean
) {
  useEffect(() => {
    if (!isActive || !elementRef.current) return

    const element = elementRef.current

    // Elementos focáveis
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ')

    const getFocusableElements = (): HTMLElement[] => {
      return Array.from(element.querySelectorAll(focusableSelectors))
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      // Shift + Tab
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      }
      // Tab
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    // Focar primeiro elemento ao ativar
    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }

    // Adicionar listener
    element.addEventListener('keydown', handleTabKey as EventListener)

    return () => {
      element.removeEventListener('keydown', handleTabKey as EventListener)
    }
  }, [elementRef, isActive])
}
