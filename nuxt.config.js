export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  generate: {
    dir: 'common'
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  env: {
    baseUrl: process.env.NODE_ENV == 'production' ? '' : '',
    apiUrl: 'http://127.0.0.1:8090/mock',
    NUXT_ENV_API: '',
    version: process.env.npm_package_version || '2.1.0'
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', 'assets/main.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '@/plugins/element-ui',
    { src: '~plugins/particles', ssr: false },    
    { src: '~plugins/vuex-cache', ssr: false },    
    '~plugins/notify',
    '~plugins/axios',
    '~plugins/i18n',
    '~plugins/downloadfile',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  // axios: {
  //   proxy: true,
  //   credentials: true,
  //   prefix: '/api',
  // },
  // proxy: {
  //   '/api/': {
  //     target: process.env.NODE_ENV == 'production' ? '' : 'http://127.0.0.1:8090',
  //     // target: process.env.NUXT_ENV_API,
  //     changeOrigin: true,
  //     pathRewrite: { '^/api/': '' },
  //   },
  //   '/mock/': {
  //     target: process.env.NODE_ENV == 'production' ? '' : 'http://127.0.0.1:8090',
  //     // target: process.env.NUXT_ENV_API,
  //     changeOrigin: true,
  //     pathRewrite: { '^/mock/': '' },
  //   }
  // },
  router: {
    base: '/common',
    middleware: 'breadcrumb',
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [/^element-ui/],
  },
  config: {
    nuxt: {
      host: "0.0.0.0",
      port: "80"
    }
  },
}
