const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ["./dist/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['PoppinsVN', 'serif'],
    },
    colors: {
      primary: colors.sky,
      ...colors
    },
    extend: {},
  },
  plugins: [
    plugin(function({ addBase, addVariant, theme }) {
      addVariant('mactive', '&[active]');
      addVariant('group-mactive', ':merge(.group)[active] &');
    })
  ],
}
