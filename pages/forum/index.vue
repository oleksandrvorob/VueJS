<template>
  <div>
    <header align="center" class="tds-titles"><b>Forum</b> 
    <hr></header>
      <forum page="FORUM"/>
  </div>
</template>
<style scoped>
</style>
<script>
import forum from "~/components/forum"
export default {
  components:{
      forum
  },
  data() {
    return {
      title: 'Forum - 2Dots Properties'
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'NewsPage',
          name: 'NewsPage',
          content: 'News With Us - 2Dots Property'
        }
      ]
    }
  },
  methods: {
    hideSearchBar(payload) {
      this.$store.commit('common/updateIsIndex', payload)
    },
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', {
        marginTop: m,
        paddingTop: p
      })
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


