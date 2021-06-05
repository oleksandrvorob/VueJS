<template>
  <div>
    <div class="searchmodal-background filter" v-if="modal">
      <span class="close-search-modal" @click="showFilterModal">×</span>
      <div class style="margin:auto">
        <filterComponent />
      </div>
    </div>
    {{params}}


     <div class="column is-full tds-column-grey" v-if="StaticRoute() === false " style="display:block">
      There are {{checkTotal}} available {{typeOfproperty}} listed for {{ $route.query.purpose? $route.query.purpose.toLowerCase() : 'sale'  }} in {{checkparams}} .
      <span v-if="links.total_entries !== 0"> These properties have been listed by verified estate agents, property owners, and estate developers who you can contact using their contact details provided for each property listing.</span>
    </div>


    <div class="tds-search-result-filter">
      <p v-if="links" > <span id="total_properties">{{links.total_entries}}</span> Results</p>
      <p>
        <button class="button is-secondary filter-button" @click="showFilterModal">Filter</button>
      </p>
    </div>

    <section>
      <div class="tds-search-flex">
        <div class="filter-hide-mobile">
          <filterComponent />
        </div>
        <div class="results-panel">
          <Results />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import filterComponent from '~/components/filter'
import Results from '~/components/resultCards'
export default {
  props:['location', 'purpose', 'type'],
  components: {
    filterComponent,
    Results
  },
  data() {
    return {}
  },
  methods: {
    
    showFilterModal() {
      this.$store.commit('nav/toggleModalFilter')
    },
    StaticRoute(){
        if(this.$route.fullPath.includes('q/search')){
            console.log(this.$route.fullPath.includes('q/search'))
            return false
        }else{
            return true
        }
    }
  },
  computed: {
      typeOfproperty(){
          let plural ;
          this.links.total_entries > 1? plural = 's' : plural = ""
         return this.$route.query.type_of_property? (this.$route.query.type_of_property + plural).toLowerCase() : 'flats, houses, land and commercial property'  
      },
    checkparams(){
        if(this.$route.query.q !== undefined){
            return this.$route.query.q
        }else{
            return 'Nigeria'
        }
    },
    checkTotal(){
       if(this.links.total_entries !== undefined){
           if(this.links.total_entries === 0){
               return 'No'
           }
            return this.links.total_entries
        }else{
            return 400
        }
    },
    params() {
      return this.$route.params.permaLink
    },
    properties() {
      return this.$store.state.properties.properties
    },
    links() {
      return this.$store.state.search.links
    },
    modal() {
      return this.$store.state.nav.filterModal
    }
  },
  created() {
      console.log(this.$route)
    console.log(this.link)
  }
}
</script>

<style>
.tds-search-flex {
  display: flex;
  justify-content: center;
}
.filter-button {
  display: none;
}

.results-panel {
  width: 75%;
}

.filter-hide-mobile {
  width: 25%;
}
.searchmodal-background.filter {
  display: none;
}
@media screen and (max-width: 1200px) {
  .filter-hide-mobile {
    display: none !important;
  }
  .searchmodal-background.filter {
    display: flex;
  }
  .filter-button {
    display: initial;
  }

  .results-panel {
    width: 100%;
  }
}
</style>
