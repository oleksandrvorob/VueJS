<template>
  <div>
      <header align="center" class="tds-titles"><b>Forum </b>
    <hr></header>
      <Forum/>
  </div>
</template>
<style scoped>
</style>
<script>
import Forum from "~/components/forumId"
export default {
  name: 'replyforum',
  components:{
      Forum
  },
  data() {
    return {
      title: 'Forum-replies'
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: '',
          name: 'forum NewsPage',
          content: '2Dots Properties - Forum'
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


