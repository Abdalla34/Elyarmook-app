// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "https://localhost:3000",
    },
  },

  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "@fortawesome/fontawesome-free/css/all.min.css",
    "@/assets/style.css",
  ],
  modules: ["@vee-validate/nuxt", "dayjs-nuxt", "@nuxtjs/i18n"],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'ar', iso: 'ar-EG', file: 'ar.json' },
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'no_prefix',
  },
});
