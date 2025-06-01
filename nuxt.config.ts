// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  ui: {
    colorMode: false,
  },
  modules: ["@nuxt/ui", "@nuxtjs/supabase"],
  css: ["~/assets/css/main.css"],
  supabase: {
    redirectOptions: {
      login: "/",
      callback: "/callback",
      exclude: ["/", "/login", "/register", "/forgot-password"],
    },
  },
});
