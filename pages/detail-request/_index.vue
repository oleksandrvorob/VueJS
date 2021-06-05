<template>
  <div>
    <div class="container tds-page-content">
      <header align="center" class="tds-titles">
        <strong>Property</strong>Request
        <hr>
      </header>
      <div>
          <detailRequest/>
      </div>
    </div>
    
  </div>
</template>

<script>
import detailRequest from '~/components/detailRequest'
export default {
    components:{
        detailRequest
    },
  name: 'SeePropertyRequest',
  data() {
    return {
      title: 'See Property - 2Dots Property'
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'SeePropertyRequest',
          name: 'SeePropertyRequest',
          content: 'SeePropertyRequest'
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
