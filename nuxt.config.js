const path = require('path');

module.exports = {
  // specify header defaults
  head: {
    title: 'Simple Todos',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'
      },
      { hid: 'description', name: 'description', content: 'A simple todos project. Built with 💚 using Nuxt & Nest.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://unpkg.com/vuetify@next/dist/vuetify.min.css' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.4/css/all.css' }
    ]
  },
  // customize loading bar
  loading: {
    color: '#4CAF50'
  },
  // specify build directory
  buildDir: 'server/build',
  // specify nuxt source directory
  srcDir: 'client',
  // configure webpack build
  build: {
    babel: {
      plugins: ['transform-decorators-legacy', 'transform-class-properties']
    },
    // extend(config) {},
    vendor: [
      'axios',
      'nuxt-class-component',
      'vue-class-component',
      'vue-property-decorator',
      'vuex-class',
      'vee-validate',
      'vuetify'
    ]
  },
  // specify additional nuxt plugins
  plugins: [
    {
      src: '~/plugins/vue-notifications',
      ssr: false
    },
    '~/plugins/vee-validate',
    '~/plugins/vuetify'
  ],
  // specify additional nuxt modules
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { path: path.resolve('.') }],
    'nuxtjs-extensions/dist/modules/typescript'
  ],
  /**
   * Axios module config
   */
  axios: {
    // baseURL: `http://127.0.0.1:${PORT}/api`,
    /**
     * Adds an interceptor to automatically set `withCredentials` config of axios
     * when requesting to baseUrl which allows passing authentication headers to backend.
     */
    credentials: false,
    /**
     * Adds interceptors to log all responses and requests
     */
    debug: false,
    /**
     * This option is a map from specific error codes to page which they should be redirect.
     *
     * For example if you want redirecting all `401` errors to `/login`
     */
    redirectError: {
      // 401: '/login'
    },
    /**
     * Function for manipulating axios requests.
     *
     * Useful for setting custom headers, for example based on the store state.
     * The second argument is the nuxt context.
     */
    requestInterceptor: (config, { store }) => {
      // append access token to each request
      const accessToken = store.getters['auth/accessToken'];
      if (accessToken) {
        config.headers.common['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    /**
     * Function init(axios, ctx) to do additional things with axios.
     *
     * Example:
     *
     *    init (axios, ctx) {
     *      axios.defaults.xsrfHeaderName = 'X-CSRF-TOKEN'
     *    }
     */
    init: (axios, ctx) => {},
    /**
     * If you want to disable the default error handler for some reason,
     * you can do it so by setting the option `disableDefaultErrorHandler` to `true`.
     */
    disableDefaultErrorHandler: true
    /**
     * Function for custom global error handler.
     *
     * If you define a custom error handler, the default error handler provided by this package will be overridden.
     */
    // errorHandler: (errorReason, { error }) => {
    //   error('Request Error: ' + errorReason)
    // }
  }
};
