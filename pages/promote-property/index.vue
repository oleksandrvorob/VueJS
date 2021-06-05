<template>
  <div class="container tds-page-content tds-upgrade">
    <header class="tds-titles" align="center">
      <strong>Subscription</strong> Plans
      <hr>
    </header>
    <div
      class="column is-full tds-column-grey"
    >Advertise your residential and commercial properties (including undeveloped lands) 
    in this section. Check out our different subscription plans for every segment. 
    Whatever plan you choose, we are always ready to help you maximize the 
    return on investment (ROI) on your subscription plan  </div>
    <div>
      <subcards/>
    </div>
  </div>
</template>

<script>
import subcards from '~/components/subscriptionCards'
export default {
 middleware: 'auth',
  components: {
    subcards
  },
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
      title: 'Property Adverts - 2Dots Properties',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'Property Adverts',
          name: 'Property Adverts',
          content: 'Advertise your residential and commercial properties (including undeveloped lands) in this section. Check out our different subscription plans for every segment. Whatever plan you choose, we are always ready to help you maximize the return on investment (ROI) on your subscription plan.'
        }
      ]
    }
  }
}
</script>

<style>

</style>
