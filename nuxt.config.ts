// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://47.101.207.196:6060/api',
        changeOrigin: true,
      }
    }
  }
})
