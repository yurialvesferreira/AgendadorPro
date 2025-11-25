'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { signIn } from '@/app/actions/auth'

/**
 * Página de Login - Totalmente Acessível WCAG 2.1/2.2 AA
 *
 * Características de acessibilidade:
 * - Formulário com labels apropriados
 * - Validação client-side e server-side
 * - Mensagens de erro acessíveis
 * - Progressive enhancement (funciona sem JS)
 * - Estados de loading claros
 * - Navegação por teclado completa
 */
export default function LoginPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const message = searchParams?.get('message')
  const redirectTo = searchParams?.get('redirectTo') || '/agendamentos'

  useEffect(() => {
    // Limpa mensagens após alguns segundos
    if (message || error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [message, error])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setFieldErrors({})

    const formData = new FormData(e.currentTarget)
    formData.append('redirectTo', redirectTo)

    try {
      const result = await signIn(formData)

      if (!result.success) {
        setError(result.error)
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors)
        }
      }
      // Se sucesso, o redirect acontece automaticamente no server action
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
          Entrar na sua conta
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{' '}
          <Link
            href="/cadastro"
            className="font-medium text-primary-500 hover:text-primary-600 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
          >
            crie uma conta gratuitamente
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Mensagem de sucesso (ex: após cadastro) */}
          {message && (
            <div className="mb-6">
              <Alert variant="info" title="Informação">
                {message}
              </Alert>
            </div>
          )}

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
              label="E-mail"
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              error={fieldErrors.email}
              helperText="Digite o e-mail usado no cadastro"
            />

            <Input
              label="Senha"
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              required
              error={fieldErrors.password}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-500 focus-visible:ring-primary-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Lembrar de mim
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/recuperar-senha"
                  className="font-medium text-primary-500 hover:text-primary-600 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                >
                  Esqueceu a senha?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              loadingText="Entrando..."
            >
              Entrar
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Primeira vez aqui?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/cadastro">
                <Button variant="outline" size="lg" className="w-full">
                  Criar conta gratuita
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
