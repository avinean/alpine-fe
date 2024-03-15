import modules from './config/modules'
import runtimeConfig from './config/runtimeConfig'
import pinia from './config/pinia'
import routeRules from './config/routeRules'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },
  modules,
  runtimeConfig,
  devtools: { enabled: true },
  pinia,
  routeRules,
})
