/* eslint-env node */
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx,vue,md}',
    './public/**/*.html',
    './index.html',
    './tools/**/*.html'
  ],
  theme: {
    extend: {}
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light', 'dark', 'cupcake']
  }
}
