import React, { forwardRef, SelectHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  error?: string
  helperText?: string
  showLabel?: boolean
  placeholder?: string
}

/**
 * Componente Select acessível seguindo WCAG 2.1/2.2
 *
 * Características de acessibilidade:
 * - Label sempre associado ao select (htmlFor/id)
 * - Mensagens de erro vinculadas via aria-describedby
 * - Estado de erro indicado via aria-invalid
 * - Campos obrigatórios marcados com aria-required
 * - Opções com disabled quando necessário
 * - Altura mínima de 44px para toque
 * - Contraste adequado
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      options,
      error,
      helperText,
      showLabel = true,
      placeholder,
      id,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    // Gerar ID único se não fornecido
    const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`
    const errorId = error ? `${selectId}-error` : undefined
    const helperId = helperText ? `${selectId}-helper` : undefined
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined

    return (
      <div className="w-full">
        <label
          htmlFor={selectId}
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

        <select
          ref={ref}
          id={selectId}
          className={cn(
            // Base
            'w-full min-h-touch px-4 py-2 rounded-lg',
            'text-base text-gray-900 bg-white',
            'border-2 border-gray-300',
            'appearance-none',
            'bg-no-repeat bg-right',
            'pr-10',
            // Ícone de seta personalizado
            'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")]',
            'bg-[length:1.5em_1.5em]',
            'bg-[right_0.5rem_center]',
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
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

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

Select.displayName = 'Select'
