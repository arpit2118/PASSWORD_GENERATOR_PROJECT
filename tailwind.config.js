/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      colors: {
        darkBlue: '#020024', // This is equivalent to rgb(2,0,36)
        blue: '#090979',     // Equivalent to rgb(9,9,121)
        lightBlue: '#00d4ff', // Equivalent to rgb(0,212,255)
      },
    },
  },
  plugins: [],
}

