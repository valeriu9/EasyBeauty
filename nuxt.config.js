export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'EasyBeauty',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { httpEquiv:"Content-Security-Policy", content:"upgrade-insecure-requests" },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/styles/_style-global.scss'],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/cookies.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: { sourceMap: false },
    },
    extend (config) {
      config.node = {
        fs: 'empty'
      }
    }
  }
}
