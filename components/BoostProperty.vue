<template>
  <section class="boost-modal">
    <div class="boost-modal-container" v-if="getData">
      <div class="tds-title-tab">
        <h1>
          <b>Promote Listing</b>
        </h1>
        <button class="close-boost-modal" @click="closeModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="boost-inner">
        <div class="boost-heading">
          <div class="boost-flex">
            <aside>
              <div class="tds-payment-holder">
                Promote your property listing by making it a priority listing and boosting the Ad.
                Priority and boosted Ads have precedence and ranking over regular
                listings in search results. Only priority listings can be boosted. Boost your Ads
                to ensure potential clients and targeted users, easily spot such listings and
                increase the probability of successful transactions.
              </div>
              <div class="tds-title-tab">
                <h1>
                  <b>PRIORITY</b>
                </h1>
              </div>
              <div class="tds-payment-holder">
                <p class="priority-checkbox">

                  <!-- <b-checkbox type="is-black" v-model="priority" @change="sendPriority()"></b-checkbox> -->
                  <button class="tds-primary-button button" style="margin:0" :disabled="canPrioritize" @click="promote('PRIORITY')">Set as priority</button>
                </p>
              </div>
              <div class="tds-title-tab">
                <h1>
                  <b>BOOST</b>
                </h1>
              </div>
              <div class="tds-payment-holder">
                <p>Max. Number Of Boost Remaining For This Listing: {{4 - boost}}  <b>x</b></p>
                <div>
                  <p class="range-text">
                    Boosting This Listing: {{range}}
                    <b>x</b>
                  </p>
                  <input
                    class="slider is-fullwidth"
                    step="1"
                    :min="boost"
                    max="4"
                    value="0"
                    type="range"
                    v-model="range"
                  >
                  <div style="margin-top:10px;">
                    <button class="tds-primary-button button" style="margin:0" :disabled="canBoost" @click="promote('BOOST')">Boost</button>
                  </div>
                </div>
              </div>

            </aside>
            <aside class="aside-modal2">
              <div>
                <p> <b> Post Preview </b></p>
              <div class="tds-card-listing card">
                <span class="bta" v-if="boost > 0">BOOSTED AD</span>
                <span class="bta bta-priority" v-if="priority == 1">PRIORITY LISTING</span>
                <div class="tds-card-listing-image">
                  <img :src="baseUrl + getData.card_thumbnail " alt="Placeholder image">
                </div>
                <div align="center" class="tds-card-listing-content">
                  <span class="tds-listing-location">{{getData.location}}</span>
                  <br>
                  <span class="tds-listing-title">{{getData.title}}</span>
                  <br>
                  <span class="tds-listing-price">
                    <b>{{getData.price | currency}}</b>
                  </span>
                  <br>
                </div>
              </div>

              </div>
              <p class="tds-ab-btn">
                <span
                  class="button tds-primary-button"
                  style="background: rgb(235, 92, 93);"
                  @click="closeModal"
                >Cancel</span>
              </p>

              <div class="tds-control-boost">
                <p>
                  By clicking the promote button, You've agreed to our
                  <n-link to="/terms-and-conditions">terms and conditions</n-link>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <div class="tds-title-tab footer" style="padding:0">
        <div class="tds-control-boost">
          <p>
            By clicking the promote button, You've agreed to our
            <n-link to="/terms-and-conditions">terms and conditions</n-link>
          </p>
        </div>
        <p class="tds-ab-btn">
          <span
            class="button tds-primary-button"
            style="background: rgb(235, 92, 93);"
            @click="closeModal"
          >Close</span>

        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props:['update'],
  data() {
    return {
      range: 0,
      data: null,
      baseUrl: process.env.API_URL,
      priority: 0,
      boost: 0,
      maxPriority: 1,
      maxBoost: 4
    }
  },
  computed: {
      getData() {
        return this.$store.state.nav.propertyBoosted
      },

      canBoost(){
        if (this.priority < 1){
          return true
        }else if(this.boost === 4){
          return true
        }else{
          return false
        }
      },

      canPrioritize(){
        if (this.priority == 1 || this.getData.priority == 1){
          return true
        }
      }
  },
  mounted(){
      this.setPriority()
      console.log(this.getData, "Data from vuex")
  },
  methods: {
    closeModal() {
      this.$store.commit('nav/closelistingModal', false)
      this.$store.commit('nav/clearBoostModal', false)
      this.getAgentPosts()
    },
    setPriority(){
      this.priority = this.getData.priority
      this.boost = this.getData.boost
      this.range = this.getData.boost
    },

    async promote(type) {
      let postUrl = this.getData.permalink
      let f = {}

      if (type === "PRIORITY") f.priority = 1
      if (type === "BOOST") f.boost = (this.range - this.boost)
      f.type = type

      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const promo = await this.$axios.$post(`promote/${postUrl}`, {promote: f})
        // const promo = await this.$axios.$post('http://localhost:3000/promote/2-bedroom-flat-in-enugu-north-enugu', {promote: f})

        let payload = {
          msg: promo.message,
          isActive: true
        }

        this.$store.commit('notify/success', payload)
        this.$store.dispatch('notify/selfReset')

        if (type === "PRIORITY") this.priority = promo.priority
        if (type === "BOOST") this.boost = promo.boost
      } catch (e){

        let payload = {
          msg: e.response.data.message,
          isActive: true
        }

        this.$store.commit('notify/warning', payload)
        this.$store.dispatch('notify/selfReset')

      }
    },

    getAgentPosts() {
      let username
      let base64Url = this.storage.token.split('.')[1]
      if (base64Url) username = JSON.parse(atob(base64Url)).username;

      let payload = {
        tab: 0,
        username: username,
        page: 1
      }
      this.$store.dispatch('agents/getAgentPosts', payload)
    },
  }
}
</script>

<style>
/* @import '~/static/mobile.css'; */

.range-text {
  text-align: right;
}

.aside-modal2 .bta{
    height: 20px;
    font-size: 9px;
    padding: 3px;
    text-align: center;
    border-radius: 20px;
}

@media screen and (max-width: 700px) {
  .range-text {
    text-align: left;
    margin: 0 !important;
    margin-top: 20px !important;
  }
}
</style>
