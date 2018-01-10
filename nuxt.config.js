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
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'https://vuejs.org/images/icons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: 'https://vuejs.org/images/icons/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'https://vuejs.org/images/icons/favicon-16x16.png' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.3/css/all.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://unpkg.com/vuetify@next/dist/vuetify.min.css' }
    ]
  },
  // customize loading
  loading: {
    color: '#4CAF50'
  },
  // specify build directory
  buildDir: 'server/nuxt',
  // specify nuxt source directory
  srcDir: 'client',
  // configure build
  build: {
    babel: {
      plugins: ['transform-decorators-legacy', 'transform-class-properties']
    },
    vendor: ['vuetify']
  },
  // specify additional nuxt plugins
  plugins: ['~/plugins/vuetify'],
  // specify additional nuxt modules
  modules: ['@nuxtjs/axios']
};
