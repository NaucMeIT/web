import TailwindAnimate from 'tailwindcss-animate'

export default {
  safelist: ['dark'],
  content: ['{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}', '../primitives/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ring: 'hsl(var(--ring))',
        border: 'var(--border)',
        input: 'var(--input)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
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
