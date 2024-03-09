import type { NuxtConfig } from 'nuxt/schema'

export default {
  '/api/**': {
    proxy: `${process.env.API_BASE_URL}/api/**`,
  },
} satisfies NuxtConfig['routeRules']
