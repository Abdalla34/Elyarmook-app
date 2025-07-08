// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "@fortawesome/fontawesome-free/css/all.min.css",
    "@/assets/style.css", // الخطوط مستوردة جوه الملف ده
  ],
  modules: ["@pinia/nuxt", "@vee-validate/nuxt"],
  runtimeConfig: {
    public: {
     apiBase: 'https://alyarmook.demo.asol-tec.com/api', // هنا بتحط الرابط الأساسي (Base URL)
    },
  },
});
