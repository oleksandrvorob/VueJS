<template>
  <div>
    <div>
      <messageContent v-if="showMessage" :messagecontent="messagedetails" />
    </div>

    <div>
      <div class="singleRequest tds-admin-allusers">
        <header align="center" class="tds-titles">
          <b>All Inbox</b>
          <hr />
        </header>
        <div>
          <button
            class="button"
            @click="changeComponent('CONTACT')"
            :class="{ 'is-black': currentComponent === 'CONTACT'}"
          >Contact</button>
          <button
            class="button"
            @click="changeComponent('VERIFY')"
            :class="{ 'is-black': currentComponent === 'VERIFY'}"
          >Verification Requests</button>

          <button
            class="button"
            @click="changeComponent('ALL_VERIFIED')"
            :class="{ 'is-black': currentComponent === 'ALL_VERIFIED'}"
          >All Verified Users</button>
        </div>

        <div>
          <form @submit.prevent class="tds-search-agent-admin" validate>
            <b-field>
              <b-input placeholder=" Search... " expanded v-model="term"></b-input>
              <p class="control">
                <button class="button tds-primary-button" @click="searchTerm">Find Email</button>
              </p>
            </b-field>
          </form>
        </div>

        <div v-if="currentComponent === 'CONTACT'">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Message</th>
                <th>Date</th>
                <th>Modify</th>
              </tr>
            </thead>

            <tbody v-if="contacts.length !== 0">
              <tr v-for="(messages, index) in contacts" :key="index">
                <td data-label="Name" class @click="viewMessage(index)">
                  <span>{{messages.name}}</span>
                </td>
                <td data-label="Email" class>
                  <span>{{messages.email}}</span>
                </td>
                <td data-label="Phone Number" class>
                  <span>{{messages.phone}}</span>
                </td>
                <td data-label="Message" class @click="viewMessage(index)">
                  <span
                    v-if="messages.body"
                  >{{messages.body.length &lt; 20 ? messages.body: messages.body.slice(0,36)+"..."}}</span>
                </td>
                <td data-label="Date" class>{{messages.created_at}}</td>
                <td data-label="Date" class>
                  <u @click="deleteMessage(messages)">delete</u>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="currentComponent === 'ALL_VERIFIED'">
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
            <tbody v-if="contacts.length !== 0">
              <tr v-for="(user, index) in contacts" :key="index">
                <td>
                  {{user.name}}
                  <!-- <span class="verified" v-if="user.verified">✔</span> -->
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
                  <u @click="view(user.permalink)">Suspend</u> |
                  <u @click="deleteAdmin(user.permalink, index)">Delete</u>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="currentComponent === 'VERIFY'">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Date</th>
                <th>Verify</th>
              </tr>
            </thead>

            <tbody v-if="contacts.length !== 0">
              <tr v-for="(contact, index) in contacts" :key="index">
                <td data-label="Name" class @click="viewVerificationForm(contact)">
                  <span>{{contact.name}}</span>
                </td>
                <td data-label="Email" class>
                  <span>{{contact.email}}</span>
                </td>
                <td data-label="Phone Number" class>
                  <span>{{contact.phone}}</span>
                </td>
                <td data-label="Date" class>{{contact.created_at}}</td>
                <td data-label="Date" class>
                  <span @click="viewVerificationForm(contact)"> <u>verify user</u></span> 
                  <!-- |
                  <span @click="deleteVerification(contact)"><u>Delete</u></span> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <div class="container find-agents" v-if="pagelinks !== {}">
            <b-pagination
              :total="pagelinks.total_entries"
              :current.sync="pagelinks.current_page"
              :order="'is-centered'"
              :simple="false"
              :rounded="false"
              :per-page="pagelinks.per_page"
              @change="nextPage"
            ></b-pagination>
          </div>
        </div>

        <b-modal :active.sync="viewVerificationFormModal">
          <verificationView :contact="contact"/>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import messageContent from '~/components/adminPages/messageContent'
