/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        panel: 'var(--color-panel)',
        border: 'var(--color-border)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'severity-low': 'var(--color-severity-low)',
        'severity-medium': 'var(--color-severity-medium)',
        'severity-high': 'var(--color-severity-high)',
        'severity-critical': 'var(--color-severity-critical)',
        'status-active': 'var(--color-status-active)',
        'status-complete': 'var(--color-status-complete)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(5px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Menlo', 'monospace']
      }
    },
  },
  plugins: [],
}
