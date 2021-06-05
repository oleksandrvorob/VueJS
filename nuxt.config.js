const pkg = require('./package')

if (process.env.API_URL == undefined) {
  process.env.API_URL = 'https://backendapi.2dotsproperties.com'
}

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { hid: 'charset', charset: 'utf-8' },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'msapplication-TileColor', name:'msapplication-TileColor', content:'#1c1c1c' },
      { hid: 'theme-color', name:'theme-color', content:'#1c1c1c' },
      { hid: 'HomePage', name: 'HomePage', content: '2DotsProperties.com was founded to take advantage of existing gaps in dynamic property markets. Our first platform is focused on the Nigerian real estate market. We help property seekers evaluate the options in the residential and commercial property markets. ' },
      { hid: 'og:title', property: 'og:title', content: '2Dots Properties' },
      { hid: 'og:site_name', property: 'og:site_name', content: '2Dots Properties' },
      { hid: 'og:url', property: 'og:url', content: 'https://2dotsproperties.com' },
      { hid: 'og:image', property: 'og:image', content: 'https://2dots.ams3.digitaloceanspaces.com/FB-Cover.jpg' },
      { hid: 'og:description', property: 'og:description', content: '2DotsProperties.com was founded to take advantage of existing gaps in dynamic property markets. Our first platform is focused on the Nigerian real estate market. We help property seekers evaluate the options in the residential and commercial property markets. ' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: '2Dots Properties' },
      { hid: 'twitter:title', name: 'twitter:title', content: '2Dots Properties' },
      { hid: 'twitter:description', name: 'twitter:description', content: '2DotsProperties.com was founded to take advantage of existing gaps in dynamic property markets. Our first platform is focused on the Nigerian real estate market. We help property seekers evaluate the options in the residential and commercial property markets. ' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://2dots.ams3.digitaloceanspaces.com/FB-Cover.jpg' },
      { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'https://2dots.ams3.digitaloceanspaces.com/FB-Cover.jpg' },
      { hid: 'keywords', name: 'keywords', content: 'properties for sale in lagos nigeria, houses for sale in nigeria, apartment for sale in lagos, land for sale in lagos, private property nigeria, Nigeria Property Centre, Lagos property for rent, cheap property for sale, house for sale in lagos, property24 nigeria, houses for sale in lagos mainland, tolet nigeria, luxury homes for sale in lagos nigeria, land for sale, property pro, bungalows for sale in lagos, apartments for sale, real estate for sale, houses for sale in lekki lagos, 2dots properties'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon-16x16.png', sizes: '16x16' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#1c1c1c'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/static/style.css',
    '@/static/mobile.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-infinite-slide-bar', '~/plugins/lingallery', '~/plugins/axios',
    {src: '~/plugins/vue-reactive-localstorage.js', ssr: false},
    { src: '~/plugins/currency', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '@nuxtjs/pwa',
    'nuxt-user-agent',
    '@nuxtjs/google-analytics',
    '@nuxtjs/google-tag-manager',
    '@nuxtjs/robots'
  ],
  /*
  ** Axios module uration
  */
  'google-analytics': {
    id: 'UA-143539313-1'
  },
  'google-tag-manager': {
    id: 'GTM-P9KCXV9'
  },
  env: {
    // This is required for API-based assets to render properly
    API_URL: process.env.API_URL,
  },
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.API_URL,
      redirectError: {
        401: '/login',
        404: '/notfound'
      }

  },
  robots: {
    /* module options */
    UserAgent: '*',
    Sitemap: 'https://2dots.s3.amazonaws.com/sitemap.xml.gz',
    Disallow: '/agents'
  },
  workbox: {
    runtimeCaching: [{
        urlPattern: `${process.env.API_URL}/.*`,
        handler: 'networkFirst',
        method: 'GET',
        strategyOptions: {
          networkTimeoutSeconds: 20,
          cacheName: '2dots-cache',
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  },
  /*
  ** Build uration
  */
  build: {
    /*
    ** You can extend webpack  here
    */
   splitChunks: {
    layouts: true
   },
    extend(ctx) {

    }
  }
}
