<template>
  <div>
    <form class="search-filter" @submit.prevent="filter">
      <div class="tds-forum-filters purpose">
        <p>PURPOSE</p>
        <ul>
          <div class="field filter-radio">
            <b-radio v-model="purpose" native-value="">Any</b-radio>
          </div>
          <div class="field filter-radio">
            <b-radio v-model="purpose" native-value="SALE">Buy</b-radio>
          </div>
          <div class="field filter-radio">
            <b-radio v-model="purpose" native-value="RENT">Rent</b-radio>
          </div>
          <div class="field filter-radio">
            <b-radio v-model="purpose" native-value="SHORT">Shortlet</b-radio>
          </div>
          <div class="field filter-radio">
            <b-radio v-model="purpose" native-value="NEW">New Developments</b-radio>
          </div>
          <div class="field filter-radio">
            <b-radio v-model="purpose" native-value="INSTALLMENT">Pay In Installments</b-radio>
          </div>
        </ul>
      </div>

      <div class="tds-forum-filters">
        <p>TYPE OF PROPERTY</p>
        <ul>
          <b-select class="filter-radio" v-model="type">
            <option value="">Any</option>
            <option v-for="(option, i) in dropDown" :key="i" :value="option.value">{{option.option}}</option>
          </b-select>
        </ul>
      </div>

      <div class="tds-forum-filters price">
        <p>Price</p>
        <ul>
             <b-select v-model="minprice" class="filter-radio">
              <option disabled value selected>Min Price</option>
              <option
                v-for="option in dropDownPrice.minPrice"
                :key="option.id"
                :value="option.value"
              >{{option.option}}</option>
            </b-select>


            <b-select v-model="maxprice" class="filter-radio">
              <option disabled value selected>Max Price</option>
              <option
                v-for="option in dropDownPrice.maxPrice"
                :key="option.id"
                :value="option.value"
              >{{option.option}}</option>
            </b-select>
        </ul>
      </div>

      <div class="tds-forum-filters bedroom" v-if="type != 'Land' ">
        <p class="bedroom-bathroom"> <span> Bathroom </span> <span> Bedroom </span> </p>
        <ul>
          <b-select class="filter-radio" v-model="bathroom">
            <option value="">Any</option>
            <option v-for="n in 10" :key="n">{{n}}</option>
            <option>10+</option>
          </b-select>

           <b-select class="filter-radio" v-model="bedroom">
            <option value="">Any</option>
            <option v-for="n in 10" :key="n">{{n}}</option>
            <option>10+</option>
          </b-select>
        </ul>
      </div>

      <div class="tds-forum-filters">
        <p>Use of Property</p>
        <ul>
          <div class="field filter-radio use-of-property">
            <b-radio v-model="use" native-value="">Any</b-radio>
            <b-radio v-model="use" native-value="Commercial">Commercial</b-radio>
            <b-radio v-model="use" native-value="Residential">Residential</b-radio>
            <b-radio v-model="use" native-value="Mixed Use" class="last">Mixed Use</b-radio>
          </div>
        </ul>
      </div>

      <div class="tds-forum-filters">
        <button class="tds-primary-button filter-results-button">Filter</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropDown: [
        { option: 'Flat Or Apartment', value: 'FLAT OR APARTMENT' },
        { option: 'House', value: 'HOUSE' },
        { option: 'Land', value: 'LAND' },
        { option: 'Commercial Property', value: 'COMMERCIAL' }
      ],
      purpose: '',
      use: '',
      type: '',
      maxprice: '',
      minprice: '',
      bedroom: '',
      bathroom: '',
      queryParam: {}
    }
  },
  methods: {
    filter() {
      if(this.$route.query.q)
        this.queryParam.q = this.$route.query.q
      if (this.type !== '')
        this.queryParam.type_of_property = this.type
      if (this.bedroom !== '')
        this.queryParam.bedrooms = this.bedroom
      if (this.bathroom !== '')
        this.queryParam.min_bathrooms = this.bathroom
      if (this.minprice !== '')
        this.queryParam.min_price = this.minprice
      if (this.maxprice !== '')
        this.queryParam.max_price = this.maxprice
      if (this.purpose !== '')
        this.queryParam.purpose = this.purpose
      if (this.use !== '')
        this.queryParam.use_of_property = this.use

      this.removeQry()
      this.$store.commit('nav/toggleModalFilter')
      this.$router.push({ path: '/q/search', query: this.queryParam })
    },

    removeQry(){
      if (this.type == '')
        delete  this.queryParam.type_of_property
      if (this.bedroom == '')
        delete  this.queryParam.bedrooms 
      if (this.bathroom == '')
        delete  this.queryParam.min_bathrooms
      if (this.minprice == '')
        delete  this.queryParam.min_price 
      if (this.maxprice == '')
        delete  this.queryParam.max_price 
      if (this.purpose == '')
        delete  this.queryParam.purpose 
      if (this.use == '')
        delete  this.queryParam.use_of_property 
    },

    checkQry(){
      let queries = this.$route.query

      if(queries.min_price)
        this.minprice = queries.min_price

      if(queries.max_price)
        this.maxprice = queries.max_price

      if(queries.min_bedrooms)
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
  computed:{
    dropDownPrice() {
      console.log(this.$store.state.banner.dropDown)
      return this.$store.state.banner.dropDown
    }
  },

  watch: {
    '$route.fullPath'(){
      this.checkQry()      
    }
  },

  created(){
    this.checkQry()
  }
}
</script>

<style>


.searchmodal-background .search-filter ul{
  color: white;
}
.tds-forum-filters.bedroom p{
  padding: 0;
}
.tds-forum-filters.bedroom p span{
  text-align: center;
}
.field.filter-radio {
  padding-left: 20px;
}
.filter-radio-text {
  height: auto !important;
  margin-top: 10px;
}
.tds-forum-filters ul .filter-radio {
  height: 35px !important;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* padding-left:20px;  */
  width: 100%;
}

.field.filter-radio.use-of-property{
  flex-wrap: wrap;
  margin-top: 5px;
}

.b-radio.radio.last{
  margin-left: 0 !important;
}

.filter-radio .select,
.filter-radio .control {
  width: 100%;
}
.filter-radio .select select {
  width: 100%;
  font-size: 14px;
  height: 35px !important;
}
.search-filter .tds-forum-filters {
  height: auto;
  min-height: auto;
  padding-bottom: 5px;
  border: none;
  /* padding: 0; */
  width: 280px;
}
.search-filter {
  width: 280px;
}
.tds-forum-filters .bedroom-bathroom{
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
}
.search-filter p {
  height: 40px;
  font-size: 15px;
}

.filter-results-button {
  margin: 0;
  width: 100%;
  cursor: pointer;
}
.tds-forum-filters.price ul ,.tds-forum-filters.bedroom ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-gap: 10px; */
}
.tds-forum-filters.purpose .field.filter-radio {
  width: auto;
}

.tds-forum-filters.purpose ul {
  display: flex;
  flex-wrap: wrap;
}

.search-filter > div {
  margin: 5px 0;
}

.b-radio.radio input[type='radio'] + .check {
  height: 14px;
  width: 14px;
}
.b-radio.radio input[type='radio']:checked + .check {
  border-color: #0ebcdb;
  height: 14px;
  width: 14px;
}
.b-radio.radio input[type='radio'] + .check:before {
  /* width: 5px;
  height: 5px; */
  background: #0ebcdb;
}

.b-radio.radio .control-label {
  font-size: 14px;
}

@media screen and (max-width:500px) {
  .checkbox:hover, .radio:hover {
    color: white;
  }
}
</style>
