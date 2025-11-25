'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Alert } from '@/components/ui/Alert'
import { Modal } from '@/components/ui/Modal'

/**
 * Página inicial do AgendadorPro
 *
 * Implementa WCAG 2.1/2.2 nível AA com algumas características AAA:
 * - Estrutura semântica clara (header, main, sections, footer)
 * - Headings em ordem hierárquica
 * - Contraste adequado em todos os elementos
 * - Navegação por teclado completa
 * - Skip links para navegação rápida
 * - Imagens com alt text descritivo
 * - Formulários acessíveis
 * - Modais com focus trap
 * - Alertas com live regions
 */
export default function Home() {
  const [email, setEmail] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccessAlert(true)
    setEmail('')

    // Auto-hide alert after 5 seconds
    setTimeout(() => setShowSuccessAlert(false), 5000)
  }

  const features = [
    {
      title: 'Agendamento Simples',
      description: 'Interface intuitiva para criar e gerenciar agendamentos de forma rápida e eficiente.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Notificações Automáticas',
      description: 'Envie lembretes automáticos por e-mail e SMS para seus clientes.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
    {
      title: 'Gestão de Clientes',
      description: 'Mantenha um cadastro completo de seus clientes com histórico de agendamentos.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: 'Totalmente Acessível',
      description: 'Desenvolvido seguindo WCAG 2.1/2.2 para garantir acesso a todos os usuários.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section
          className="bg-gradient-to-br from-primary-50 to-primary-100 py-20 sm:py-32"
          aria-labelledby="hero-heading"
        >
          <div className="container-accessible">
            <div className="max-w-3xl mx-auto text-center">
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              >
                Simplifique seus Agendamentos com{' '}
                <span className="text-primary-500">AgendadorPro</span>
              </h1>

              <p className="text-xl text-gray-700 mb-8">
                Sistema profissional, acessível e intuitivo para gerenciar todos os seus
                compromissos em um só lugar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                >
                  Começar Gratuitamente
                </Button>
                <Button variant="outline" size="lg">
                  Ver Demonstração
                </Button>
              </div>

              {/* Success Alert */}
              {showSuccessAlert && (
                <div className="mt-8 max-w-md mx-auto">
                  <Alert
                    variant="success"
                    title="Inscrição realizada!"
                    onClose={() => setShowSuccessAlert(false)}
                  >
                    Obrigado por se inscrever em nossa newsletter. Você receberá novidades em breve!
                  </Alert>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          className="py-20 bg-white"
          aria-labelledby="features-heading"
        >
          <div className="container-accessible">
            <div className="text-center mb-16">
              <h2
                id="features-heading"
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              >
                Recursos Principais
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tudo que você precisa para gerenciar seus agendamentos de forma profissional
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <article
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div
                    className="text-primary-500 mb-4"
                    aria-hidden="true"
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section
          className="py-20 bg-primary-500 text-white"
          aria-labelledby="stats-heading"
        >
          <div className="container-accessible">
            <h2 id="stats-heading" className="sr-only">
              Estatísticas do AgendadorPro
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">10k+</div>
                <p className="text-primary-100 text-lg">Usuários Ativos</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">500k+</div>
                <p className="text-primary-100 text-lg">Agendamentos Realizados</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">99.9%</div>
                <p className="text-primary-100 text-lg">Satisfação dos Clientes</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="py-20 bg-gray-50"
          aria-labelledby="cta-heading"
        >
          <div className="container-accessible">
            <div className="max-w-2xl mx-auto text-center">
              <h2
                id="cta-heading"
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              >
                Pronto para Começar?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Cadastre-se gratuitamente e receba todas as novidades e dicas sobre gestão de agendamentos.
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <div className="flex-1">
                  <Input
                    label="E-mail"
                    showLabel={false}
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    id="newsletter-email"
                  />
                </div>
                <Button type="submit" variant="primary" size="md">
                  Inscrever-se
                </Button>
              </form>

              <p className="text-sm text-gray-500 mt-4">
                Ao se inscrever, você concorda com nossa{' '}
                <a
                  href="/privacidade"
                  className="text-primary-500 hover:text-primary-600 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                >
                  Política de Privacidade
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal de Cadastro */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Começar Gratuitamente"
        description="Crie sua conta e comece a usar o AgendadorPro hoje mesmo"
        size="md"
      >
        <form className="space-y-4">
          <Input
            label="Nome completo"
            type="text"
            placeholder="João Silva"
            required
          />
          <Input
            label="E-mail"
            type="email"
            placeholder="joao@exemplo.com"
            required
          />
          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            required
            helperText="Mínimo de 8 caracteres"
          />

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Criar Conta
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
