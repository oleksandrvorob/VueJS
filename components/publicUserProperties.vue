<template>
  <div class="tds-contact-agent">
    <div class="tds-margin">
      <b-tabs type="is-toggle" position="is-centered" @change="getAgentPosts">
        <b-tab-item label="SALE">
          <Card :properties="posts" v-if="posts"/>
        </b-tab-item>
        <b-tab-item label="RENT">
          <Card :properties="posts" v-if="posts"/>
        </b-tab-item>
        <b-tab-item label="SHORTLET">
          <Card :properties="posts" v-if="posts"/>
        </b-tab-item>
        <b-tab-item label="NEW DEVELOPMENTS">
          <Card :properties="posts" v-if="posts"/>
        </b-tab-item>
        <b-tab-item label="PAY IN INSTALLMENTS">
          <Card :properties="posts" v-if="posts"/>
        </b-tab-item>
      </b-tabs>
      <div>
        <!-- <header class="tds-titles" align="center">
          <b>Contact Agent</b>
        </header> -->
        <div class="tds-contactagent-form">
          <form @submit.prevent="contactAgentform" validate>
            <b-field>
              <b-input placeholder="Name" v-model="name" required></b-input>
            </b-field>
            <b-field>
              <b-input placeholder="Email" type="email" v-model="email" required></b-input>
            </b-field>
            <b-field>
              <b-input type="textarea" placeholder="Message" v-model="message" required>

              </b-input>
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
import Card from '~/components/Card'
export default {
  data() {
    return {
        name:'',
        email:'',
        message:''
    }
  },
  computed: {
    posts(){
      return this.$store.state.agents.currentAgentPosts
    }
  },
  methods: {
    contactAgentform() {
      console.log('submitted' + this.name + this.email + this.message)
        this.name = ''
        this.email = ''
        this.message = ''
    },
   async getAgentPosts(tab){
     let payload = {
          tab: tab,
          username: this.$route.params.agent
        }
      this.$store.dispatch('agents/getAgentPosts', payload)
    }
  },
  components: {
    Card
  },
  created(){
    this.getAgentPosts(0)
  }
}
</script>

<style>


</style>