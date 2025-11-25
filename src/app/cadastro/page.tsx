'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { signUp } from '@/app/actions/auth'

/**
 * Página de Cadastro - Totalmente Acessível WCAG 2.1/2.2 AA
 */
export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setFieldErrors({})

    const formData = new FormData(e.currentTarget)

    // Validação de confirmação de senha no client
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setFieldErrors({ confirmPassword: 'As senhas não coincidem' })
      setIsLoading(false)
      return
    }

    try {
      const result = await signUp(formData)

      if (!result.success) {
        setError(result.error)
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors)
        }
      }
      // Se sucesso, o redirect acontece automaticamente
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-2xl font-bold text-primary-500 no-underline focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
        >
          <svg
            className="w-10 h-10"
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

        <h1 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Criar sua conta
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <Link
            href="/login"
            className="font-medium text-primary-500 hover:text-primary-600 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
          >
            Faça login
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Mensagem de erro */}
          {error && (
            <div className="mb-6">
              <Alert variant="error" title="Erro" onClose={() => setError(null)}>
                {error}
              </Alert>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <Input
              label="Nome completo"
              type="text"
              name="fullName"
              id="fullName"
              autoComplete="name"
              required
              error={fieldErrors.fullName}
              helperText="Digite seu nome completo"
            />

            <Input
              label="E-mail"
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              error={fieldErrors.email}
              helperText="Usaremos este e-mail para login"
            />

            <Input
              label="Senha"
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
              required
              error={fieldErrors.password}
              helperText="Mínimo de 8 caracteres"
            />

            <Input
              label="Confirmar senha"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="new-password"
              required
              error={fieldErrors.confirmPassword}
              helperText="Digite a senha novamente"
            />

            {/* Termos de serviço */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary-500 focus-visible:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700">
                  Li e concordo com os{' '}
                  <Link
                    href="/termos"
                    target="_blank"
                    className="text-primary-500 hover:text-primary-600 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                  >
                    Termos de Uso
                  </Link>{' '}
                  e{' '}
                  <Link
                    href="/privacidade"
                    target="_blank"
                    className="text-primary-500 hover:text-primary-600 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                  >
                    Política de Privacidade
                  </Link>
                  <span className="text-error-500" aria-label="obrigatório">
                    {' '}
                    *
                  </span>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              loadingText="Criando conta..."
            >
              Criar conta gratuita
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Já tem uma conta?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full">
                  Fazer login
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Link de volta para home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
          >
            ← Voltar para página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
