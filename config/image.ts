import type { NuxtConfig } from 'nuxt/schema'

export default {
  providers: {
    upload: {
      provider: '~/providers/upload.ts',
    },
  },
} satisfies NuxtConfig['image']
