/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
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
  plugins: [],
}
