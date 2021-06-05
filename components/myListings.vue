<template>
  <div class="tds-grid-listings">
    <div class="tds-tab-listings">
      <b-tabs type="is-toggle" expanded @change="getAgentPosts">
        <b-tab-item label="SALE">
          <paginationspinner />
          <cardlistings :properties="posts" v-if="posts" />
        </b-tab-item>
        <b-tab-item label="RENT">
          <paginationspinner />
          <cardlistings :properties="posts" v-if="posts" />
        </b-tab-item>
        <b-tab-item label="SHORTLET">
          <paginationspinner />
          <cardlistings :properties="posts" v-if="posts" />
        </b-tab-item>
        <b-tab-item label="NEW DEVELOPMENTS">
          <paginationspinner />
          <cardlistings :properties="posts" v-if="posts" />
        </b-tab-item>
        <b-tab-item label="PAY IN INSTALLMENTS">
          <paginationspinner />
          <cardlistings :properties="posts" v-if="posts" />
        </b-tab-item>
      </b-tabs>

      <div class="container find-agents">
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
    <div>
      <div class="tds-side-card-listings">
        <div align="center" class="tds-card-title-listing">
          <span>
            <b>Quick Statistics</b>
          </span>
        </div>
        <div align="center">
          <p>Boosted Listings: {{stats.total_boost}}</p>
          <p>Priority Listings: {{stats.total_priority}}</p>
          <p>Property Requests: {{stats.total_post_request}}</p>
          <p>Total Listings: {{stats.total_post}}</p>
        </div>
      </div>
      <!-- <button class="tds-primary-button" style="width:100%; margin:0;" @click="openVerify">Verify Me</button> -->
    </div>
    
  </div>
</template>

<script>
import paginationspinner from '~/components/paginationSpinner'
import cardlistings from '~/components/static_components/cardListings'
export default {
  data() {
    return {
      tab: 0,
      currentPage: 1,
      stats: {},
      isVerifyModalActive: false,
      
    }
  },
  props: ['username'],
  components: { cardlistings, paginationspinner },
  computed: {
    properties() {
      return this.$store.state.properties.properties
    },
    posts() {
      return this.$store.state.agents.currentAgentPosts
    },

    links() {
      return this.$store.state.agents.links
    }
  },
  methods: {
  
    getAgentPosts(tab) {
      this.tab = tab
      let payload = {
        tab: this.tab,
        username: this.username,
        page: 1
      }
      this.$store.commit('agents/Closespinnner', true)
      this.$store.dispatch('agents/getAgentPosts', payload)
    },
    nextPage(e) {
      this.$store.commit('agents/Closespinnner', true)

      let payload = {
        tab: this.tab,
        username: this.username,
        page: e
      }

      if (e === 0) payload.page = 1

      this.$store.dispatch('agents/getAgentPosts', payload)
      this.currentPage = this.links.current_page
    },

    async getStats() {
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const stats = await this.$axios.get('user-stats')
        this.stats = stats.data
        this.$store.commit('nav/stats', stats.data)
        console.log(this.stats)
      } catch (e) {
        console.log(e)
      }
    }
  },
  created() {
    this.getAgentPosts(0)
    this.getStats()
  },
  watch: {
    '$route.fullPath'() {
      console.log('route changed')
      console.log(this.username)
      this.getAgentPosts(0)
    }
  },
 
}
</script>

<style>

</style>
