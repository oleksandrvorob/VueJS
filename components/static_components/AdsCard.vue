<template>
  <div class="tds-advert">
    <div v-if="!loaded">
      <p><remodify :word="'Advertise'"/>/market your property on www.2dotsproperties.com</p>
      <nuxt-link to="/promote-banner" class="button"> Place &nbsp; <remodify :word="'Advert'" /></nuxt-link>
    </div>

    <img v-if="loaded" :src="baseUrl+desktop" @click="visit()" class="promo-link">
    <!-- <vue-load-image v-if="loaded">
        <img slot="image" :src="baseUrl+small.desktop" class="promo-link" @click="visit()"/>
        <img slot="preloader" src="~/static/img/ads.jpg"/>
    </vue-load-image> -->
  </div>
</template>

<script>
import remodify from "~/components/remodify"
import VueLoadImage from 'vue-load-image'

export default {
  components:{
    remodify,
    'vue-load-image': VueLoadImage
  },
  data(){
    return {
      baseUrl: process.env.API_URL,
      counter:0,
      Interval:null,
      desktop: null,
      url: null
    }
  },

  computed: {
    loaded() {
      return this.$store.state.promo.loaded
    },
    small(){
      return this.$store.state.promo.small
    }
  },
  methods: {
    visit(){
      window.open(this.url, '_blank');
    },
    TimerFunction(){
      this.counter = this.counter + 1
      if(this.counter >= this.small.length){
          this.counter = 0
      }

      this.desktop = this.small[this.counter].desktop
      this.url = this.small[this.counter].url
    },
    getBanner(){
      this.$store.dispatch('promo/getBanners', "SMALL")
      console.log("I ran sidebar")
    }
  },
  created(){
    this.getBanner()
  },
  mounted(){
    this.Interval= setInterval(this.TimerFunction, 5000);
  },
  destroyed(){
    clearInterval(this.Interval)
  },
}
</script>

<style>
.promo-link{
  cursor: pointer;
}
.tds-advert {
  width: 411px;
  height: 279px;
  margin-top: 20px;
  margin-left:20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3e3e3e;
  text-align: center;
}
.tds-advert p {
  color: white;
  font-size: 20px;
}
.tds-advert .button {
  width: 227px;
  margin-top: 25px;
  background: #0cb8e0;
  border: none;
  font-size: 20px;
  color: white;
  font-weight: 700;
  border-radius: 20px;
  height: 49px;
}
@media screen and (max-width: 800px){
  .tds-advert{
    width: auto;
    height: 279px;
    display: flex;
    padding: 20px;
    margin: 10px 10px;
  }

}
</style>
