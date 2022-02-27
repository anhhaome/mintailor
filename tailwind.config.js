const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ["./dist/**/*.{html,js}"],
  theme: {
    colors: {
      primary: colors.cyan,
      ...colors
    },
    fontFamily: {
      'sans': ['PoppinsVN', 'serif'],
    },
    extend: {},
    fontSize: {
      'xs': '.75rem',
      'sm': '.825rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem'
    },
  },
  plugins: [
    plugin(function({ addBase, addVariant, theme }) {
      addVariant('mactive', '&[active]');
      addVariant('group-mactive', ':merge(.group)[active] &');
    })
  ],
}
