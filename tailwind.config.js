/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14211c',
        moss: { DEFAULT: '#1f3d33', dark: '#152a23' },
        brass: { DEFAULT: '#a07a28', light: '#c9a14a' },
        bone: '#f5f4ef',
        line: '#dedbd0',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
