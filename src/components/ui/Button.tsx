import React, { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  loadingText?: string
}

/**
 * Componente Button acessível seguindo WCAG 2.1/2.2
 *
 * Características de acessibilidade:
 * - Tamanho mínimo de toque: 44x44px (WCAG AAA) ou 24x24px (WCAG 2.2 AA)
 * - Contraste adequado (mínimo 4.5:1 para texto)
 * - Estados visuais claros (hover, focus, disabled, loading)
 * - Indicador de foco visível
 * - Suporte a aria-label e aria-describedby
 * - Loading state acessível com aria-busy
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText = 'Carregando...',
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      // Base
      'inline-flex items-center justify-center gap-2',
      'font-medium rounded-lg transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-60 disabled:cursor-not-allowed',
      // Tamanhos mínimos de toque
      size === 'sm' && 'min-h-touch-aa min-w-touch-aa px-3 py-1.5 text-sm',
      size === 'md' && 'min-h-touch px-4 py-2 text-base',
      size === 'lg' && 'min-h-[48px] px-6 py-3 text-lg',
    )

    const variantStyles = {
      primary: cn(
        'bg-primary-500 text-white',
        'hover:bg-primary-600',
        'focus-visible:ring-primary-500',
        'active:bg-primary-700'
      ),
      secondary: cn(
        'bg-gray-200 text-gray-900',
        'hover:bg-gray-300',
        'focus-visible:ring-gray-500',
        'active:bg-gray-400'
      ),
      outline: cn(
        'border-2 border-primary-500 text-primary-500 bg-transparent',
        'hover:bg-primary-50',
        'focus-visible:ring-primary-500',
        'active:bg-primary-100'
      ),
      ghost: cn(
        'text-primary-500 bg-transparent',
        'hover:bg-primary-50',
        'focus-visible:ring-primary-500',
        'active:bg-primary-100'
      ),
      danger: cn(
        'bg-error-500 text-white',
        'hover:bg-error-600',
        'focus-visible:ring-error-500',
        'active:bg-error-700'
      ),
    }

    return (
      <button
        ref={ref}
        type={type}
        className={cn(baseStyles, variantStyles[variant], className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
              role="status"
              aria-label="Carregando"
            />
            <span>{loadingText}</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
