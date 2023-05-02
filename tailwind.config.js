/** @type {import('tailwindcss').Config} */

const Color = require('color')
const lighten = (clr, val) => Color(clr).lighten(val).rgb().string()
const darken = (clr, val) => Color(clr).darken(val).rgb().string()

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          light: '#6ea8fe',
          DEFAULT: '#0d6efd',
          dark: darken('#0d6efd', 0.5)
        },
        red: {
          DEFAULT: '#94010f',
          logo: '#DC3545',
          dark: '#70151e',
          hover: darken('#94010f', 0.2)
        },
        gray: {
          DEFAULT: colors.gray,
          light: 'rgba(0, 0, 0, 0.2)'
        },
        black: {
          DEFAULT: colors.black,
          hover: lighten('black', 1)
        },
        success: {
          DEFAULT: '#198754',
          dark: darken('#198754', 0.5),
          hover: darken('#198754', 0.2)
        },
        info: {
          DEFAULT: '#17a2b8',
          dark: darken('#17a2b8', 0.5),
          hover: darken('#17a2b8', 0.2)
        },
        warning: {
          DEFAULT: '#ffc107',
          dark: darken('#ffc107', 0.5),
          hover: darken('#ffc107', 0.2)
        },
        cyan: '#0dcaf0'
      },
      gridTemplateColumns: {
        table: '1fr 2fr',
        responsive: 'repeat(auto-fit, minmax(200px, 1fr))',
        cards: 'repeat(auto-fit, minmax(500px, 1fr))'
      },
      boxShadow: {
        card: '0px 1px 10px 0px rgba(0,0,0,0.2)',
        'card-bold': '0px 1px 10px 0px rgba(0,0,0,0.4)',
        'input-focus': '0px 0px 4px 0px rgba(0,0,0,0.5)'
      }
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px'
    }
  },
  plugins: []
}
