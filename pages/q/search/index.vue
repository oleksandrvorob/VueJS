<template>
  <section class="searchParams">
    <header class="tds-titles" align="center">
      <strong>Search </strong>Result
      <hr>
    </header>
    <div>
      <searchResult/>
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
      title: 'Find apartments for rent and  houses for sale in Nigeria - 2Dots Properties',
      content: 'Find hot properties in Lekki, Ibeju Lekki, Ajah, Epe, Victoria Island and Lagos Mainland. All from trusted property owners, Landlords and verified agents.',
      total: 0,
      current: 1,
      perPage: 0,
      order: 'is-centered',
      isSimple: false,
      isRounded: false,
      queryParam: {}
    }
  },
  methods: {
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', { marginTop: m, paddingTop: p })
    },
    async searchQuery() {
    try {
      let url = this.$route.fullPath
      const searchResult = await this.$axios.$get(url)
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

    this.$router.push({ path: this.$route.fullPath, query: this.queryParam })
    window.scrollTo(0,0)
    console.log(this.$route.fullPath+'&?page='+e)

    // this.$router.push({ path: '/q/search', query: this.queryParam })
  }
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
        { hid: 'SearchResults', name: 'SearchResults', content: 'Find hot properties in Lekki, Ibeju Lekki, Ajah, Epe, Victoria Island and Lagos Mainland. All from trusted property owners, Landlords and verified agents.' },
        { hid: 'og-title', property: 'og:title', content:  this.title},
        { hid: 'site_name', property: 'og:site_name', content: this.content },
        { hid: 'url', property: 'og:url', content: 'https://2dotsproperties.com' },
        { hid: 'image', property: 'og:image', content: 'https://2dots.ams3.digitaloceanspaces.com/FB-Cover.jpg' },
        { hid: 'description', property: 'og:description', content: this.content },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '2Dots Properties' },
        { name: 'twitter:title', content: this.content },
        { name: 'twitter:description', content: this.content },
        { name: 'twitter:image', content: 'https://2dots.ams3.digitaloceanspaces.com/FB-Cover.jpg' },
        { name: 'twitter:image:alt', content: 'https://2dots.ams3.digitaloceanspaces.com/FB-Cover.jpg' },
        { name: 'keywords', content: 'properties for sale in lagos nigeria, houses for sale in nigeria, apartment for sale in lagos, land for sale in lagos, private property nigeria, Nigeria Property Centre, Lagos property for rent, cheap property for sale, house for sale in lagos, property24 nigeria, houses for sale in lagos mainland, tolet nigeria, luxury homes for sale in lagos nigeria, land for sale, property pro, bungalows for sale in lagos, apartments for sale, real estate for sale, houses for sale in lekki lagos, 2dots properties'}
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
