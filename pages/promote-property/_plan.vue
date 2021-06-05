<template>
  <div class="container tds-page-content">
    <property/>
  </div>
</template>

<script>
import property from '~/components/advertisecomponents/PropertyAdsComponent'
export default {
  components: {
    property
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
  }
}
</script>

<style>
</style>
