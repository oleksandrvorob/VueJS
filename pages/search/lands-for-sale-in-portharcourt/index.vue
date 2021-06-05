<template>
  <section class="searchParams">
    <header class="tds-titles" align="center">
      <strong>Land for sale in</strong> Port Harcourt
      <hr>
    </header>
    <div>
            <div class="column is-full tds-column-grey">
        <div>There are <span id="total_property">{{ property !== "" ? property : 500 }}</span> available lands
         listed for sale in Port Harcourt.
        These properties have been listed by verified estate agents, 
        property owners, and estate developers who you can contact 
        using their contact details provided for each property listing.</div>
      </div>
      <searchResult :location="location" :type="type" :purpose="purpose"/>
    </div>
    <b-pagination
      :total="total"
      :current.sync="current"
      :order="order"
      :simple="isSimple"
      :rounded="isRounded"
      :per-page="perPage"
      @change="nextPage($event)"
    ></b-pagination>
  </section>
</template>

<script>
import searchResult from '~/components/search-results'
import { async } from 'q';

export default {
  name: 'search-results',
  components: {
    searchResult
  },
  data() {
    return {
      property:"",
      title: 'Lands for sale in Port Harcourt - 2Dots Properties',
      total: 0,
      current: 1,
      perPage: 0,
      order: 'is-centered',
      isSimple: false,
      isRounded: false,
      queryParam: {},
      url:"q/search?q=port%20harcourt&purpose=SALE&type_of_property=LAND"
    }
  },
  methods: {
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', { marginTop: m, paddingTop: p })
    },
    async searchQuery() {
    try {
      const searchResult = await this.$axios.$get(this.url)
      console.log(searchResult)
      this.total = searchResult.links.total_entries
      this.perPage = searchResult.links.per_page
      this.current = searchResult.links.current_page
      this.$store.commit('search/setSearchResults', searchResult.posts)
      this.$store.commit('search/setLinks', searchResult.links)
    } catch (e) {
      console.log(e)
    }
  },
  nextPage(e){
    this.queryParam.page = e
    this.$router.push('/'+this.url+'&page='+`${e}`)
    window.scrollTo(0,0)
    console.log(this.$route.fullPath+'&?page='+e)

    // this.$router.push({ path: '/q/search', query: this.queryParam })
  }
  },
    updated(){
    this.property = document.querySelector('#total_properties').innerText
  }, 
  created() {
    this.updateTopSpaces(100, 0)
    this.searchQuery()
  },
  beforeDestroy() {
    this.updateTopSpaces(136, 50)
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'Search Results',
          name: 'Search Results',
          content: 'Search Results for 2Dots Properties'
        }
      ]
    }
  },
  watch: {
    '$route.fullPath'(){
      this.searchQuery()
    }
  }
}
</script>

<style>
.pagination-link{
  color: #0cb8e0 !important;
  border: 1px solid #0cb8e0;
}

.pagination-link:hover{
  background-color: #0cb8e0;
  border-color: #0cb8e0;
  color: white !important;
  opacity: .5;
}

.pagination-previous, .pagination-next{
  border-color: #0cb8e0;
}
.pagination .is-current{
  background-color: #0cb8e0;
  border-color: #0cb8e0;
  color: white !important;
}
.pagination{
  margin-top:20px;
}
.searchParams{
  max-width:1300px;
  margin: auto;
  padding: 10px;
}
@media screen and (max-width: 1330px ) {
  .searchParams{
    margin-top: -50px;
  }
}
</style>
