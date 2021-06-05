<template>
  <div>
    <header align="center" class="tds-titles">
      <b>Admins</b>
      <hr />
    </header>
    <!-- <button class="button" @click="allAdmin('ALL_ADMIN')" :class="{ 'is-black': currentComponent === 'ALL_ADMIN'}">
    All Admin
    </button>-->
    <!-- <button class="button"  @click="allAdmin('ALL_VERIFIED')" :class="{ 'is-black': currentComponent === 'ALL_VERIFIED'}"> All Verified Users </button> -->
    <div class="singleRequest tds-admin-allusers">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>No Of Properties</th>
            <th>Last Logged In</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in admins" :key="index">
            <td>
              {{user.name}}
              <img v-if="user.verified" src="/img/verified.png" width="15" />
            </td>
            <td>
              <span>{{format(user.account_type)}}</span>
            </td>
            <td>
              <span>{{user.no_of_propertie}}</span>
            </td>
            <td>
              <span>{{user.last_logged_in}}</span>
            </td>
            <td>
              <u @click="view(user.permalink)">View</u> |
              <!-- <u @click="view(user.permalink)">Suspend</u> | -->
              <u @click="RemoveAdmin(user.permalink, index)">Remove</u>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container find-agents">
      <b-pagination
        :current.sync="reportslink.current_page"
        :total="reportslink.total_entries"
        :order="'is-centered'"
        :simple="false"
        :rounded="false"
        :per-page="reportslink.per_page"
        @change="nextPage($event)"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import formlocations from '~/components/forms/formlocations'

export default {
  data() {
    return {
      term: '',
      admins: [],
      states: formlocations,
      reportissue: '',
      reportslink: {}
    }
  },
  methods: {
    format(x) {
      if (x === 'ESTATE_AGENT') {
        return 'Estate Agent'
      } else if (x === 'PROPERTY_DEVELOPER') {
        return 'Property Developer'
      } else if (x === 'INDIVIDUAL') {
        return 'individual'
      } else {
        return 'Property Owner'
      }
    },
    view(e) {
      this.$router.push(`/admin/public-user/${e}`)
    },
    async searchTerm(e) {
      this.$axios.setToken(this.storage.token, 'Bearer')
      let reports = await this.$axios.get(`admin/all/?q=${this.term}`)
      console.log(reports)
      this.admins = reports.data.users
      this.reportslink = reports.data.links
    },
    async RemoveAdmin(link) {
      let allow = confirm('Remove user from Admin ??')

      if (allow) {
        this.$axios.setToken(this.storage.token, 'Bearer')
        try {
          await this.$axios.$get(`admin/make-admin/${link}?status=${false}`)
          let load = {
            isActive: true,
            msg: 'Saved changes'
          }
          this.$store.commit('notify/success', load)
          this.$store.dispatch('notify/selfReset')

          this.searchTerm()
        } catch (e) {
          let load = {
            isActive: true,
            msg: 'Error deleting User ......'
          }
          this.$store.commit('notify/failed', load)
          this.$store.dispatch('notify/selfReset')
        }
      }
    },
    async getAdmins() {
      this.$axios.setToken(this.storage.token, 'Bearer')
      let reports = await this.$axios.get('admin/all')
      this.admins = reports.data.users
      this.reportslink = reports.data.links
    },
    async nextPage(e) {
      if (e === 0) e = 1

      this.$axios.setToken(this.storage.token, 'Bearer')
      let listings = await this.$axios.get(`admin/all?page=${e}`)
      this.admins = reports.data.users
      this.reportslink = reports.data.links
    }
  },
  created() {
    this.getAdmins()
  }
}
</script>

<style>
</style>
