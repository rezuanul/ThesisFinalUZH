const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cerebri Sans', 'Montse', ...defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      padding: {
        '2px': '2px',
      },
      fontSize: {
        xs: ['12px', '20px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['22px', '28px'],
        xl: ['24px', '32px'],
        '2xl': ['28px', '36px'],
      },
      minWidth: {
        '85': '85px',
      },
      maxWidth: {
        '150': '300px',
        '120': '240px',
      },
      screens: {
        'xs': {'max' : '450px'},
        ...defaultTheme.screens,
      },
      colors: {
        indigo: {
          '900': '#191e38',
          '800': '#2f365f',
          '600': '#5661b3',
          '500': '#6574cd',
          '400': '#7886d7',
          '300': '#b2b7ff',
          '100': '#e6e8ff',
        },
        'primary' : "var(--primary-color)",
        'secondary' : "var(--secondary-color)",
        'menu-font-color' : "var(--menu-font-color)",
        'menu-font-hover-color' : "var(--menu-font-hover-color)",
        'body-color' : "var(--body-color)",
        'button-font-color' : "var(--button-font-color)",
        'button-color' : "var(--button-color)",
        'button-hover-color' : "var(--button-hover-color)",
      },
      boxShadow: theme => ({
        outline: '0 0 0 2px ' + theme('colors.indigo.500'),
      }),
      fill: theme => theme('colors'),
    },
  },
  variants: {
    fill: ['responsive', 'hover', 'focus', 'group-hover'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    zIndex: ['responsive', 'focus'],
  },
  plugins: [],
}
