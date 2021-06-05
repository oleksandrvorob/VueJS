<template>
  <div>
    <section class="tds-admin-grid">
      <div class="container">
        <div class="admin-details">
          <img src="/img/admin.png" width="100">
          <div>
            <p style="font-size:25px">
              <b>{{details.name}}</b></p>
            <span>email: {{details.email}}</span> <br>
            <span>Logged in : {{details.logged_at}}</span><br>
            <span>Last Login : {{details.last_logged_in }}</span><br>
          </div>
        </div>

        <div class="tds-admin-notification">
            <img src="/img/envelope.png" width="20">
            <n-link to="/" class="tds-primary-button activeButton button">Back to Site</n-link>
            <!-- <img src="/img/notification.png" width="20"> -->

            <button class="tds-primary-button" style="margin-left:5px;" @click="logOut">Logout</button>

        </div>
      </div>
    </section>

    <div class="container">

      <section class="tds-admin-nav">
        <button class="tds-primary-button" @click="changeComponent('Users')" :class="{activeButton: isActive('Users')}">Users</button>
        <button class="tds-primary-button" @click="changeComponent('Listings')" :class="{activeButton: isActive('Listings')}">Listings</button>
        <button class="tds-primary-button" @click="changeComponent('SeoTools')" :class="{activeButton: isActive('SeoTools')}">SEO Tools</button>
        <button class="tds-primary-button" @click="changeComponent('Reports')" :class="{activeButton: isActive('Reports')}">Reports</button>
        <button class="tds-primary-button" @click="changeComponent('Notifications')" :class="{activeButton: isActive('Notifications')}">Inbox</button>
        <button class="tds-primary-button" @click="changeComponent('AllAdmins')" :class="{activeButton: isActive('AllAdmins')}" v-if="details.super_user">All Admins</button>
        <button class="tds-primary-button" @click="changeComponent('Ads')" :class="{activeButton: isActive('Ads')}" v-if="details.super_user">Ads</button>
      </section>

      <section>
          <component :is="columns">

					</component>
      </section>
    </div>
  </div>
</template>

<script>
import Ads from '~/components/adminPages/ads'
import Users from '~/components/adminPages/allUsers'
import Listings from '~/components/adminPages/listings'
import SeoTools from '~/components/adminPages/seoTools'
import Reports from '~/components/adminPages/reports'
import Notifications from '~/components/adminPages/notification'
import AllAdmins from '~/components/adminPages/alladmins'
export default {
  data() {
			return{
        columns : 'Users',
        details:{}
			}
  },
  components: {
    Users,
    Listings,
    Reports,
    Notifications,
    AllAdmins,
    Ads,
    SeoTools,
  },
  methods: {
    async adminData(){
      // admin
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        let result = await this.$axios.$get('admin')
        this.details = result
        this.$store.commit('admin/setAdmin', result)
      } catch (error) {
        console.log(error.message)
      }
    },
    hideSearchBar(payload) {
      this.$store.commit('common/updateIsIndex', payload)
    },
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', {
        marginTop: m,
        paddingTop: p
      })
		},
		changeComponent(value){
			this.columns = value
    },
    isActive(value){
      return this.columns === value
    },

    logOut() {
      this.$store.commit('auth/logOut')
      this.storage.token = ''
      this.$router.push({ path: '/' })
    },
  },
  created() {
    this.adminData()
    this.updateTopSpaces(-10, 0);
    this.hideSearchBar(false);
    this.$store.commit('admin/removeNavbar', true);
  },
  beforeDestroy() {
    this.hideSearchBar(true)
    this.updateTopSpaces(136, 50)
  },
  destroyed(){
    this.$store.commit('admin/removeNavbar', false)
  },

  middleware: ['admin']

  // created(){
  //    window.location.href = "/login"
  // }
}
</script>

<style>

</style>
