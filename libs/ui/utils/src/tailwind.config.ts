import { join } from 'path'
import { createGlobPatternsForDependencies } from '@nx/react/tailwind'
import TailwindAnimate from 'tailwindcss-animate'

import type { Config } from 'tailwindcss'

export function buildConfig(appDir: string): Config {
  return {
    content: [
      join(appDir, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
      ...createGlobPatternsForDependencies(appDir),
    ],
    theme: {
      extend: {
        colors: {
          border: 'hsl(var(--border))',
          input: 'hsl(var(--input))',
          ring: 'hsl(var(--ring))',
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))',
          },
          secondary: {
            DEFAULT: 'hsl(var(--secondary))',
            foreground: 'hsl(var(--secondary-foreground))',
          },
          destructive: {
            DEFAULT: 'hsl(var(--destructive))',
            foreground: 'hsl(var(--destructive-foreground))',
          },
          muted: {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))',
          },
          accent: {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))',
          },
          popover: {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))',
          },
          card: {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))',
          },
        },
        backgroundColor: {
          'gray-50': '#f1f6f6',
          'gray-100': '#e5e7eb',
          'gray-200': '#d1d5db',
          'gray-400': '#a1a1a1',
          'purple-700': '#6b206b',
        },
        textColor: {
          'gray-50': '#f1f6f6',
          'gray-100': '#e5e7eb',
          'gray-200': '#d1d5db',
          'gray-400': '#a1a1a1',
          'purple-700': '#6b206b',
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
        keyframes: {
          'accordion-down': {
            from: { height: '0' },
            to: { height: 'var(--radix-accordion-content-height)' },
          },
          'accordion-up': {
            from: { height: 'var(--radix-accordion-content-height)' },
            to: { height: '0' },
          },
        },
        animation: {
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
        },
      },
    },
    plugins: [TailwindAnimate],
  }
}
