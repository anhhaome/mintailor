const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  content: ["./dist/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['Nunito'],
    },
    extend: {},
  },
  plugins: [
    plugin(function({ addBase, addVariant, theme }) {
      addVariant('m-active', '&[active]');
    })
  ],
}
