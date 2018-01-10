module.exports = {
  // specify header defaults
  head: {
    title: 'Simple Todos',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A simple todos project. Built with 💚 using Nuxt & Nest.' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  // customize loading
  loading: {
    color: '#3B8070'
  },
  // specify build directory
  buildDir: 'server/nuxt',
  // specify nuxt source directory
  srcDir: 'client',
  // specify additional nuxt modules
  modules: ['~/modules/typescript.ts']
};
