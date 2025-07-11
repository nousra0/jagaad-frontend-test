/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './App.vue'],
  theme: {
    extend: {
      colors: {
        primary: '#072ef5',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#072ef5',
        },
        dark: {
          primary: '#072ef5',
        },
      },
    ],
  },
};
