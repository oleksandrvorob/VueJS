<template>
  <div>
    <Advertise/>
  </div>
</template>

<style scoped>
</style>

<script>
import Advertise from '~/components/Advertise.vue'
export default {
  components: {
    Advertise
  },
  data() {
    return {
      title: 'Advertise With Us - 2Dots Property'
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'AdvertisePage',
          name: 'AdvertisePage',
          content: 'Advertise With Us - 2Dots Property'
        }
      ]
    }
  },
  methods: {
    hideSearchBar(payload) {
      this.$store.commit('common/updateIsIndex', payload)
    },
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', { marginTop: m, paddingTop: p })
    }
  },
  created() {
    this.updateTopSpaces(64, 0)
    this.hideSearchBar(false)
  },
  beforeDestroy() {
    this.hideSearchBar(true)
    this.updateTopSpaces(136, 50)
  }
}
</script>


