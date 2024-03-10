import modules from './config/modules'
import app from './config/app'
import runtimeConfig from './config/runtimeConfig'
import pinia from './config/pinia'
import routeRules from './config/routeRules'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },
  modules,
  app,
  runtimeConfig,
  devtools: { enabled: false },
  pinia,
  routeRules,
})
