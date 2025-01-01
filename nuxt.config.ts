export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-01-01',
  modules: ['@nuxtjs/supabase'],
  devtools: { enabled: false },
  supabase: {
    redirect: false,
  },
  css: ['./app/app.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
