import modules from './config/modules'
import runtimeConfig from './config/runtimeConfig'
import pinia from './config/pinia'
import routeRules from './config/routeRules'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode',
  },
  modules,
  runtimeConfig,
  devtools: { enabled: true },
  pinia,
  routeRules,
})
