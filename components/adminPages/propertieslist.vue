<template>
  <div class="columns is-multiline tds-mobile-card-home">
    <div class="column is-one-quarter" v-for="(property, index) in properties" :key="index">
      <div>
        <div class="card">
          <div class="tds-hover-button">
            <div>
              <button class="button tds-primary-button tds-button-gradient" @click="preview(property.permalink)">PREVIEW</button>
              <br />
              <button class="button tds-primary-button tds-card-listing-edit" @click="edit(property.permalink)">EDIT</button>
              <br />
              <button class="button tds-primary-button" @click="deleteProperty(index)">DELETE</button>
              <br />
              <!-- <button class="button tds-primary-button tds-card-listing-boost" @click="promote(property.permalink)">PROMOTE</button> -->
            </div>
          </div>
          <div class="card-image">
            <figure class="image is-4by3">
              <p class="ad-holder">
                <span class="bta bta-boost" v-if="property.boost > 1">BOOSTED AD</span>
                <span class="bta bta-priority" v-if="property.priority > 0">PRIORITY LISTING</span>
              </p>

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
      </div>
    </div>
  </div>
</template>
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
    },
    preview(link){
      this.$router.push({ path: `/properties/${link}` })
    },
    edit(link){
      let route = this.$router.resolve({ path: `/edit/${link}` });
      window.open(route.href, '_blank');
    },
    async deleteProperty(index){
      let del = confirm("Are you sure you want to DELETE this?");
      try{
        if (del === true){
          this.$axios.setToken(this.storage.token, 'Bearer')
          let url = this.properties[index].permalink
          const deletePost = await this.$axios.$delete(url)
          this.$store.commit('agents/deletePost', index)
        }
      }catch(e){
        console.log(e)
      }

    },
    promote(link){
      console.log(link)
    }
  }
}
</script>

<style scoped>
.tds-hover-button:hover {
  opacity: 1;
}

.tds-hover-button {
  height: 100%;
  width: 100%;
  background: rgba(28, 28, 28, 0.91);
  opacity: 0;
  top: 0;
  z-index: 1;
  text-align: center;
  display: grid;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 6px;
}

.tds-hover-button:hover {
  opacity: 1;
  transition: 0.5s;
}
.tds-hover-button .button:active {
  border: none;
}
.tds-hover-button .button {
  margin: 10px;
  border-radius: 6px;
  font-size: 11px;
}
.tds-card-listing-edit {
  background: rgba(12, 185, 224, 0.342) !important;
  border: 1.5px solid #0cb8e0;
  color: #0cb8e0;
  outline: none;
}
.tds-card-listing-edit:hover {
  border: 1.5px solid #0cb8e0;
}

.tds-card-listing-boost {
  background: rgba(255, 219, 74, 0.342) !important;
  border: 1.5px solid #ffdb4a;
  color: #ffdb4a;
  outline: none;
}

.tds-card-listing-boost:hover {
  border: 1.5px solid #ffdb4a;
}
.opacity {
  opacity: 1;
  transition: 0.5s;
}


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
.tds-mobile-card-home .bta-boost {
  left: 140px;
}

@media screen and (max-width: 500px) {
  .tds-mobile-card-home .bta {
    left: 10px;
    top: 10px;
  }
  .tds-mobile-card-home .bta-boost {
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

