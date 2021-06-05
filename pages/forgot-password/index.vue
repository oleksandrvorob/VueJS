<template>
  <div>
    <Forgot/>
  </div>
</template>
<style>

</style>

<script>
import Forgot from "~/components/forgotpassword"
export default {
 components:{
   Forgot
 },
 methods:{
   updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', {
        marginTop: m,
        paddingTop: p
      })
    }
 },
  created() {
    this.updateTopSpaces(0, 0)
  },
  mounted(){
    // console.log(this.storage.token)
  },
  head() {
    return {
      title:'Forgot Password - 2Dots Properties',
      meta: [
        {
          hid: 'Forgot Password Page',
          name: 'Forgot Password Page',
          content: 'Forgot Password'
        }
      ]
    }
  },
}
</script>
