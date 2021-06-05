<template>
  <div>
    <Agentcard :properties="agents" v-if="agents"/>

    <header class="tds-titles">
      <b>Trending</b> Properties
      <hr>
    </header>
    <div class="section" v-if="trending">
      <Card :properties="trending"></Card>
    </div>
  </div>
</template>
<style scoped>

header hr {
  width: 100px;
  height: 5px;
  margin: 5px auto;
  border-radius: 9999px;
  background-image: linear-gradient(#28f29c, #0cb8e0);
}
header {
  margin-bottom: 30px;
  text-align: center;
}
</style>
<script>
import Card from '~/components/Card'
import Agentcard from '~/components/static_components/cardAgent'

export default {
  components: {
    Card,
    Agentcard
  },
  name: 'FindAgentsPage',
  data() {
    return {
      title: 'Find Agents & Firms - 2Dots Properties',

    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'FindAgentsPage',
          name: 'FindAgentsPage',
          content: 'Find Agents & Firms - 2Dots Properties'
        }
      ]
    }
  },
  methods: {
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', {
        marginTop: m,
        paddingTop: p
      })
    },

    getPosts(){
      this.$store.dispatch('properties/getPost')
    }

  },
  created() {
    this.updateTopSpaces(100, 50)
    this.getPosts()
  },
  beforeDestroy() {
    this.updateTopSpaces(136, 50)
  },
  computed: {
    trending() {
      return this.$store.state.properties.properties.slice(0, 4)
    },
    agents() {
      return this.$store.state.agents.Agents
    }
  }
}
</script>


