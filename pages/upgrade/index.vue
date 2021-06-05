<template>
  <div>
    <div class="container tds-page-content tds-upgrade">
      <header class="tds-titles" align="center">
        <strong>My</strong> Subscription
        <hr>
      </header>
      <!-- <div
        class="column is-full tds-column-grey"
      >Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</div> -->
      <div>
          <subcards/>
      </div>
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
      title: 'Upgrades - 2Dots Properties',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'Terms & Conditions',
          name: 'Terms & Conditions',
          content: 'Terms and Conditions of 2dots properties'
        }
      ]
    }
  },
}
</script>

<style>
@media screen and (max-width: 1288px){
  .tds-upgrade.container {
      width:100%;
      max-width: 100%;
      padding:20px;
  }
}
</style>
