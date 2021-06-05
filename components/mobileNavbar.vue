<template>
  <div>
    <b-modal :active.sync="isImageModalActive" class="slide-down">
      <div class style="margin:auto">
        <nuxt-link to="/" class="navbar-item tds-logo">
          <img src="/img/tds-logo.png" class="modal-logo" @click="isImageModalActive = false">
        </nuxt-link>
        <nuxt-link to="/about" class="navbar-item">
          <span @click="isImageModalActive = false">About Us</span>
        </nuxt-link>
        <b-dropdown aria-role="list">
          <div class="navbar-item" slot="trigger">
            <nuxt-link to="#" class="navbar-item">
              <span>Advertise with us</span>
            </nuxt-link>
          </div>
          <b-dropdown-item aria-role="listitem" @click="isImageModalActive = false">
            <nuxt-link to="/promote-property">Property Ads</nuxt-link>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem" @click="isImageModalActive = false">
            <nuxt-link to="/promote-banner">Banner Ads</nuxt-link>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem" @click="isImageModalActive = false">
            <nuxt-link to="/partnered-brands">Partnered Brands</nuxt-link>
          </b-dropdown-item>
        </b-dropdown>

        <nuxt-link to="/agents?q=" class="navbar-item">
          <span @click="isImageModalActive = false">Find Agents &amp; Firms</span>
        </nuxt-link>

        <b-dropdown aria-role="list">
          <div class="navbar-item" slot="trigger">
            <nuxt-link to="#" class="navbar-item">
              <span>Property Request</span>
            </nuxt-link>
          </div>
          <b-dropdown-item aria-role="listitem" @click="isImageModalActive = false">
            <nuxt-link to="/p/requests" class>
              <span>See Requests</span>
            </nuxt-link>
          </b-dropdown-item>
          <b-dropdown-item aria-role="listitem" @click="isImageModalActive = false">
            <nuxt-link to="/property-request" class>
              <span>Post Requests</span>
            </nuxt-link>
          </b-dropdown-item>
        </b-dropdown>
        <nuxt-link to="/forum" class="navbar-item nuxt-link-exact-active nuxt-link-active">
          <span @click="isImageModalActive = false">Forum</span>
        </nuxt-link>
      </div>
    </b-modal>

    <div>
      <nav
        class="navbar header tds-main-nav mobile-nav tds-is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            @click="isImageModalActive = true"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
          <nuxt-link class="navbar-item tds-logo" to="/">
            <img src="/img/tds-logo.png" class="brand">
          </nuxt-link>
        </div>

        <div class="navbar-end" style="margin:0; ">
          <div class="navbar-item">
            <div class="buttons">
              <img src="/img/search_icon.png" width="25px" @click="searchModal">
              <nuxt-link to="/login" class="button tds-transparent-btn tds-button" v-if="!loggedin">
                <strong>Log in</strong>
              </nuxt-link>
              <nuxt-link
                to="/sign-up"
                class="button tds-button-gradient tds-color-white tds-button"
                v-if="!loggedin"
              >
                <strong>sign up</strong>
              </nuxt-link>

              <nuxt-link
                to="/dashboard"
                class="button tds-transparent-btn tds-button tds-dashboard-icon-mobile"
                v-if="loggedin"
              >
                <b-icon icon="account" size="is-medium" type="is-white"></b-icon>
              </nuxt-link>

              <b-dropdown
                align="center"
                v-if="loggedin"
                aria-role="list"
                class="tds-dashboard-icon"
              >
                <button class="button tds-transparent-btn tds-button" slot="trigger">
                  <b-icon icon="account" size="is-medium" type="is-white"></b-icon>
                  <strong>
                    <span>Account</span>
                  </strong>
                </button>
                <b-dropdown-item>
                  <nuxt-link to="/post-property">Post Property</nuxt-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <nuxt-link to="/listings">My Listings</nuxt-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <nuxt-link to="/my-subscription">Subscription</nuxt-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <nuxt-link to="/saved-properties">Saved</nuxt-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <nuxt-link :to="'/p/requests/?username=' + username"> My Post Requests</nuxt-link>
                </b-dropdown-item>
                <b-dropdown-item>
                   <nuxt-link :to="'/agents/'+username">My Profile</nuxt-link>
                </b-dropdown-item>
              </b-dropdown>

              <!-- <a
                @click="logOut()"
                class="button tds-button-gradient tds-color-white tds-button"
                v-if="loggedin"
              >sign out</a> -->
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>

export default {
  components:{
  },
  data() {
    return {
      width: null,
      isImageModalActive: false
    }
  },
  computed: {
    loggedin() {
      return this.$store.getters['auth/getUser']
    },
    username(){
      return this.$store.state.auth.currentUser.username
    },
  },
  methods:{
    searchModal(){
       this.$store.commit('nav/toggleModal')
    },

    logOut() {
      this.$store.commit('auth/logOut')
      this.storage.token = ''
      this.$router.push({ path: '/' })
    },
  }
}
</script>

<style>
.tds-search-popup{
  position:fixed;
  z-index: 5;
  top:0;
  height: 100vh;
  background: rgb(0, 0, 0);
  width:100%;
  padding-top:30vh; 
}
.tdssearchdisplay{
  display: none;
}
</style>


               