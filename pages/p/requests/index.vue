<template>
  <div>
    <div class="container tds-page-content">
      <header class="tds-titles" align="center">
        <strong>Property</strong>Request
        <hr>
      </header>
      <div>
        <singleRequest/>
      </div>
    </div>
  </div>
</template>

<script>
import singleRequest from '~/components/singleRequest'

export default {
  components: {
    singleRequest
  },
  name: 'SeePropertyRequest',
  data() {
    return {
      title: 'Property Requests - 2Dots Properties'
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'Property Requests',
          name: 'Property Requests',
          content: 'Property Requests'
        }
      ]
    }
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
