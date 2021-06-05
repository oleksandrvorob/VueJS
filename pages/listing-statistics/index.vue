<template>
<div>
    <div class="container tds-page-content">
    <header class="tds-titles" align="center">
      <strong>Listing</strong> Statistics
      <hr>
    </header>
    <div class="column is-full tds-column-grey">
      Published Listings: 0 Unpublished Listings: 0
      Total Listings: 0 Regular Featured Listings: 0
    Premium Featured Listings: 0 Total Featured Listings: 0
    </div>
  </div>

</div>

</template>

<script>
export default {
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

}
</script>

<style>
</style>
