// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  nitro: {
    devProxy: {
      '/sport/api': {
        target: 'http://47.101.207.196:6060/sport/api',
        changeOrigin: true,
      }
    },
    routeRules: {
      '/sport/api/**': { proxy: 'http://47.101.207.196:6060/sport/api/**' }
    }
  },

  modules: ['nuxt-echarts'],
  
  echarts: {
    charts: ['BarChart', 'LineChart'],
    components: ['GridComponent', 'TooltipComponent', 'LegendComponent']
  }
})