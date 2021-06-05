<template>
  <div class=" tds-advertise-cards">
    <header class="tds-titles">Advertise with us
      <hr> 
    </header>
    <div class="column is-full tds-column-grey">
        Advertise your residential and commercial properties (including undeveloped lands) 
        in this section. Check out our different subscription plans for every segment. 
        Whatever plan you choose, we are always ready to help you 
        maximize the return on investment (ROI)
        on your subscription plan  
    </div>
    <div class="tds-advertise-cards-show">
      <div
        class="tds-cards"
        v-for="(advertise , index) in advertise"
        :key="index"
        :class="{ tdssubActive : (index == subActive) }"
      >
        <h1 class="tds-card-header">
          {{advertise.plan.toUpperCase()}}
          <br>
          {{advertise.value}}
        </h1>
        <p class="tds-card-footer">
          <sup>N</sup>
          {{advertise.price}}
        </p>
        <p style="font-size:12px;">Per Month</p>
      </div>
      {{sub}}
    </div>

    <div class="column is-full tds-column-grey-empty"></div>
    <AdvertisePayment/>
  </div>
</template>

<script>
import AdvertisePayment from '~/components/AdvertisePayment.vue'
export default {
  data() {
    return {
      advertise: [],
      subActive: null
    }
  },
  components: {
    AdvertisePayment
  },
  methods: {
    plan(){
      let plan = this.$route.query.plan
      this.advertise.forEach((e, index) =>{
        if(e.plan === plan ){
          this.subActive = index
          let payload = index
          this.$store.commit('propertyads/selectedPlan', payload)
          
        }
    })
    }
  },
  mounted(){
    this.plan()
  },
  computed:{
    sub(){
      this.subActive = this.$store.state.propertyads.currentPlan
    }
  },
  created(){
    this.advertise = this.$store.state.propertyads.advertise
  }
}
</script>

<style>
@import '~/static/mobile.css';

</style>