import verificationView from './verificationView'
export default {
  components: {
    messageContent,
    verificationView
  },
  data() {
    return {
      contacts: [],
      messagedetails: {},
      pagelinks: {},
      currentComponent: 'CONTACT',
      viewVerificationFormModal:false,
      term:'',
      contact:{}
    }
  },
  methods: {
    // async deleteVerification(contact){
    //   this.$axios.setToken(this.storage.token, 'Bearer') 
    //   this.$axios.delete()
    // },
    async searchTerm(){
      this.$axios.setToken(this.storage.token, 'Bearer')

      let contacts;

      switch (this.currentComponent) {
        case 'CONTACT':
          contacts = await this.$axios.$get(`/contacts?&q=${this.term}`)
          console.log('CONTACT');
          break
        case 'ALL_VERIFIED':
          contacts = await this.$axios.$get(`admin/verified-agents&q=${this.term}`)
          console.log('ALL_VERIFIED');
          break
        default:
          contacts = await this.$axios.$get(`/verify_users?&q=${this.term}`)
          console.log(this.currentComponent);
          break
      }

      this.contacts = contacts.form_posts
      this.pagelinks = contacts.links
      console.log(contacts)
    },
    async allverified() {
      this.$axios.setToken(this.storage.token, 'Bearer')
      let contacts = await this.$axios.get(`admin/verified-agents`)
      this.contacts = contacts.data.users
      this.pagelinks = contacts.data.links
      console.log(contacts)
    },
    async changeComponent(moveTothisComponent) {
      this.currentComponent = moveTothisComponent
      if (moveTothisComponent === 'VERIFY') {
        this.getVerify()
      } else if (moveTothisComponent === 'ALL_VERIFIED') {
        this.allverified()
      } else {
        this.getInbox()
      }
    },
    format(agent_type) {
      if (agent_type === 'ESTATE_AGENT') {
        return 'Estate Agent'
      } else if (agent_type === 'PROPERTY_DEVELOPER') {
        return 'Property Developer'
      } else if (agent_type === 'INDIVIDUAL') {
        return 'individual'
      } else {
        return 'Property Owner'
      }
    },
    view(e) {
      this.$router.push(`/admin/public-user/${e}`)
    },
    async deleteMessage(messages) {
      let confirmdelMessage = confirm(
        'Are you sure you want to delete this Message ?'
      )
      if (confirmdelMessage) {
        try {
          this.$axios.setToken(this.storage.token, 'Bearer')
          await this.$axios.$delete(messages.delete_url)
          this.getInbox()
        } catch (error) {
          console.log(error)
        }
      }
    },
    viewVerificationForm(contact){
      this.contact = contact
      this.viewVerificationFormModal = true
    },
    viewMessage(i) {
      this.$store.commit('admin/OpenMessage', true)
      this.messagedetails = this.contacts[i]
      console.log(i)
    },
    async getVerify() {
      this.$axios.setToken(this.storage.token, 'Bearer')
      let contacts = await this.$axios.$get('/verify_users')
      this.contacts = contacts.requests
      this.pagelinks = contacts.links
      console.log(this.contacts)
    },
    async getInbox() {
      this.$axios.setToken(this.storage.token, 'Bearer')
      let contacts = await this.$axios.$get('/contacts')
      this.contacts = contacts.form_posts
      this.pagelinks = contacts.links
      console.log(contacts)
    },
    async nextPage(e) {
      
      if (e === 0) e = 1

      this.$axios.setToken(this.storage.token, 'Bearer')

      let contacts;

      switch (this.currentComponent) {
        case 'CONTACT':
          contacts = await this.$axios.$get(`/contacts?&page=${e}`)
          console.log('CONTACT')
          break
        case 'ALL_VERIFIED':
          contacts = await this.$axios.$get(`admin/verified-agents&page=${e}`)
          console.log('ALL_VERIFIED')
          break
        default:
          contacts = await this.$axios.$get(`/contacts?&page=${e}`)
          console.log(this.currentComponent)
          break
      }

      this.contacts = contacts.form_posts
      this.pagelinks = contacts.links
      console.log(contacts)
    }
  },
  computed: {
    showMessage() {
      return this.$store.state.admin.showMessage
    }
  },
  created() {
    this.getInbox()
  }
}
</script>

<style>
</style>
