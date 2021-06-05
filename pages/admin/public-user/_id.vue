<template>
  <div>
    <section class="tds-admin-grid">
      <div class="container">
        <div class="admin-details">
          <img src="/img/admin.png" width="100" />
          <div>
            <p style="font-size:25px">
              <b>{{details.name}}</b>
            </p>
            <span>email: {{details.email}}</span>
            <br />
            <span>Logged in : {{details.last_logged_in}}</span>
            <br />
            <span>Last Login : {{details.logged_at}}</span>
            <br />
          </div>
        </div>
        <div>
          <a class="button tds-primary-button" @click="goback">back</a>
        </div>
      </div>
    </section>
    <div class="container tds-public-user">
      <div class="edit-user-modal" v-if="showDetails">
        <span class="close-btn-holder">
          <button type="button" class="modal-admin" @click="closeModal">×</button>
        </span>
        <editUserModal />
      </div>

      <div class="agent-profile-flex">
        <section style="display:grid">
          <div class="agent-contact-div">
            <div class="agent-profile-image">
              <img :src="baseUrl+agent.avatar" v-if="agent.avatar" />
              <p v-if="!agent.avatar" class="fakeprofile">{{ fakeprofile()}}</p>
            </div>
            <div class="agent-profile-contact">
              <header class="tds-titles">
                <b>{{agent.company || agent.name}}</b>
              </header>

              <p v-if="edit">
                <img src="/img/agent.png" width="20px" class="agent-contact-icon" />
                <span id="contact">{{format(agent.account_type)}}</span>
              </p>
              <p>
                <img src="/img/phone.png" width="20px" class="agent-contact-icon" />
                <span id="contact">{{agent.phone}}</span>
              </p>
              <p>
                <img src="/img/mail.png" width="20px" class="agent-contact-icon" />
                <span id="contact">{{agent.email}}</span>
              </p>
              <p>
                <img src="/img/location.png" width="20px" class="agent-contact-icon" />
                <span id="contact">{{agent.location}}</span>
              </p>
              <p v-if="agent.whatsapp" class="agent-contact-icon">
                <img src="/img/whatsapp.png" width="20" />
                <span style="padding-left: 9px;">
                  <a
                    :href="`https://api.whatsapp.com/send?phone=${whatsapp}&text=Please tell me more about this - https://2dotsproperties.com/agents/${agent.username}&source=&data=`"
                    target="_blank"
                  >{{agent.whatsapp}}</a>
                </span>
              </p>
            </div>
          </div>

          <div class="suspend-user" v-if="!agent.is_super">
            <a>
              <button class="tds-primary-button" @click="ShowModal">Edit</button>
            </a>
            <a>
              <button class="tds-primary-button" style="background:#696868 !important;">Suspend</button>
            </a>
            <a>
              <button
                class="tds-primary-button"
                style="background: black !important;"
                @click="deleteUser"
              >Delete</button>
            </a>
          </div>

          <div>
            <header class="tds-titles">
              <b>About</b>
              <hr />
            </header>
            <div class="tds-agent-about">
              <p v-html="agent.about" class="long-description"></p>
            </div>
          </div>
        </section>

        <div>
          <div class="column is-full tds-column-grey">
            <p align="left">
              <b>Plan Details</b>
            </p>
          </div>
          <div class="tds-description">
            <table class="table is-fullwidth">
              <tbody v-if="subDetails">
                <tr>
                  <td>
                    <span>Current Plan</span>
                  </td>
                  <td>
                    <b>{{subDetails.plan}}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Expires</span>
                  </td>
                  <td>
                    <b>{{subDetails.expiring_date}}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Regular Listing</span>
                  </td>
                  <td>
                    <b>{{subDetails.max_post}}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Priority Listings</span>
                  </td>
                  <td>
                    <b>{{subDetails.priorities}}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>Boosts</span>
                  </td>
                  <td>
                    <b>{{subDetails.boost}}</b>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />
            <b-field v-if="details.super_user && !agent.is_super">
              <b-select placeholder="Select Plan" expanded v-model="plan">
                <optgroup label="Select">
                  <option value="BASIC">Basic</option>
                  <option value="CUSTOM">Custom</option>
                  <option value="CLASSIC">Classic</option>
                  <option value="PRO">Pro</option>
                </optgroup>
              </b-select>
              <p class="control">
                <button class="tds-primary-button" @click="upgradeuser()">Upgrade</button>
              </p>
            </b-field>

            <div class="suspend-user" style="margin-top:20px">
              <a v-if="details.super_user && !agent.is_super">
                <button class="tds-primary-button" @click="VerifyUser()" v-if="agent.verified  === false">Verify User</button>
                <button class="tds-primary-button" @click="VerifyUser()" v-else>Unverify User</button>
              </a>
              <a v-if="details.super_user && !agent.is_super">
                <button
                  v-if="agent.is_admin"
                  class="tds-primary-button"
                  style="background:#696868 !important;"
                  @click="makeAdmin(false)"
                >Remove Admin</button>

                <button
                  v-if="!agent.is_admin"
                  class="tds-primary-button"
                  style="background:#696868 !important;"
                  @click="makeAdmin(true)"
                >Make Admin</button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div align="center">
        <header class="tds-titles">
          <b>Properties</b> Listed
          <hr />
        </header>
      </div>
      <div class="tds-tab-listings">
        <b-tabs type="is-toggle" expanded @change="getAgentPosts">
          <b-tab-item label="SALE">
            <paginationspinner />
            <propertieslist :properties="posts" v-if="posts" />
          </b-tab-item>
          <b-tab-item label="RENT">
            <paginationspinner />
            <propertieslist :properties="posts" v-if="posts" />
          </b-tab-item>
          <b-tab-item label="SHORTLET">
            <paginationspinner />
            <propertieslist :properties="posts" v-if="posts" />
          </b-tab-item>
          <b-tab-item label="NEW DEVELOPMENTS">
            <paginationspinner />
            <propertieslist :properties="posts" v-if="posts" />
          </b-tab-item>
          <b-tab-item label="PAY IN INSTALLMENTS">
            <paginationspinner />
            <propertieslist :properties="posts" v-if="posts" />
          </b-tab-item>
        </b-tabs>
      </div>

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

      <div align="center">
        <header class="tds-titles">
          <b>Payment</b> History
          <hr />
        </header>
      </div>
      <div>
        <UserHistory />
      </div>
    </div>
  </div>
