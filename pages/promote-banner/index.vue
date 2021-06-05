<template>
  <div>
    <div class="container tds-page-content">
      <BannerAdComponent/>
    </div>
  </div>
</template>

<script>
import BannerAdComponent from '~/components/advertisecomponents/BannerAdComponent'
export default {
  data(){
    return {
      title:'Banner Adverts - 2Dots Properties'
    }
  },
  components: {
    BannerAdComponent
  },
  middleware: 'auth',
  methods: {
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', {
        marginTop: m,
        paddingTop: p
      })
    }
  },
  created() {
    this.updateTopSpaces(100, 50)
  },
  beforeDestroy() {
    this.updateTopSpaces(136, 50)
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'Banner Adverts',
          name: 'Banner Advert Page',
          content: ' Banner Adverts are usually displayed in vantage points on our platform. That way site users get to see your Ads, and can even click on such Ads to take them directly to your corporate webpage. You can directly measure the impact of your Ads, using the number of unique user clicks that translate into more sales and awareness for your brand. '
        }
      ]
    }
  },
}
</script>

<style>
</style>
