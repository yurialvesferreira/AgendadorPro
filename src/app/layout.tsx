import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'AgendadorPro - Sistema Profissional de Agendamento',
  description: 'Sistema completo e acessível para gerenciamento de agendamentos e compromissos',
  keywords: ['agendamento', 'calendário', 'compromissos', 'acessível', 'WCAG'],
  authors: [{ name: 'Yuri Ferreira' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#0066cc',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {/* Skip link para navegação rápida */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-gray-900 focus:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Pular para o conteúdo principal
        </a>

        {children}
      </body>
    </html>
  )
}
