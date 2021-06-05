<template>
  <div>
    <div class="singleRequest tds-admin-allusers">
      <header align="center" class="tds-titles">
        <b>All Users</b>
        <hr />
      </header>

      <div class="tds-advertise-cards tds-admin-adverts" v-if="advertise !== {}">
        <div class="tds-advertise-cards-show">
          <div
            class="tds-cards"
            @click="queryPlanRoute('FREE')"
            :style=" queryPlanActive === 'FREE'? 'background:#3E3E3E' : '' "
          >
            <h1 class="tds-card-header">
              FREE
              <br />
            </h1>
            <p class="tds-card-footer">{{advertise.free}}</p>
            <p style="font-size:12px;">Users</p>
          </div>

          <div
            class="tds-cards"
            @click="queryPlanRoute('BASIC')"
            :style=" queryPlanActive === 'BASIC'? 'background:#3E3E3E' : '' "
          >
            <h1 class="tds-card-header">
              BASIC
              <br />
            </h1>
            <p class="tds-card-footer">{{advertise.basic}}</p>
            <p style="font-size:12px;">Users</p>
          </div>


          <div
            class="tds-cards"
            @click="queryPlanRoute('CUSTOM')"
            :style=" queryPlanActive === 'CUSTOM'? 'background:#3E3E3E' : '' "
          >
            <h1 class="tds-card-header">
              CUSTOM
              <br />
            </h1>
            <p class="tds-card-footer">{{advertise.custom}}</p>
            <p style="font-size:12px;">Users</p>
          </div>


          

          <div
            class="tds-cards"
            @click="queryPlanRoute('CLASSIC')"
            :style=" queryPlanActive === 'CLASSIC'? 'background:#3E3E3E' : '' "
          >
            <h1 class="tds-card-header">
              CLASSIC
              <br />
            </h1>
            <p class="tds-card-footer">{{advertise.classic}}</p>
            <p style="font-size:12px;">Users</p>
          </div>

          <div
            class="tds-cards"
            @click="queryPlanRoute('PRO')"
            :style=" queryPlanActive === 'PRO'? 'background:#3E3E3E' : '' "
          >
            <h1 class="tds-card-header">
              PRO
              <br />
            </h1>
            <p class="tds-card-footer">{{advertise.pro}}</p>
            <p style="font-size:12px;">Users</p>
          </div>
        </div>

        <div>
          <form @submit.prevent class="tds-search-agent-admin" validate>
            <b-field>
              <b-input placeholder=" Search... " expanded v-model="term"></b-input>
              <p class="control">
                <button class="button tds-primary-button" @click="searchTerm">Find User</button>
              </p>
            </b-field>
          </form>
        </div>

        <div class="filter-tabs" style="grid-template-columns: 1fr 1fr auto;">
          <b-field>
            <b-select placeholder="Type" v-model="type">
              <option selected disabled value>Account Type</option>
              <option value>select All</option>
              <option value="ESTATE_AGENT">Estate Agent</option>
              <option value="INDIVIDUAL">Individual</option>
              <option value="PROPERTY_OWNER">Property Owner</option>
              <option value="PROPERTY_DEVELOPER">Property Developer</option>
            </b-select>
          </b-field>

          <b-field>
            <input
              class="tds-primary-button input"
              style="background:#CCC;color:#3E3E3E;font-weight:100;width:100%;"
              placeholder="No. of properties"
              v-model="properties"
            />
          </b-field>

          <button type="submit" class="tds-primary-button" @click="searchTerm">FILTER</button>
        </div>
      </div>

      <table class="table is-fullwidth admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>No. of Properties</th>
            <th>Last Logged In</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in allusers" :key="index" >
            <td data-label="Name" class @click="userPage(user.permalink)" v-if="!user.is_super">
              <span>{{user.name}}</span>
                <img v-if="user.verified" src="/img/verified.png" width="15"/>
            </td>
            <td data-label="Type" class v-if="!user.is_super">
              <span>
                {{format(user.account_type)}}
              </span>
            </td>
            <td data-label="No. of Properties" class v-if="!user.is_super">
              <span>{{user.no_of_propertie}}</span>
            </td>
            <td data-label="Last Logged In" class v-if="!user.is_super">
              <span>{{user.last_logged_in}}</span>
            </td>
            <td data-label="Modify" class="modify" v-if="!user.is_super">
              <u @click="edituserPage(user.permalink)">Edit</u> |
              <u>Suspend</u> |
              <u @click="deleteuser(user.permalink)">Delete</u>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
</template>

