import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utilitário para combinar classes CSS com Tailwind
 * Mescla classes do Tailwind de forma inteligente, evitando conflitos
 *
 * @param inputs - Classes a serem combinadas
 * @returns String de classes CSS combinadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