</template>

<script>
import paginationspinner from '~/components/paginationSpinner'
import UserHistory from '~/components/adminPages/userhistory'
import propertieslist from '~/components/adminPages/propertieslist'
import editUserModal from '~/components/adminPages/edituserModal'
export default {
  components: {
    editUserModal,
    UserHistory,
    propertieslist,
    paginationspinner
  },
  data() {
    return {
      agent: {},
      edit: {},
      baseUrl: process.env.API_URL,
      tab: 0,
      currentPage: 1,
      plan:''
    }
  },

  methods: {
    async VerifyUser(){
      let answer
      this.agent.verified?  answer = confirm('Do you want to unverify this person') : answer = confirm('Do you want to verify this Person')
      if(answer){
        this.$axios.setToken(this.storage.token, 'Bearer');
        await this.$axios.get('admin/verify-agent/'+this.$route.params.id+'?status='+ !this.agent.verified);
        await this.getAgentDetails()
      }

    },
    async upgradeuser(){
      if(this.plan.trim !== ''){
        this.$axios.setToken(this.storage.token, 'Bearer')
        try {
          let result = await this.$axios.$get(`admin/upgrade?username=${this.$route.params.id}&plan=${this.plan}`);
          this.getAgentDetails()
          let load = {
            isActive: true,
            msg: result.status
          }
          this.$store.commit('notify/success', load)
          this.$store.dispatch('notify/selfReset')
          console.log(result)
        } catch (e) {
          console.log(e)
          let load = {
            isActive: true,
            msg: 'Error ocurred'
          }
          this.$store.commit('notify/failed', load)
          this.$store.dispatch('notify/selfReset')
        }
      }else{
        let load = {
            isActive: true,
            msg: 'No plan selected'
          }
          this.$store.commit('notify/failed', load)
          this.$store.dispatch('notify/selfReset')
      }

    },
    async makeAdmin(status) {
      let allow
      status? allow = confirm('make user Admin ??') : allow = confirm('Remove user from Admin ??')

      if (allow) {
        this.$axios.setToken(this.storage.token, 'Bearer')
        try {
          await this.$axios.$get(`admin/make-admin/${this.$route.params.id}?status=${status}`)
          this.getAgentDetails()
        } catch (e) {
          console.log(e)
        }
      }

      //
    },
    async deleteUser() {
      let confirmDelUser = confirm('Do you want to delete this user')

      if (confirmDelUser) {
        try {
          this.$axios.setToken(this.storage.token, 'Bearer')
          await this.$axios.delete(`/users/${this.$route.params.id}`)

          let load = {
            isActive: true,
            msg: 'Saved changes'
          }
          this.$store.commit('notify/success', load)
          this.$store.dispatch('notify/selfReset')

          this.$router.go(-1)

        } catch (error) {
          console.log(error)
          let load = {
            isActive: true,
            msg: 'Error deleting User ......'
          }
          this.$store.commit('notify/failed', load)
          this.$store.dispatch('notify/selfReset')
        }
      }
    },

    goback() {
      this.$router.go(-1)
    },
    format(value) {
      if (value === 'PROPERTY_OWNER') {
        return 'Property Owner'
      } else if (value === 'INDIVIDUAL') {
        return 'Individual'
      } else if (value === 'PROPERTY_DEVELOPER') {
        return 'Developer'
      } else {
        return 'Estate Agent'
      }
    },
    async getAgentDetails() {
      this.$axios.setToken(this.storage.token, 'Bearer')
      try {
        const agent = await this.$axios.$get(`/agents/${this.$route.params.id}`)
        this.agent = agent
        this.show = true
        console.log(this.agent)
      } catch (e) {
        console.log(e)
      }
    },
    fakeprofile() {
      if (this.agent.company) {
        return this.agent.company.slice(0, 1)
      } else if (this.agent.name) {
        return this.agent.name.slice(0, 1)
      } else {
        return '2dots'
      }
    },

    async getAgentPosts(tab) {
      this.$store.commit('agents/Closespinnner', true)

      this.tab = tab

      let payload = {
        tab: this.tab,
        username: this.$route.params.id,
        page: 1
      }
      this.$store.dispatch('agents/getAgentPosts', payload)
    },
    nextPage(e) {
      this.$store.commit('agents/Closespinnner', true)

      let payload = {
        tab: this.tab,
        username: this.$route.params.id,
        page: e
      }

      if (e === 0) payload.page = 1

      this.$store.dispatch('agents/getAgentPosts', payload)
      this.currentPage = this.links.current_page
    },

    ShowModal() {
      this.$store.commit('admin/closemodal', true)
    },
    closeModal() {
      this.$store.commit('admin/closemodal', false)
    },
    hideSearchBar(payload) {
      this.$store.commit('common/updateIsIndex', payload)
    },
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', {
        marginTop: m,
        paddingTop: p
      })
    }
  },
  computed: {
    posts() {
      console.log(this.agent)
      return this.$store.state.agents.currentAgentPosts
    },
    links() {
      return this.$store.state.agents.links
    },
    showDetails() {
      return this.$store.state.admin.modalshown
    },
    whatsapp() {
      if (this.agent.whatsapp) {
        return this.agent.whatsapp.replace('+', '')
      } else {
        return ''
      }
    },
    details() {
      return this.$store.state.admin.admin
    },
    subDetails() {
      return this.$store.state.admin.subDetails
    }
  },
  destroyed() {
    this.$store.commit('admin/removeNavbar', false)
  },
  created() {
    let payload = {
      token: this.storage.token
    }
    console.log(payload)
    this.$store.dispatch('admin/setAdminDetails', payload )
    this.getAgentDetails()
    this.getAgentPosts()
    this.updateTopSpaces(-10, 0)
    this.hideSearchBar(false)
    this.$store.commit('admin/removeNavbar', true)
  },
  beforeDestroy() {
    this.hideSearchBar(true)
    this.updateTopSpaces(136, 50)
    console.log(this.subDetails)
  }
}
</script>

<style>
</style>
