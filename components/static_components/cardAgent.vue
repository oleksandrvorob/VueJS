<template>
  <div class="container tds-search-agent-container">
    <div>
      <form @submit.prevent="searchTerm()" class="tds-search-agent" validate>
      <b-field>
            <b-input placeholder=" Search... " expanded v-model="term"></b-input>
            <p class="control">
                <button class="button  tds-primary-button">Find Agent</button>
            </p>
        </b-field>
      </form>
    </div>

     <header class="tds-titles" align="center">
      <b>Find Agents &</b> Firms
      <hr>
    </header>

    <div class="columns is-multiline tds-mobile-find-agent" v-if="agents">
      <div class="column is-one-quarter" v-for="(agent, index) in agents" :key="index" >
        <nuxt-link :to="'/agents/'+ agent.permalink">
              <p  style="position: relative">
                <span
                  v-if="agent.verified"
                  class="bta bta-boost"
                  style="font-size: 10px;font-weight: bold;color: white;padding: 5px 9px;z-index: 8;margin: 20px;top:0; z-index:5;">verified</span>
              </p>
          <div class="card tds-agent-card">
            <div class="card-image tds-Agent-image">
              <img v-if="agent.avatar" :src="baseUrl+agent.avatar" alt="Placeholder image">
              <p v-if="!agent.avatar && agent.company" class="fakeprofile">{{ agent.company.slice(0, 1) }}</p>
            </div>
            <span
              class="tds-title-agent-card"
              v-if="agent.company"
            >{{agent.company.length &lt;30 ? agent.company:agent.company.slice(0,29)+"..."}}</span>

          </div>
        </nuxt-link>
      </div>
    </div>
    <div v-if="agentslinks.total_entries === 0" class="no-agent">

      No Agent Found

    </div>

    <div class="container find-agents">
      <b-pagination
        :total="total"
        :current.sync="current"
        :order="'is-centered'"
        :simple="false"
        :rounded="false"
        :per-page="perPage"
        @change="nextPage($event)"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ['properties'],
  data() {
    return {
      total: 0,
      current: 1,
      perPage: 0,
      baseUrl: process.env.API_URL,
      term: '',
      agents: [],
      queryParam: {},
      agentslinks: {},

      showCard: false,
    }
  },
  computed: {
    q(){
      return this.$route.query.q || null
    }
  },
  methods: {
    nextPage(e) {
      this.queryParam.page = e
      if (this.queryParam.page === 0)  this.queryParam.page = 1

      this.$router.push({ path: this.$route.fullPath, query: this.queryParam })
      window.scrollTo(0,0)
    },
    goto(index) {
      this.$router.push({ path: `/${index}` })
    },
    searchTerm(){
      if (this.term !== '')
        this.queryParam.q = this.term

      if (this.term == '')
        delete  this.queryParam.q

      this.$router.push({ path: '/agents', query: this.queryParam })

      // this.$router.push({path: `/agents?q=${this.term}`})
    },
    async searchAgents() {
      try{
        let url = this.$route.fullPath
        const agents = await this.$axios.$get(url)
        this.agents = agents.agents
        this.total = agents.links.total_entries
        this.perPage = agents.links.per_page
        this.current = agents.links.current_page
        this.agentslinks = agents.links
        console.log(agents)
      }catch(e){
        console.log(e.response.data)
      }

    }
  },
  watch: {
    '$route.fullPath'(){
      this.searchAgents()
    }
  },
  created(){
    this.searchAgents()
  }
}
</script>
<style>
  .no-agent{
    text-align: center;
    height:300px;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
