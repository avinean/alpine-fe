import type { NuxtConfig } from 'nuxt/schema'

export default {
  public: {
    apiBaseUrl: process.env.API_BASE_URL || '/',
    imageBaseUrl: '/uploads',
  },
} satisfies NuxtConfig['runtimeConfig']
