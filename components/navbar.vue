<template >
  <div>
    <nav
      class="navbar header tds-main-nav is-fixed-top"
      :class=" isTransparent "
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <nuxt-link class="navbar-item tds-logo" to="/">
          <img src="/img/tds-logo.png" class="brand">
        </nuxt-link>
      </div>

      <div class="navbar-start" style="margin:auto">
        <nuxt-link to="/about" class="navbar-item">About Us</nuxt-link>

        <!-- <nuxt-link to="/work-with-us" class="navbar-item">Advertise with Us</nuxt-link> -->
        <b-dropdown hoverable align="center">
          <a class="navbar-item" slot="trigger">Advertise with us</a>
          <nuxt-link tabindex="0" class="dropdown-item" to="/promote-property">Property Ads</nuxt-link>
          <nuxt-link tabindex="0" class="dropdown-item" to="/promote-banner">Banner Ads</nuxt-link>
          <nuxt-link tabindex="0" class="dropdown-item" to="/partnered-brands">Partnered Brands</nuxt-link>
        </b-dropdown>

        <nuxt-link to="/agents?q=" class="navbar-item">Find Agents & Firms</nuxt-link>

        <b-dropdown hoverable align="center">
          <a class="navbar-item" slot="trigger">Property Request</a>

          <nuxt-link tabindex="0" class="dropdown-item" to="/p/requests">See Requests</nuxt-link>

          <nuxt-link tabindex="0" class="dropdown-item" to="/property-request">Post Request</nuxt-link>
        </b-dropdown>

        <nuxt-link to="/forum" class="navbar-item">Forum 
        <!-- <span class="comingsoon"> coming soon </span>  -->
        </nuxt-link>
      </div>
      <div class="navbar-end" style="margin:0; ">
        <div class="navbar-item">
          <div class="buttons">
            <nuxt-link to="/login" class="button tds-transparent-btn tds-button" v-if="!loggedin">
              <strong>Log in</strong>
            </nuxt-link>
            <nuxt-link
              class="button tds-button-gradient tds-color-white tds-button"
              style="width:150px; border-radius:999px;"
              v-if="!loggedin"
              to="/sign-up"
            >
              <strong>Sign up</strong>
            </nuxt-link>
            <b-dropdown hoverable align="center" v-if="loggedin">
              <button class="button tds-transparent-btn tds-button" slot="trigger">
                <b-icon icon="account" size="is-medium" type="is-white"></b-icon>
                <strong>
                  <span>Account</span>
                </strong>
              </button>
              <n-link :to="'/agents/'+username" class="dropdown-item"> Logged in as {{username}} </n-link>

              <nuxt-link tabindex="0" class="dropdown-item" to="/post-property">Post Property</nuxt-link>

              <nuxt-link tabindex="0" class="dropdown-item" to="/listings">My Listings</nuxt-link>

              <nuxt-link tabindex="0" class="dropdown-item" to="/my-subscription"> My Subscription</nuxt-link>

              <nuxt-link tabindex="0" class="dropdown-item" to="/saved-properties">Saved</nuxt-link>

              <nuxt-link tabindex="0" class="dropdown-item" :to="'/p/requests/?username=' + username" >My Post Requests</nuxt-link>

              <nuxt-link tabindex="0" class="dropdown-item" :to="'/admin'" v-if="admin">Dashboard</nuxt-link>

              <nuxt-link tabindex="0" class="dropdown-item" :to="'/agents/'+username">My Profile</nuxt-link>
            </b-dropdown>
            <a
              class="button tds-button-gradient tds-color-white tds-button"
              v-if="loggedin"
              @click="logOut()"
            >
              <strong>Log Out</strong>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <transition name="fade">
      <div class="tds-search-bar" v-if="isIndex">
        <search/>
      </div>
    </transition>
  </div>
</template>

<script>
import search from '~/components/searchform'
export default {
  components: {
    search
  },
  data() {
    return {
      tru: false,
      menuItems: [
        {
          title: 'About Us',
          link: '/about'
        },
        {
          title: 'Advertise with Us',
          link: '/work-with-us'
        },
        {
          title: 'Find Agents & Firms',
          link: '/find-agents'
        },
        {
          title: 'Property Request',
          link: '/property-request'
        },
        {
          title: 'Real Estate News',
          link: '/news'
        }
      ]
    }
  },
  computed: {
    isIndex() {
      return this.$store.state.common.isIndex
    },
    hasSticky() {
      return this.$store.state.common.hasSticky
    },
    isTransparent() {
      return {
        'tds-transparent-header':
          this.$store.state.common.isTransparent && this.hasSticky == true
      }
    },
    loggedin() {
      return this.$store.getters['auth/getUser']
    },
    username() {
      return this.$store.state.auth.currentUser.username
    },
    admin(){
      if (this.loggedin){
        let token = this.storage.token
        let base64Url = token.split('.')[1]
        let user = JSON.parse(atob(base64Url))
        return user.admin
      }else{
        return false
      }
    }
  },
  methods: {
    logOut() {
      this.$store.commit('auth/logOut')
      this.storage.token = ''
      this.$router.push({ path: '/' })
    },
    goToSignup() {
      this.$router.push({ path: '/sign-up' })
    }
  },
  created(){
    console.log(this.admin, "Menu")
  }
}
</script>


<style>
</style>



