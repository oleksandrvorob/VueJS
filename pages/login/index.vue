<template>
  <div>
    <login/>
  </div>
    

</template>
<style>
  /* .tds-contact-us {
    height: 100vh;
    padding-top: 60px;
} */
</style>

<script>
import login from "~/components/login"
export default {
 components:{
   login
 },
 methods:{
   hideSearchBar(payload){
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
    this.hideSearchBar(false);
    this.updateTopSpaces(0, 0)
  },
  beforeDestroy(){
    this.hideSearchBar(true);
    this.updateTopSpaces(136,50);
  },
  mounted(){
    // console.log(this.storage.token)
  },
  head() {
    return {
      title:'Login - 2Dots Properties',
      meta: [
        {
          hid: 'Login Page',
          name: 'Login Page',
          content: 'Login'
        }
      ]
    }
  },
}
</script>
