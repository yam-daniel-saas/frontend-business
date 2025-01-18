/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,tsx}', './app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      screens: {
        web: { raw: '(display-mode: browser)' },
      },
      colors: {
        primary: 'white',
      },
    },
  },
  plugins: [],
};
