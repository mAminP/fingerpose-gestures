import { NuxtConfig } from '@nuxt/types'
export default <NuxtConfig>{

  head: {
    title: 'demo',
    link: [
    ],
    script: [

    ]
  },
  modules: [
    'vue-web-cam/nuxt'
  ],
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],
  vuetify: {
    theme: {
      dark: true
    }
  },
  components: [
    {
      path: './components',
      pathPrefix: false
    }
  ]
}