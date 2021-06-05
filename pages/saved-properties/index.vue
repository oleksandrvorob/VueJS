<template>
  <div>
    <div class="container tds-page-saved-properties">
      <header class="tds-titles" align="center">
        <strong>Saved</strong>Properties
        <hr>
      </header>
      <div v-if="properties.length > 0">
        <cardListing :properties="properties"/>
      </div>

      <div v-if="links">
        <b-pagination
          :total="links.total_entries"
          :current.sync="currentPage"
          :order="'is-centered'"
          :simple="false"
          :rounded="false"
          :per-page="links.per_page"
          @change="nextPage"
        ></b-pagination>
      </div>

      
    </div>
  </div>
</template>

<script>
import cardListing from '~/components/static_components/savedcards'

export default {
  components: {
    cardListing
  },
  data() {
    return {
      title: 'Saved Property - 2Dots Properties',
      properties:[],
      links:null,
      currentPage:1
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'Saved properties',
          name: 'Saved properties',
          content: 'Saved properties'
        }
      ]
    }
  },
  middleware: 'auth',
  methods: {
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', {
        marginTop: m,
        paddingTop: p
      })
    },
    async getAllProperties(){
      this.$axios.setToken(this.storage.token)
      const properties = await this.$axios.$get('markers/all')
      console.log(properties)
      this.links = properties.links
      this.properties = properties.posts
    },
    async nextPage(e){
      this.$store.commit('agents/Closespinnner' , true)

      const properties = await this.$axios.$get(`markers/all?page=${e}`)
      console.log(properties)
      this.properties = properties.posts
      this.links = properties.links

      if(e === 0) payload.page = 1

      this.currentPage = this.links.current_page

      this.$store.commit('agents/Closespinnner' , false)
    },
  },
  created() {
    this.getAllProperties()
    this.updateTopSpaces(100, 50)
  },
  beforeDestroy() {
    this.updateTopSpaces(136, 50)
  }
}
</script>

<style>
@media screen and (max-width: 1329px) {
  .container.tds-page-saved-properties {
    margin-top: -106px;
  }
}
</style>
