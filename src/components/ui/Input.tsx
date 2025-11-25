import React, { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
  showLabel?: boolean
}

/**
 * Componente Input acessível seguindo WCAG 2.1/2.2
 *
 * Características de acessibilidade:
 * - Label sempre associado ao input (htmlFor/id)
 * - Mensagens de erro vinculadas via aria-describedby
 * - Estado de erro indicado via aria-invalid
 * - Campos obrigatórios marcados com aria-required
 * - Altura mínima de 44px para toque
 * - Contraste adequado (4.5:1 mínimo)
 * - Indicador de foco visível
 * - Helper text para instruções adicionais
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      showLabel = true,
      id,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    // Gerar ID único se não fornecido
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`
    const errorId = error ? `${inputId}-error` : undefined
    const helperId = helperText ? `${inputId}-helper` : undefined
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined

    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className={cn(
            'block text-sm font-medium text-gray-900 mb-1',
            !showLabel && 'sr-only'
          )}
        >
          {label}
          {required && (
            <span className="text-error-500 ml-1" aria-label="obrigatório">
              *
            </span>
          )}
        </label>

        {helperText && !error && (
          <p id={helperId} className="text-sm text-gray-600 mb-1">
            {helperText}
          </p>
        )}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            // Base
            'w-full min-h-touch px-4 py-2 rounded-lg',
            'text-base text-gray-900 bg-white',
            'border-2 border-gray-300',
            'placeholder:text-gray-500',
            // Estados
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500',
            'hover:border-gray-400',
            'disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60',
            // Erro
            error && 'border-error-500 focus-visible:ring-error-500 focus-visible:border-error-500',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          aria-required={required}
          disabled={disabled}
          {...props}
        />

        {error && (
          <p
            id={errorId}
            role="alert"
            className="mt-1 text-sm text-error-600 flex items-start gap-1"
          >
            <svg
              className="w-4 h-4 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
