// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  nitro: {
    storage: {
      db: {
        driver: 'fs',
        base: './.data/db',
      },
    },
  },

  compatibilityDate: '2024-09-18',
})