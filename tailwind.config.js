/** @type {import('tailwindcss').Config} */
import twElementsPlugin from 'tw-elements/dist/plugin.cjs'
import typographyPlugin from '@tailwindcss/typography'

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        copperplate: ['Copperplate', 'sans-serif'],
      },
    },
  },
  plugins: [twElementsPlugin, typographyPlugin],
}
