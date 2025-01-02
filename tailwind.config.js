import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.vue'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['emerald'],
  },
}
