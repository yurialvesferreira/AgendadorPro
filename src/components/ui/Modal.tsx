'use client'

import React, { useEffect, useRef, ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useKeyPress } from '@/hooks/useKeyPress'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnEscape?: boolean
  closeOnBackdrop?: boolean
  showCloseButton?: boolean
}

/**
 * Componente Modal acessível seguindo WCAG 2.1/2.2 e ARIA Authoring Practices
 *
 * Características de acessibilidade:
 * - Foco automaticamente capturado (focus trap)
 * - Foco retorna ao elemento que abriu o modal ao fechar
 * - Fechamento com tecla ESC
 * - Título do modal associado via aria-labelledby
 * - Descrição opcional via aria-describedby
 * - role="dialog" e aria-modal="true"
 * - Backdrop com opção de fechar ao clicar
 * - Navegação por teclado completa
 * - Previne scroll do body quando aberto
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  closeOnEscape = true,
  closeOnBackdrop = true,
  showCloseButton = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Focus trap
  useFocusTrap(modalRef, isOpen)

  // ESC key handler
  useKeyPress('Escape', () => {
    if (closeOnEscape && isOpen) {
      onClose()
    }
  })

  // Salvar e restaurar foco
  useEffect(() => {
    if (isOpen) {
      // Salvar elemento com foco atual
      previousFocusRef.current = document.activeElement as HTMLElement

      // Prevenir scroll do body
      document.body.style.overflow = 'hidden'
    } else {
      // Restaurar scroll do body
      document.body.style.overflow = ''

      // Restaurar foco ao fechar
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  const titleId = 'modal-title'
  const descriptionId = description ? 'modal-description' : undefined

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal container */}
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div
          ref={modalRef}
          className={cn(
            'relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full',
            sizeClasses[size]
          )}
        >
          {/* Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2
                  id={titleId}
                  className="text-2xl font-semibold text-gray-900"
                >
                  {title}
                </h2>
                {description && (
                  <p
                    id={descriptionId}
                    className="mt-2 text-sm text-gray-600"
                  >
                    {description}
                  </p>
                )}
              </div>

              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    'ml-4 rounded-lg p-2 text-gray-400',
                    'hover:bg-gray-100 hover:text-gray-600',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                    'min-h-touch-aa min-w-touch-aa'
                  )}
                  aria-label="Fechar modal"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-4 pb-4 sm:px-6 sm:pb-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.displayName = 'Modal'
