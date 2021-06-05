<template>
  <div class="columns is-multiline tds-mobile-card-home">
    <div class="column is-one-quarter" v-for="(property, index) in properties" :key="index">
      <nuxt-link :to="'/properties/'+property.permalink">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <p class="ad-holder"><span class="bta bta-boost" v-if="property.boost > 0">BOOSTED AD</span>
              <span class="bta bta-priority" v-if="property.priority > 0">PRIORITY LISTING</span></p>
              <vue-load-image>

                <img slot="image" :src="baseUrl+property.card_thumbnail" />
                <img slot="preloader" src="~/static/img/fallback.jpg" />
              </vue-load-image>
            </figure>
          </div>
          <div class="card-content">
            <div class="content tds-card-meta" v-if="property">
              <span
                class="tds-location"
              >{{property.location.length &lt; 20 ? property.location:property.location.slice(0,16)+"..." }}</span>

              <span
                class="tds-title"
              >{{property.title.length &lt; 13 ? property.title:property.title.slice(0,15)+"..."}}</span>
              <span class="tds-price">{{property.price | currency}}</span>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
<style scoped>
.tds-mobile-card-home .bta {
  height: 20px;
  width: 110px;
  font-size: 9px;
  padding: 3px;
  text-align: center;
  border-radius: 20px;
  z-index: 9;
  left: 10px;
}
.tds-mobile-card-home .bta-boost{
  left: 140px;
}

@media screen and (max-width: 500px){
  .tds-mobile-card-home .bta {
    left: 10px;
    top: 10px;

  }
  .tds-mobile-card-home .bta-boost{
    left: 10px;
    top: 35px;
  }
}
.tds-location {
  font-size: 13px;
  font-weight: 300;
}

.tds-title {
  font-size: 16px;
  color: #3b3b3b !important;
  /* font-weight: 500; */
}

.tds-price {
  font-weight: bold;
  font-size: 20px;
}

.tds-card-meta {
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
}

.card img {
  border-radius: 12px 12px 0 0;
}

.card {
  border-radius: 12px;
}
@media screen and (max-width: 700px) {
  .columns.is-multiline.tds-mobile-card-home {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 10px;
  }
  .tds-price {
    font-size: 14px;
  }
  .tds-mobile-card-home .card-content {
    padding: 10px;
  }
  .navbar-item {
    padding: 0;
  }
  .tds-title {
    font-size: 10px;
  }
}
@media (min-width: 701px) and (max-width: 1200px) {
  .columns.is-multiline.tds-mobile-card-home {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 10px;
  }
  .tds-mobile-card-home .column.is-one-quarter,
  .column.is-one-quarter-tablet {
    width: 100%;
  }
  .tds-price {
    font-size: 14px;
  }
  .tds-mobile-card-home .card-content {
    padding: 10px;
  }
  .navbar-item {
    padding: 0;
  }
}
</style>

<script>
import VueLoadImage from 'vue-load-image'

export default {
  props: ['properties'],

  components: {
    'vue-load-image': VueLoadImage
  },

  data() {
    return {
      baseUrl: process.env.API_URL
    }
  },

  computed: {
    isLive() {
      console.log(this.properties)
      return this.$store.state.properties.liveStatus
    }
  },

  methods: {
    goto(index) {
      this.$router.push({ path: `/properties/${index}` })
    }
  }
}
</script>
