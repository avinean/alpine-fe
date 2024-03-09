import type { NuxtConfig } from 'nuxt/schema'

export default {
  providers: {
    upload: {
      provider: import.meta.env.NODE_ENV === 'development' ? '~/providers/upload.local.ts' : '~/providers/upload.ts',
    },
  },
} satisfies NuxtConfig['image']
