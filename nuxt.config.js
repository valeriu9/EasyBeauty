export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'EasyBeauty',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  target: 'static',
  router: {
    base: '/EasyBeauty/'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/styles/_style-global.scss'],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/cookies.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],
  styleResources: {
    scss: ['~assets/styles/_style-resources.scss'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: { sourceMap: false },
    },
    extend (config, { isDev, isClient }) {

      config.node = {
        fs: 'empty'
      }

      // ....
    }
  },
  extend (config, { isDev, isClient, loaders: { vue } }) {
    if (isClient) {
      vue.transformAssetUrls.img = ['data-src', 'src']
      vue.transformAssetUrls.source = ['data-srcset', 'srcset']
    }
  }
}
