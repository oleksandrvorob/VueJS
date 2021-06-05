<template>
  <div>
    <div class="container tds-page-content">
      <header class="tds-titles" align="center">
        <strong>New</strong> Post
        <hr>
      </header>
      <postForm/>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
import postForm from '~/components/postProperty'
export default {
  components: {
    postForm
  },
  name: 'PostResquestPage',
  methods: {
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', { marginTop: m, paddingTop: p })
    }
  },
  created() {
    this.updateTopSpaces(100, 50)
  },
  beforeDestroy() {
    this.updateTopSpaces(136, 50)
  },
  data() {
    return {
      title: 'Post Properties - 2Dots Properties'
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'Post Properties',
          name: 'Post Properties',
          content: 'Post New Property'
        }
      ]
    }
  },
  middleware: ['auth', 'verifyData', 'checkMaxPost']
}
</script>


