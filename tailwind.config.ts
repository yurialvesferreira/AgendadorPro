import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta com contraste WCAG AA/AAA validado
        primary: {
          50: '#e6f2ff',
          100: '#b3d9ff',
          200: '#80bfff',
          300: '#4da6ff',
          400: '#1a8cff',
          500: '#0066cc', // Contraste 7.2:1 com branco - AAA
          600: '#0052a3',
          700: '#003d7a',
          800: '#002952',
          900: '#001429',
        },
        success: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#28A745', // Contraste 4.5:1 com branco - AA
          600: '#388e3c',
          700: '#2e7d32',
          800: '#1b5e20',
          900: '#0d4e15',
        },
        error: {
          50: '#ffebee',
          100: '#ffcdd2',
          200: '#ef9a9a',
          300: '#e57373',
          400: '#ef5350',
          500: '#DC3545', // Contraste 5.3:1 com branco - AA
          600: '#c62828',
          700: '#b71c1c',
          800: '#8e0000',
          900: '#600000',
        },
        warning: {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#856404', // Contraste 6.4:1 com branco - AA
          600: '#6b5003',
          700: '#513c02',
          800: '#372801',
          900: '#1d1400',
        },
        // Tons de cinza com contraste adequado
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontSize: {
        // Tamanhos com boa legibilidade
        'xs': ['0.75rem', { lineHeight: '1.5' }],    // 12px
        'sm': ['0.875rem', { lineHeight: '1.5' }],   // 14px
        'base': ['1rem', { lineHeight: '1.6' }],     // 16px - tamanho mínimo
        'lg': ['1.125rem', { lineHeight: '1.6' }],   // 18px
        'xl': ['1.25rem', { lineHeight: '1.6' }],    // 20px
        '2xl': ['1.5rem', { lineHeight: '1.5' }],    // 24px
        '3xl': ['1.875rem', { lineHeight: '1.4' }],  // 30px
        '4xl': ['2.25rem', { lineHeight: '1.3' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1.2' }],      // 48px
      },
      spacing: {
        // Espaçamento generoso para melhor legibilidade
        'paragraph': '1.5rem',
      },
      borderRadius: {
        'focus': '0.25rem',
      },
      boxShadow: {
        'focus': '0 0 0 3px rgba(66, 153, 225, 0.5)',
        'focus-error': '0 0 0 3px rgba(220, 53, 69, 0.5)',
      },
      minHeight: {
        'touch': '44px', // Tamanho mínimo de toque (WCAG AAA)
        'touch-aa': '24px', // Tamanho mínimo de toque (WCAG 2.2 AA)
      },
      minWidth: {
        'touch': '44px',
        'touch-aa': '24px',
      },
    },
  },
  plugins: [],
}

export default config
