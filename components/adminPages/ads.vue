<template>
  <div class="addvue">
    <header align="center" class="tds-titles">
      <b>All Ads</b>
      <hr />
    </header>

   

    <div class="filter-tabs" style="grid-template-columns: 1fr 1fr;">
      <button type="submit" class="tds-primary-button" :class="{'activeButton' : activeComponent === 'BrandAds'}" @click="setActiveComponent('BRANDS')" style="width:100%;margin-left:0;margin-right:10px; background:#3E3E3E">PARTNERED BRANDS</button>
      <button type="submit" class="tds-primary-button" :class="{'activeButton' : activeComponent === 'BannerAds'}" @click="setActiveComponent('BANNER')" style="width:100%; background:#3E3E3E;">BANNER ADS</button>
    </div>
    <keep-alive>
      <component :is="activeComponent" >
      </component>
    </keep-alive>


    <div>
      
    </div>
  </div>
</template>

<script>
import BannerAds from './bannerads'
import BrandAds from './brandAds'
export default {
  components:{
    BannerAds,
    BrandAds
  },
  data(){
    return {
      activeComponent:'BannerAds',
      term:''
    }
  },
  methods:{
    setActiveComponent(x){
      x === 'BRANDS' ? this.activeComponent = 'BrandAds' : this.activeComponent = 'BannerAds'
    }
  }
}
</script>

<style>
/* .addvue .tds-primary-color{
  background: #3E3E3E !important;
} */
</style>
