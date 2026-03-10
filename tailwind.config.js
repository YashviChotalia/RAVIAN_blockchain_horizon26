/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0F',
        panel: '#15151A',
        primary: '#3B82F6',
        success: '#10B981',
        danger: '#EF4444',
        border: '#2E2E3A',
        textMain: '#F8FAFC',
        textMuted: '#94A3B8'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
