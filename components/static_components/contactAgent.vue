<template>
  <div class="tds-contact-agent">
    <div class="tds-margin">
      <b-tabs type="is-toggle" position="is-centered" @change="getAgentPosts">
        <b-tab-item label="SALE">
          <paginationspinner />
          <Card :properties="posts" v-if="posts" />
        </b-tab-item>
        <b-tab-item label="RENT">
          <paginationspinner />
          <Card :properties="posts" v-if="posts" />
        </b-tab-item>
        <b-tab-item label="SHORTLET">
          <paginationspinner />
          <Card :properties="posts" v-if="posts" />
        </b-tab-item>
        <b-tab-item label="NEW DEVELOPMENTS">
          <paginationspinner />
          <Card :properties="posts" v-if="posts" />
        </b-tab-item>
        <b-tab-item label="PAY IN INSTALLMENTS">
          <paginationspinner />
          <Card :properties="posts" v-if="posts" />
        </b-tab-item>
      </b-tabs>

      <div class="container find-agents">
        <b-pagination
          v-if="links"
          :total="links.total_entries"
          :current.sync="currentPage"
          :order="'is-centered'"
          :simple="false"
          :rounded="false"
          :per-page="links.per_page"
          @change="nextPage($event)"
        ></b-pagination>
      </div>

      <div v-if="!edit">
        <header class="tds-titles" align="center">
          <b>Contact</b>
          <b
            v-if="agent.account_type === 'PROPERTY_OWNER' || agent.account_type === 'INDIVIDUAL'"
          >Owner</b>
          <b v-else>Agent</b>
        </header>
        <div class="tds-contactagent-form">
          <form @submit.prevent="contactAgentform" validate>
            <b-field>
              <b-input placeholder="Name" v-model="name" required></b-input>
            </b-field>
            <b-field>
              <b-input placeholder="Phone Number" v-model="phone" required type="number" min="7"></b-input>
            </b-field>
            <b-field>
              <b-input placeholder="Email" type="email" v-model="email" required></b-input>
            </b-field>
            <b-field>
              <b-input type="textarea" placeholder="Message" v-model="message" required></b-input>
            </b-field>
            <b-field align="center">
              <button class="button">SUBMIT</button>
            </b-field>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import paginationspinner from '~/components/paginationSpinner'
import Card from '~/components/Card'
export default {
  props: ['agent', 'edit'],
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      message: '',
      tab: 0,
      currentPage: 1
    }
  },
  computed: {
    posts() {
      console.log(this.agent)
      return this.$store.state.agents.currentAgentPosts
    },

    links() {
      return this.$store.state.agents.links
    }
  },
  methods: {
    async contactAgentform() {
      if (
        this.name !== '' &&
        this.email !== '' &&
        this.phone !== '' &&
        this.message !== ''
      ) {
        this.$store.commit('spinner/spin', true)

        let contact = {
          owner: this.$route.params.agent,
          phone: this.phone,
          email: this.email,
          body: this.message,
          name: this.name
        }

        await this.$store.dispatch('contact/postMessage', contact)

        this.$store.commit('spinner/spin', false);

          if(this.$store.state.contact.empty){
            ;(this.name = ''),
            (this.email = ''),
            (this.phone = ''),
            (this.message = '')
          }
        
      }
    },
    async getAgentPosts(tab) {
      this.$store.commit('agents/Closespinnner', true)

      this.tab = tab

      let payload = {
        tab: this.tab,
        username: this.$route.params.agent,
        page: 1
      }
      this.$store.dispatch('agents/getAgentPosts', payload)
    },
    nextPage(e) {
      this.$store.commit('agents/Closespinnner', true)

      let payload = {
        tab: this.tab,
        username: this.$route.params.agent,
        page: e
      }

      if (e === 0) payload.page = 1

      this.$store.dispatch('agents/getAgentPosts', payload)
      this.currentPage = this.links.current_page
    }
  },
  components: {
    Card,
    paginationspinner
  },
  created() {
    this.getAgentPosts(0)
  }
}
</script>

<style>
/* .tds-contactagent-form input:focus,
.tds-contactagent-form textarea:focus {
  border: 1px solid black !important;
} */
</style>

