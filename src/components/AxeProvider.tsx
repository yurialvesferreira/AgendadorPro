'use client'

import { useEffect } from 'react'
import { initAxe } from '@/utils/axe-setup'

/**
 * Provider para inicializar axe-core em desenvolvimento
 * Detecta violações de acessibilidade em tempo real
 */
export function AxeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      initAxe()
    }
  }, [])

  return <>{children}</>
}
