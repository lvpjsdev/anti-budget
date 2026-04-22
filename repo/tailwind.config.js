/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tg-bg': 'var(--tg-bg)',
        'tg-text': 'var(--tg-text)',
        'tg-button': 'var(--tg-button)',
        'tg-button-text': 'var(--tg-button-text)',
        'tg-secondary': 'var(--tg-secondary)',
        'tg-hint': 'var(--tg-hint)',
        'tg-link': 'var(--tg-link)',
        'tg-delimiter': 'var(--tg-delimiter)',
      },
    },
  },
  plugins: [],
}

