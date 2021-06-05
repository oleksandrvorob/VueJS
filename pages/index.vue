<template>
  <section class="section index">
    <div>
      <Banner/>
      <brand/>
    </div>
    <div class="container tds-is-padded">
      <div class="is-mobile">
        <TheCards/>
      </div>
      <div class="tds-is-padded container"></div>
      <TheFooterAds/>
    </div>
  </section>
</template>

<style scoped>
/* .tds-banner{
    height: 500px;
    background: blueviolet;
  } */

.section,
.column {
  margin: 0 !important;
  padding: 0 !important;
}

.tds-is-padded {
  padding: 3rem 1.5rem;
}
.tds-is-padded:nth-of-type(2) {
  padding: 3rem 0rem;
}
</style>



<script>
import Banner from '~/components/Banner'
import TheCards from '~/layouts/TheCards'
import brand from '~/components/brands'
import TheFooterAds from '~/layouts/TheFooterAds.vue'
export default {
  name: 'HomePage',

  components: {
    Banner,
    TheCards,
    brand,
    TheFooterAds
  },
  data() {
    return {
      title: 'Find apartments for rent and  houses for sale in Nigeria - 2Dots Properties'
    }
  },
  created() {
    this.updateTopSpaces(-12, 0)
    this.hideSearchBar(false)
    this.updateHasSticky(true)
  },
  beforeDestroy() {
    this.hideSearchBar(true)
    this.updateTopSpaces(136, 50)
    this.updateHasSticky(false)
  },
  computed: {},
  methods: {
    hideSearchBar(payload) {
      this.$store.commit('common/updateIsIndex', payload)
    },
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', { marginTop: m, paddingTop: p })
    },
    updateHasSticky(payload) {
      this.$store.commit('common/updateSticky', payload)
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'HomePage', name: 'HomePage', content:  '2DotsProperties.com was founded to take advantage of existing gaps in dynamic property markets. Our first platform is focused on the Nigerian real estate market. We help property seekers evaluate the options in the residential and commercial property markets. ' },
        { hid: 'og-title', property: 'og:title', content:  this.title},
        { hid: 'site_name', property: 'og:site_name', content: '2DotsProperties.com was founded to take advantage of existing gaps in dynamic property markets. Our first platform is focused on the Nigerian real estate market. We help property seekers evaluate the options in the residential and commercial property markets. ' },
        { hid: 'url', property: 'og:url', content: 'https://2dotsproperties.com' },
        { hid: 'image', property: 'og:image', content: 'https://2dots.ams3.digitaloceanspaces.com/FB-Cover.jpg' },
        { hid: 'description', property: 'og:description', content: '2DotsProperties.com is a Nigerian real estate and property listing platform with lands, apartments, and houses for rent/sale. Take advantage of our easy to use platform to list your properties.' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '2Dots Properties' },
        { name: 'twitter:title', content: '2DotsProperties.com was founded to take advantage of existing gaps in dynamic property markets. Our first platform is focused on the Nigerian real estate market. We help property seekers evaluate the options in the residential and commercial property markets. ' },
        { name: 'twitter:description', content: '2DotsProperties.com was founded to take advantage of existing gaps in dynamic property markets. Our first platform is focused on the Nigerian real estate market. We help property seekers evaluate the options in the residential and commercial property markets. ' },
        { name: 'twitter:image', content: 'https://2dots.ams3.digitaloceanspaces.com/FB-Cover.jpg' },
        { name: 'twitter:image:alt', content: 'https://2dots.ams3.digitaloceanspaces.com/FB-Cover.jpg' },
        { name: 'keywords', content: 'properties for sale in lagos nigeria, houses for sale in nigeria, apartment for sale in lagos, land for sale in lagos, private property nigeria, Nigeria Property Centre, Lagos property for rent, cheap property for sale, house for sale in lagos, property24 nigeria, houses for sale in lagos mainland, tolet nigeria, luxury homes for sale in lagos nigeria, land for sale, property pro, bungalows for sale in lagos, apartments for sale, real estate for sale, houses for sale in lekki lagos, 2dots properties'}
      
      ]
    }
  }
}
</script>
