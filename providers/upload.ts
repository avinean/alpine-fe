import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'

export const getImage: ProviderGetImage = src => ({
  url: joinURL(useRuntimeConfig().public.baseUrl, src),
})
