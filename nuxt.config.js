export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SEP6',
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/styles/_style-global.scss'],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-dragscroll.js', ssr: false },
    { src: '@/plugins/cookies.js', ssr: false },
    { src: '~/plugins/userCookie.client.js', ssr: false },
    { src: '~/plugins/vue-lazysizes.client.js', ssr: false }
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
    '@nuxtjs/firebase',
  ],
  firebase:
  {
    config: {
      apiKey: 'AIzaSyBIxr4MHO8Y1LG5J7i8LA0qZTZ7s74nXdk',
      authDomain: 'sep6-project-96a6e.firebaseapp.com',
      projectId: 'sep6-project-96a6e',
      storageBucket: 'sep6-project-96a6e.appspot.com',
      messagingSenderId: '79369270062',
      appId: '1:79369270062:web:66bc0798124b06a44a00bf',
      measurementId: 'G-R2XRMWP7YF'
    },
    services: {
      auth: true,
      firestore: true,
      functions: true,
      storage: true,
      database: true,
      messaging: true,
      performance: true,
      analytics: true,
      remoteConfig: true
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: { sourceMap: false },
    },
  },
  extend (config, { isDev, isClient, loaders: { vue } }) {
    if (isClient) {
      vue.transformAssetUrls.img = ['data-src', 'src']
      vue.transformAssetUrls.source = ['data-srcset', 'srcset']
    }
  }
}
