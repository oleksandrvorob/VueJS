<template>
  <div>
    <Terms/>
  </div>
</template>

<style scoped>
</style>

<script>
import Terms from '~/components/termsAndConditions'
export default {
  name: 'Terms & Conditions',
  components: {
    Terms
  },
  data() {
    return {
      title: 'Terms and Conditions - 2Dots Properties'
    }
  },
  methods: {
    hideSearchBar(payload){
      this.$store.commit('common/updateIsIndex', payload)
    },
    updateTopSpaces(m,p){
      this.$store.commit('common/updateSpace', { marginTop: m, paddingTop: p });
    }
  },
  created() {
    this.updateTopSpaces(64,0);
    this.hideSearchBar(false);
  },
  beforeDestroy(){
    this.hideSearchBar(true);
    this.updateTopSpaces(136,50);
  },
  head() {
    return {
      title: this.title,
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
</style>



