import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#d9f0d9',
          200: '#b3e1b3',
          300: '#8dd28d',
          400: '#67c367',
          500: '#2c5f2d',
          600: '#234c24',
          700: '#1a391b',
          800: '#122612',
          900: '#091309',
        },
        secondary: {
          50: '#fef5e7',
          100: '#fce8c3',
          200: '#f9d89f',
          300: '#f6c87b',
          400: '#f3b857',
          500: '#f39c12',
          600: '#c27d0e',
          700: '#915e0a',
          800: '#613e07',
          900: '#301f03',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
