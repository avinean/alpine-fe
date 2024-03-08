import type { NuxtConfig } from 'nuxt/schema'

export default {
  pageTransition: { name: 'fade', mode: 'out-in' },
} satisfies NuxtConfig['app']
