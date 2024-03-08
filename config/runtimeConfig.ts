import type { NuxtConfig } from 'nuxt/schema'

export default {
  public: {
    baseUrl: process.env.API_BASE_URL || '/',
  },
} satisfies NuxtConfig['runtimeConfig']
