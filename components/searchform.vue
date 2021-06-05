<template>
  <form validate @submit.prevent="submitForm">
    <no-ssr>
      <div align="center" class="tds-search-bar-form">
        <!-- <b-input
          class="tds-input-field"
          placeholder="Search for area you want to live"
          v-model="searchParams.term"
          @input="searchjson"
        ></b-input>-->

        <b-field class="tds-input-field">
          <b-autocomplete
            placeholder="Search for area you want to live"
            v-model="searchParams.term"
            :data="searchGuess"
            @select="option => selected = option"
            @input="searchjson"
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>

        <b-select class="tds-input" v-model="searchParams.type">
          <option disabled value>Type</option>
            <option value="">Any</option>

          <option
            v-for="option in dropDown.Type"
            :key="option.id"
            :value="option.value"
          >{{option.option}}</option>
        </b-select>

        <b-select v-model="searchParams.bedroom" class="tds-input" :disabled="controler">
          <option disabled value>Bed Room</option>
            <option value="">Any</option>

          <option
            v-for="option in dropDown.bedRoom"
            :key="option.id"
            :value="option.value"
          >{{option.option}}</option>
        </b-select>

        <b-select v-model="searchParams.minprice" class="tds-input">
          <option disabled value>Min Price</option>
            <option value="">Any</option>

          <option
            v-for="option in dropDown.minPrice"
            :key="option.id"
            :value="option.value"
          >{{option.option}}</option>
        </b-select>

        <b-select v-model="searchParams.maxprice" class="tds-input">
          <option disabled value>Max Price</option>
            <option value="">Any</option>

          <option
            v-for="option in dropDown.maxPrice"
            :key="option.id"
            :value="option.value"
          >{{option.option}}</option>
        </b-select>

        <input class="button tds-primary-button" value="SEARCH" type="submit" @click="submitForm">
      </div>
    </no-ssr>
  </form>
</template>

<script>
// import mobileNavbarVue from './mobileNavbar.vue';
import searchDetails from './forms/searchfile.json'
export default {
  // name:Searchform,
  data() {
    return {
      searchDetails,
      searchGuess: [],
      searchParams: {
        type: '',
        bedroom: '',
        minprice: '',
        maxprice: '',
        term: ''
      },
      controler: false,
      queryParam: {}
    }
  },
  computed: {
    dropDown() {
      return this.$store.state.banner.dropDown
    },
    slug() {
      return this.$store.state.banner.selectedSlug
    }
  },
  methods: {
    searchjson() {
      this.searchGuess = []

      let regexp = new RegExp(this.searchParams.term, 'ig')

      this.searchDetails.filter((term, index) => {
        var a = term.replace(/,/g, '')
        if (a.match(regexp)) {
          this.searchGuess.push(this.searchDetails[index])
        }
      })
    },
    go() {
      this.$store.commit('nav/toggleModal')
    },
    

    
    submitForm() {
      if (this.searchParams.term !== '')
        this.queryParam.q = this.searchParams.term
      if (this.searchParams.type !== '')
        this.queryParam.type_of_property = this.searchParams.type
      if (this.searchParams.bedroom !== '')
        this.queryParam.bedrooms = this.searchParams.bedroom
      if (this.searchParams.minprice !== '')
        this.queryParam.min_price = this.searchParams.minprice
      if (this.searchParams.maxprice !== '')
        this.queryParam.max_price = this.searchParams.maxprice;

        console.log('am running before remove query ')

      this.removeQry();

        console.log('am running after remove query ')

      this.$router.push({ path: '/q/search', query: this.queryParam })


      // debugger
      // this.$store.dispatch('search/setSearchResults', url)

      this.$store.commit('nav/toggleModal')
    },
    removeQry(){
      console.log('am running in remove query ')
      if (this.searchParams.type == '') delete this.queryParam.type_of_property
      if (this.searchParams.bedroom == '') delete this.queryParam.bedrooms 
      if (this.searchParams.bathroom == '') delete this.queryParam.min_bathroom 
      if (this.searchParams.minprice == '') delete this.queryParam.min_price 
      if (this.searchParams.maxprice == '') delete this.queryParam.max_price 
      if (this.searchParams.purpose == '') delete this.queryParam.purpose 
      if (this.searchParams.use == '') delete this.queryParam.use 
    },

    checkQry(){
      let queries = this.$route.query

      if(queries.min_price)
        this.minprice = queries.min_price

      if(queries.max_price)
        this.maxprice = queries.max_price

      if(queries.bedrooms)
        this.bedrooms = queries.bedrooms

      if(queries.min_bathrooms)
        this.bathroom = queries.min_bathrooms

      if(queries.purpose)
        this.purpose = queries.purpose

      if(queries.use_of_property)
        this.use = queries.use_of_property

      if(queries.type_of_property)
        this.type = queries.type_of_property
    }
  },
  watch: {
    'searchParams.type': function() {
      if (this.searchParams.type === 'Land') {
        this.controler = true
      } else {
        this.controler = false
      }
    },

    '$route.fullPath'(){
      this.checkQry()      
    },

    slug() {
      this.queryParam.purpose = this.slug
      console.log(this.queryParam)
    }
  }
}
</script>

<style>
</style>
