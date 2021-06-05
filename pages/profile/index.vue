<template>
  <div>
    <div class="tds-page-content">
      <profile/>
    </div>
      
  </div>
</template>

<script>
import profile from '~/components/profilecomponent'
export default {
  components: {
    profile
  },
  data(){
    return {
      title:" Edit Profile 2Dots Properties"
    }
  },
  methods: {
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', { marginTop: m, paddingTop: p })
    } 
  },
  created() {
    this.updateTopSpaces(120, 0)
  },
  beforeDestroy() {
    this.updateTopSpaces(136, 50)
  },
  middleware:'auth',
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'Edit Profile',
          name: 'Edit Profile',
          content: 'Edit Profile'
        }
      ]
    }
  }
}
</script>

<style>
</style>
