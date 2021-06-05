<template>
  <div class="has-navbar-fixed-top" :class="{noscroll : noscroll }">
    <notification />
    <spinner />
    <mobileNavbar class="tds-mobile-navbar" v-if="!hideNavBar"/>
    <searchModal />
    <navbar class="tds-desktop-navbar" v-if="!hideNavBar" />
    <section
      class="main-content columns"
      :style="{ marginTop: topSpaces.marginTop + 'px', paddingTop: topSpaces.paddingTop + 'px' }"
    >
      <div class="column">
        <nuxt />
      </div>
    </section>
    <footersection v-if="!hideNavBar"/>
  </div>
</template>

<style scoped>
.two-dots-center {
  margin: 0 auto;
}
</style>

<script>
import footersection from './footer.vue'
import navbar from '~/components/navbar.vue'
import mobileNavbar from '~/components/mobileNavbar'
import notification from '~/components/notification'
import spinner from '~/components/spinner'
import searchModal from '~/components/searchModal'

var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/5d6922a6eb1a6b0be60a2aa8/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();

export default {
  data() {
    return {}
  },
  components: {
    navbar,
    footersection,
    notification,
    mobileNavbar,
    spinner,
    searchModal
  },
  computed: {
    topSpaces() {
      return this.$store.state.common.topSpaces
    },
    noscroll() {
      console.log(this.$store.state.nav.noscroll)
      return this.$store.state.nav.noscroll
    },
     hideNavBar() {
      return this.$store.state.admin.hideNavBar
    }
  },
  methods: {
    changeNavBg() {
      if (window.scrollY > 100) {
        this.$store.commit('common/updateIsTransparent', false)
      } else {
        this.$store.commit('common/updateIsTransparent', true)
      }
    },
    verifyCurrentValidity() {
      let jwt = this.storage.token
      if (jwt) {
        this.$store.commit('auth/parseJwt', this.storage.token)
        this.$store.commit('auth/checkValidity')
      } else {
        this.$store.commit('auth/logOut')
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.changeNavBg)
    this.verifyCurrentValidity()
  },
  destroyed() {
    window.removeEventListener('scroll', this.changeNavBg)
  },
  created() {},
  watch: {
    $route: {
      handler() {
        this.verifyCurrentValidity()
      }
    }
  }
}
</script>

