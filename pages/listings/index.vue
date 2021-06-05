<template>
  <div class="container tds-page-content">
    <BoostProperty v-if="noscroll" :update="forceupdate"/>
    <header class="tds-titles" align="center">
      <strong> My </strong>Listings
      <hr>
    </header>
    <div class="listings">
        <div class="listing">
          <myListings :username="username" v-if="isMounted"/>
        </div>
    </div>
    
  </div>
</template>

<script>
import BoostProperty from '~/components/BoostProperty'
import myListings from '~/components/myListings'
export default {
  components:{
    myListings,
    BoostProperty
  },
  data(){
    return {
      isMounted: false,
      username: '',
      title: 'My Listings - 2Dots Properties'
    }
  },
   middleware: 'auth',
   methods: {
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', {
        marginTop: m,
        paddingTop: p
      })
    },
    getUsername(){
      let base64Url = this.storage.token.split('.')[1]
      this.username = JSON.parse(atob(base64Url)).username
      this.isMounted = true
    },
    forceupdate(){
      this.$forceUpdate();
    }
  },
  created() {
    this.updateTopSpaces(100, 50)
  },
  beforeDestroy() {
    this.updateTopSpaces(136, 50)
  },
  mounted(){
    this.getUsername()
  },
  computed:{
    noscroll(){
      console.log(this.$store.state.nav.noscroll)
      return this.$store.state.nav.noscroll
    }
  },
  destroyed() {
    this.$store.commit('nav/closelistingModal', false)
    this.$store.commit('nav/clearBoostModal', false)
  },
  watch:{
   '$route.params'(){
     
   }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'My Listings',
          name: 'My Listings',
          content: 'My Listings'
        }
      ]
    }
  },
}

</script>

<style>
.listings{
  margin-top: 25px; 
}


</style>
