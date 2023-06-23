// @ts-nocheck
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'slide-in': 'slide-in-update-message 3s linear'
      },
      colors: {
        primary: colors.blue,
        secondary: colors.slate,
        palette: {
          100: '#E63946',
          200: '#F1FAEE',
          300: '#A8DADC',
          400: '#457B9D',
          500: '#1D3557',
          600: '#030325',
        }
      },
    },
  },
  plugins: [require('daisyui')],
}
