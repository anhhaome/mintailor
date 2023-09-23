import { createConfig } from './src/config.js';

/** @type {import('tailwindcss').Config} */
export default createConfig({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Hanken Grotesk"', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'monospace']
    },
    colors: ['rose']
  },
  plugins: []
});
