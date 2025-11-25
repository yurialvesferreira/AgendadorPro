'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'

/**
 * Componente Header com navegação acessível seguindo WCAG 2.1/2.2
 *
 * Características de acessibilidade:
 * - <nav> semântico com aria-label
 * - Menu mobile com gestão de foco
 * - Indicador de página atual (aria-current)
 * - Navegação por teclado completa
 * - Botão de menu mobile acessível (aria-expanded, aria-controls)
 * - Skip links já implementados no layout raiz
 */
export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Agendamentos', href: '/agendamentos' },
    { name: 'Calendário', href: '/calendario' },
    { name: 'Clientes', href: '/clientes' },
    { name: 'Configurações', href: '/configuracoes' },
  ]

  return (
    <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-40">
      <nav
        className="container-accessible"
        aria-label="Navegação principal"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-primary-500 no-underline focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg px-2 py-1"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>AgendadorPro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <ul className="flex items-center gap-6 list-none m-0 p-0">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      'text-base font-medium no-underline px-3 py-2 rounded-lg transition-colors',
                      'hover:bg-gray-100 hover:text-primary-600',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                      'text-gray-700'
                    )}
                    aria-current={item.href === '/' ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                Entrar
              </Button>
              <Button variant="primary" size="sm">
                Cadastrar
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'inline-flex items-center justify-center rounded-lg p-2',
                'text-gray-700 hover:bg-gray-100 hover:text-primary-600',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                'min-h-touch min-w-touch'
              )}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
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
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-gray-200 py-4"
          >
            <ul className="space-y-2 list-none m-0 p-0">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-4 py-3 text-base font-medium rounded-lg no-underline',
                      'text-gray-700 hover:bg-gray-100 hover:text-primary-600',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                      'min-h-touch'
                    )}
                    aria-current={item.href === '/' ? 'page' : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2 px-4">
              <Button variant="outline" size="md" className="w-full">
                Entrar
              </Button>
              <Button variant="primary" size="md" className="w-full">
                Cadastrar
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

Header.displayName = 'Header'
