/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        taikofont: 'Taikofont'
    }},
    container: {
      center: true,
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
