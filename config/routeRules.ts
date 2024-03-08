import type { NuxtConfig } from 'nuxt/schema'

export default {
  '/api/**': {
    proxy: 'http://localhost:5050/api/**',
  },
} satisfies NuxtConfig['routeRules']
