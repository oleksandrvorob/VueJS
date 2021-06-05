<template>
  <div>
    <About/>
  </div>
</template>

<style scoped>
</style>

<script>
import About from '~/components/About'
export default {
  name: 'AboutPage',
  components: {
    About
  },
  data() {
    return {
      title: 'About - 2Dots Properties',
      seoStuff: {
        description: '',
        keywords: '',
      },
    }
  },
  methods: {
    hideSearchBar(payload){
      this.$store.commit('common/updateIsIndex', payload)
    },
    updateTopSpaces(m,p){
      this.$store.commit('common/updateSpace', { marginTop: m, paddingTop: p });
    },
    async fetchData() {
      this.seoStuff = (await this.$axios.get(`${process.env.API_URL}/some/test`)).data
      console.log(this.seoStuff)
    }
  },
  created() {
    this.fetchData();
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
          hid: 'AboutPage',
          name: 'AboutPage',
          content: '2DotsProperties.com was founded to take advantage of existing gaps in dynamic property markets. Our first platform is focused on the Nigerian real estate market. We help property seekers evaluate the options in the residential and commercial property markets.'
        },
        {
          hid: 'description',
          name: 'description',
          content: this.seoStuff.description,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.seoStuff.keywords,
        }
      ]
    }
  },

}
</script>
<style>
</style>



