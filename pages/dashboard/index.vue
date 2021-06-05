<template>
  <div class="dashboardPage container">

    <p align="center"> Logged In as <strong> {{username}} </strong> </p>
    <div class=" tds-dashboard">
      <nuxt-link
        :to="links.link"
        class="tds-tabs-dashboard"
        v-for=" (links, index) in dashboardLinks"
        :key="index"
      >
        <p>{{links.name}}</p>
      </nuxt-link>
       
    </div>
   <div align="center" style="margin:10px;">
      <button
        @click="logOut()"
        class="button tds-button-gradient tds-color-white tds-button tds-primary-button"
        v-if="loggedin"
      >sign out</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dashboardLinks: [
        { name: 'Post Property', link: '/post-property' },
        { name: 'My Listings', link: '/listings' },
        { name: 'Subscription', link: '/my-subscription' },
        { name: 'Saved Properties ', link: '/saved-properties' }
      ],
      title: 'Dashboard - 2Dots Properties'
    }
  },
  computed: {
    username() {
      return this.$store.state.auth.currentUser.username
    },
    loggedin() {
      return this.$store.getters['auth/getUser']
    }
  },
  methods: {
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', {
        marginTop: m,
        paddingTop: p
      })
    },
    logOut() {
      this.$store.commit('auth/logOut')
      this.storage.token = ''
      this.$router.push({ path: '/' })
    }
  },
  created() {
    this.updateTopSpaces(60, 0)
    var a = this.username
    this.dashboardLinks.push(
      { name: 'My Post Requests', link: '/p/requests/?username=' + a },
      { name: 'My Profile', link: '/agents/' + a }
    )
  },
  middleware: 'auth',
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'Dashboard 2DotsProperties ',
          name: 'Dashboard 2DotsProperties ',
          content: 'Dashboard'
        }
      ]
    }
  }
}
</script>

<style>
.dashboardPage .button {
    border-radius: 8px;
    width: 100%;
    margin: 0;
}
.dashboardPage > p:first-of-type{
  font-size: 20px;
  margin-top:12px;
}
</style>
