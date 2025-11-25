import { createBrowserClient } from '@supabase/ssr'

/**
 * Cliente Supabase para uso no navegador (Client Components)
 *
 * Este cliente é usado em Client Components e tem acesso ao
 * contexto do navegador (cookies, localStorage, etc.)
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
