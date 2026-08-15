/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js',

  ],




  theme: {
    extend: {
      fontFamily: {
        copperplate: ["Copperplate", "sans-serif"]
      },


    },

  },
  plugins:
    [
      require('tw-elements/dist/plugin')

    ],
}
