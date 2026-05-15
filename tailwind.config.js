/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1e3a5f',
        gold: '#c9a227',
        slate: '#64748b',
        cream: '#f8f6f0',
      },
    },
  },
  plugins: [],
}
