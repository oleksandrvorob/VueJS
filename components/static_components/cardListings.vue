<template>
  <div>
    <div class="tds-cardlisting-grids">
      <div class="tds-card-listing card" v-for="(property , index) in properties" :key="index" >
        <p >
          <span class="bta bta-boost" v-if="property.boost > 0">BOOSTED AD</span>
          <span class="bta bta-priority" v-if="property.priority > 0">PRIORITY LISTING</span>
        </p>
        <div class="tds-hover-button">
          <div>
            <button
              class="button tds-primary-button tds-button-gradient"
              @click="preview(index)"

            >PREVIEW</button>
            <br>
            <button
              class="button tds-primary-button tds-card-listing-edit"
              @click="edit(index)"

            >EDIT</button>
            <br>
            <button class="button tds-primary-button" @click="remove(index)"  >DELETE</button>
            <br>
            <button
              class="button tds-primary-button tds-card-listing-boost"
              @click="boost(property)"

            >PROMOTE</button>
          </div>
        </div>
        <div class="tds-card-listing-image">
          <img :src="baseUrl+property.card_thumbnail" alt="Placeholder image">
        </div>
        <div class="tds-card-listing-content" align="center" v-if="property">
          <span class="tds-listing-location">{{property.location.length  &lt; 20 ? property.location:property.location.slice(0,16)+"..." }}</span>
          <br>
          <span class="tds-listing-title">{{property.title.length &lt; 13 ? property.title:property.title.slice(0,15)+"..."}}</span>
          <br>
          <span class="tds-listing-price">
            <b>{{property.price | currency}}</b>
          </span>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['properties'],
  data() {
    return {
      opacity: false,
      baseUrl: process.env.API_URL
    }
  },
  methods: {
    preview(index){
      let url = this.properties[index].permalink
      this.$router.push({ path: '/properties/'+ url})
    },
    edit(index) {
      let url = this.properties[index].permalink
      this.$router.push({ path: '/edit/'+ url})
    },
    async remove(index) {
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
    boost(property) {
      this.$store.commit('nav/propertyBoosted', property)
      this.$store.commit('nav/closelistingModal', true)
      console.log(property)
    }
  },
  computed: {}
}
</script>

<style>
.tds-cardlisting-grids .bta{
    height: 20px;
    width: 110px;
    font-size: 9px;
    padding: 3px;
    text-align: center;
    border-radius: 20px;
    /* left: 140px; */
}
.tds-cardlisting-grids .bta-boost{
  left:140px;
}


@media screen and (max-width: 500px){
  .tds-cardlisting-grids .bta {
    left: 10px;
    top: 10px;

  }
  .tds-cardlisting-grids .bta-boost{
    left: 10px;
    top: 35px;
  }
}
.tds-card-listing-image {
  height: 200px;
}
.tds-listing-price {
  font-size: 21px;
  color: #3b3b3b;
}
.tds-card-listing-content {
  padding: 15px;
}
.tds-card-listing-image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}
.tds-listing-title,
.tds-listing-location {
  font-size: 13px;
  font-weight: 100;
}
.tds-listing-location {
  text-transform: uppercase;
}
.tds-card-listing {
  width: 325px;
  height: 311px;
  position: relative;
  border-radius: 8px;
}
.tds-cardlisting-grids {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 25px;
  justify-content: center;
}
.tds-hover-button {
  height: 100%;
  width: 100%;
  background: rgba(28, 28, 28, 0.91);
  opacity: 0;
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

@media screen and (max-width: 900px) {
  .tds-cardlisting-grids {
    grid-gap: 10px;
    padding-top: 14px;
  }
}
@media screen and (max-width: 710px) {
  .tds-hover-button {
    background: rgba(28, 28, 28, 0.71);
    opacity: 1;
    padding: 10px;
  }
}
</style>
