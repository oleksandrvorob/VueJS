<template>
    <div class="container">
        <div class="tds-savedListing-grids">
      <div class="tds-card-listing card" v-for="(property , index) in properties" :key="index">
        <div class="tds-hover-button">
          <div>
            <nuxt-link :to="'/properties/'+ index" class="button tds-primary-button tds-card-listing-edit" @click="edit(index)"> SEE PROPERTY</nuxt-link>
            <br>
            <button class="button tds-primary-button" @click="remove">REMOVE FROM SAVED</button>
          </div>
        </div>
        <div class="tds-card-listing-image">
          <img :src="property.logo" alt="Placeholder image">
        </div>
        <div class="tds-card-listing-content" align="center">
          <span class="tds-listing-location">{{property.location}}</span>
          <br>
          <span class="tds-listing-title">{{property.title}}</span>
          <br>
          <span class="tds-listing-price">
            <b>{{property.price}}</b>
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
      opacity: false
    }
  },
  methods: {
    edit(index) {
      this.$router.push({path:'/edit-property'})
    },
    remove() {
       var answer = confirm('Confirm Delete')
    //    if(answer){
    //        props.properties.pop(index , 1)
    //    }else{
    //        console.log(answer)
    //    }
    }
  },
  computed: {}
}

</script>

<style>

</style>
