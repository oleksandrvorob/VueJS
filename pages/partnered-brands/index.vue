<template>
  <div>
    <div class="container tds-page-content">
      <BrandsPartners/>
    </div>
  </div>
</template>

<script>
import BrandsPartners from '~/components/advertisecomponents/BrandsPartners'
export default {
  components: {
    BrandsPartners
  },
 middleware: 'auth',
  methods: {
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', {
        marginTop: m,
        paddingTop: p
      })
    }
  },
  created() {
    this.updateTopSpaces(100, 50)
  },
  beforeDestroy() {
    this.updateTopSpaces(136, 50)
  },
  head() {
    return {
      title:'Partnered Brands - 2Dots Properties',
      meta: [
        {
          hid: 'Partnered Brands',
          name: 'Partnered Brands',
          content: ' Partnered Brands are clients that opt to display their corporate logos or promos on our homepage. This ensures maximum visibility for such brands. Partnered brands Ads are clickable and direct traffic to the corporate websites of such brands. This ensures brands can measure the effectiveness of their advertising spend while promoting their business.  '
        }
      ]
    }
  },
}
</script>

<style>
</style>
