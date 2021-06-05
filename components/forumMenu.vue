<template>
  <div>
    <div class="tds-forum-menu">
      <div class="ask-question">
        <nuxt-link to="/forum/question">
          <button class="tds-primary-button">Ask a Question</button>
        </nuxt-link>
      </div>
      <div class="tds-forum-filters" v-if="username">
        <p>FILTERS</p>
        <ul>
          <li @click="filters('')" :class="{'active' : filterActive === '' } ">My Questions</li>
          <li @click="filters('participating=true')" :class="{'active':filterActive === 'participating=true' } ">Participating</li>
          <li @click="filters('answered=true')" :class="{'active':filterActive === 'answered=true' }" >Answered</li>
          <li @click="filters('answered=false')" :class="{'active':filterActive === 'answered=false' }" >Unanswered</li>
        </ul>
      </div>
      <div class="tds-forum-categories">
        <p>CATEGORIES</p>
        <ul>
          <li @click="category('DESIGN')" :class="{'active' : active === 'DESIGN' } ">
            <span>Design and Renovations</span>
            <span>{{stats.design}}</span>
          </li>
          <li @click="category('CONSTRUCTION')" :class="{'active' : active === 'CONSTRUCTION' } ">
            <span>Construction</span>
            <span>{{stats.construction}}</span>
          </li>
          <li @click="category('SALES')" :class="{'active' : active === 'SALES' } ">
            <span>Sales & Rentals</span>
            <span>{{stats.sales}}</span>
          </li>
          <li @click="category('LEGAL')" :class="{'active' : active === 'LEGAL' } ">
            <span>Legal</span>
            <span>{{stats.legal}}</span>
          </li>
          <li @click="category('INVESTMENTS')"  :class="{'active' : active === 'INVESTMENTS' } ">
            <span>Property Investments</span>
            <span>{{stats.investments}}</span>
          </li>
          <li @click="category('AGENTS')" :class="{'active' : active === 'AGENTS' } ">
            <span>Agents & Brokers</span>
            <span>{{stats.agents}}</span>
          </li>
          <li @click="category('QUESTIONS')" :class="{'active' : active === 'QUESTIONS' } ">
            <span>Questions</span>
            <span>{{stats.questions}}</span>
          </li>
        </ul>
      </div>
      <div class="Ads-card">
        <div class="field" align= "center" v-if="showcheckbox">
          <b-checkbox type="is-black" @input="checked" v-model="notifications"><i>Get notified for replies on this post</i></b-checkbox>
        </div>
        <AdsCard/>
      </div>
    </div>
  </div>
</template>

<script>
import AdsCard from '~/components/static_components/AdsCard.vue'
export default {
  components: {
    AdsCard
  },
  data(){
    return{
      showcheckbox:false,
      notifications: false,
      stats:{},
      active:null,
      filterActive: null
    }
  },
  computed: {
    username(){
      return this.$store.state.auth.currentUser.username
    }
  },

  mounted(){
    if (this.$route.path === "/forum/question" || this.$route.params.id){
      this.showcheckbox = true
    }else{
      this.showcheckbox = false
    }
  },
  methods:{
    checked(){
      if (this.notifications === true){
        console.log("notify me");
        let payload = {
          msg: "notifications turned on",
          isActive: true
        }
        this.$store.commit("notify/success", payload);
        this.$store.dispatch('notify/selfReset')
      } 
    },
    async getStats(){
      this.$axios.setToken(this.storage.token, 'Bearer');
      this.stats = await this.$axios.$get('/forum/stats')
    },

    filters(filter){
      this.filterActive = filter
      console.log("from me ",this.filterActive)
      // debugger
      this.$router.push(`/forum/filter?${filter}`)
    },
    category(value){
      this.active = value
      this.$router.push(`/forum?category=${value}`)
    }
  },
  created(){
    this.active  = this.$route.query.category
    this.filterActive = this.$route.fullPath.replace('/forum/filter?','')
    console.log(this.filterActive)
    this.getStats()
  }

}
</script>

<style>
.tds-forum-categories .active, .tds-forum-filters .active{
  background: #E3E3E3;
}
.tds-forum-filters li:hover{
  background: #E3E3E3;
}
.tds-forum-menu li {
  cursor:pointer
}
.Ads-card .checkbox {
  margin-bottom:20px;
}
</style>