<script>
import formlocations from '~/components/forms/formlocations'
export default {
  data() {
    return {
      states: formlocations,
      term: '',
      type: '',
      properties: '',
      advertise: {},
      allusers: [],
      pagelinks: {},
      queryPlanActive: ''
    }
  },
  methods: {
    async queryPlan() {
      this.$store.commit('spinner/spin', true)
      this.queryPlanActive = this.$route.query.plan
      console.log(this.$route, 'from query Plan');
          if(this.$route.query.plan !== undefined ){
          console.log('params exists')
          this.$axios.setToken(this.storage.token, 'Bearer');
          let users = await this.$axios.$get(`admin/plans?plan=${this.queryPlanActive}`);
          console.log(users)
          if(users.users.length > 0){
            this.allusers = await users.users;
            console.log(this.allusers, "Users")
          }else{
            this.allusers = []
          }
          this.pagelinks = users.links;
        }else{
          console.log('params dont exists')
          this.$axios.setToken(this.storage.token, 'Bearer');
          let users;
          if(this.$route.fullPath.includes('?')){
            let link = this.$route.fullPath.replace('?', '/users?')
             users = await this.$axios.$get(`${link}`);
          }else{
             users = await this.$axios.$get('admin/users')
          }
          console.log(users)
          if(users.users.length > 0){
            this.allusers = users.users;
            console.log(this.allusers, "Users")
          }else{
            this.allusers = []
          }
          this.pagelinks = users.links;
        }

        this.$store.commit('spinner/spin', false)
    },

    queryPlanRoute(plan){
      this.$router.push(`/admin?plan=${plan}`)
    },
    async getStats() {
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        let stats = await this.$axios.$get('admin/stats')
        this.advertise = stats
      } catch (error) {
        console.dir(error)
      }
    },
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
    userPage(permalink) {
      this.$router.push(`admin/public-user/${permalink}`)
    },
    edituserPage(permalink) {
      this.$router.push(`admin/public-user/${permalink}`)
      this.$store.commit('admin/closemodal', true)
    },
    async nextPage(e) {
      if (e === 0) e = 1

      let users;

      this.$axios.setToken(this.storage.token, 'Bearer')

      if(this.$route.query.plan !== undefined){

        this.$axios.setToken(this.storage.token, 'Bearer');
        users = await this.$axios.$get(`admin/plans?plan=${this.queryPlanActive}&page=${e}`);

      }else{
          if(this.$route.fullPath.includes('?')){
            let link = this.$route.fullPath.replace('?', '/users?')
             users = await this.$axios.$get(`${link}&page=${e}`);
          }else{
             users = await this.$axios.$get(`admin/users?&page=${e}`)
          }

      }
     
      
      this.allusers = users.users
      this.pagelinks = users.links
      console.log(this.pagelinks)
    },
    searchTerm() {
      // this.queryPlanActive = ''
      this.$axios.setToken(this.storage.token, 'Bearer')

      let queryObject ={
        q:this.term,
        account_type:this.type,
        posts_count:this.properties
      }

      if(this.term === '') delete queryObject.q;
      if(this.properties  === '') delete queryObject.posts_count
      if(this.type === '') delete queryObject.account_type;


      this.$router.push({path:'admin', query:queryObject})


      // let users = await this.$axios.get(
      //   `admin/users?q=${this.term}&account_type=${this.type}&posts_count=${
      //     this.properties
      //   }`
      // )
      // this.allusers = users.data.users
      // this.pagelinks = users.data.links
    },
    async deleteuser(permalink) {
      let confirmDelUser = confirm('Do you want to delete this user')

      if (confirmDelUser) {
        try {
          this.$axios.setToken(this.storage.token, 'Bearer')
          await this.$axios.delete(`/users/${permalink}`)

          let load = {
            isActive: true,
            msg: 'Saved changes'
          }
          this.$store.commit('notify/success', load)
          this.$store.dispatch('notify/selfReset')

          this.searchTerm()
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
    }
  },
  created() {
    this.queryPlan()
    this.getStats()
  },
  watch:{
    '$route.fullPath'(){
      this.queryPlan()
    }
  }
}
</script>

<style>
.tds-admin-allusers .tds-advertise-cards .tds-advertise-cards-show{
  grid-template-columns: repeat(5, 1fr);
}
.verified {
  font-size: 5px;
  color: white;
  background-image: linear-gradient(180deg, #28f29c, #0cb8e0);
  padding: 5px;
  border-radius: 100%;
}
.modify u {
  font-size: 14px;
  cursor: pointer;
}
abbr[title] {
  border-bottom: none !important;
  cursor: inherit !important;
  text-decoration: none !important;
}

.tds-admin-allusers tr:nth-child(even) {
  background: #ccc;
}
.filter-tabs span select,
.filter-tabs .select:not(.is-multiple) {
  width: 100% !important;
  color: #3e3e3e;
  height: 2.25em;
  background: #ccc !important;
  width: 100%;
}
.filter-tabs {
  display: grid;
  justify-content: space-between;
  grid-gap: 10px;
  margin-top: 30px;
}
</style>
