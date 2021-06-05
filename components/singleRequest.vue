<template>
  <div class="singleRequest">
    <transition name="fade">
      <modal/>
    </transition>
    <form @submit.prevent="Search" validate>
      <b-field>
        <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <span class="select is-fullwidth">
                  <select @change="hello" required>
                    <option selected disabled>Select state</option>
                    <option
                      v-for="(states, index) in states"
                      :value="states.state"
                      :key="index"
                    >{{states.state | capitalize}}</option>
                  </select>
                </span>
              </div>
            </div>
          </div>
        <b-select
          placeholder="Choose Locality"
          expanded
          v-model="locality"
          class="tds-margin-search-filter"
        >
          <option value disabled>Choose Locality</option>
          <option value="">All Locality</option>
          <option
            v-for="(lga , index) in states[currentIndex].area"
            :key="index"
          >{{lga | capitalize}}</option>
        </b-select>
        <p class="control">
          <button class="tds-primary-button is-static">Search</button>
        </p>
      </b-field>
    </form>

    <div>
      <!-- <b-table :data="data" :columns="columns"> </b-table> -->

      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Date</th>
            <th>Purpose</th>
            <th>Type Of Property</th>
            <th>Budget</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(post, index) in postRequests"
            :key="index"
            @click="toggleModal(post.permalink, index)"
          >
            <td data-label="Date" class>
              <span>{{post.created_at }}</span>
            </td>
            <td data-label="Purpose" class>
              <span>{{post.purpose}}</span>
            </td>
            <td data-label="Type Of Property" class>
              <span>{{post.type | lowerCapitalize}}</span>
            </td>
            <td data-label="Budget" class>
              <span>{{post.budget | currency}}</span>
            </td>
            <td data-label="Location" class>
              <span>{{post.location}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-pagination
      :total="total"
      :current.sync="current"
      :order="'is-centered'"
      :simple="false"
      :rounded="false"
      :per-page="perPage"
      @change="nextPage($event)"
    ></b-pagination>
  </div>
</template>

<script>
import formData from '~/components/forms/formlocations.json'
import modal from '~/components/popUpSeeRequest'
export default {
  components: {
    modal
  },
  data() {
    return {
      states: formData,
      state: '',
      locality: '',
      street: '',
      total: 0,
      current: 1,
      perPage: 0,
      currentIndex: 0,
      postRequests: [],
      queryParam: {}
    }
  },
  methods: {
    nextPage(e) {
      this.queryParam.page = e

      this.$router.push({ path: this.$route.fullPath, query: this.queryParam })
      window.scrollTo(0,0)
      console.log(this.$route.fullPath+'&?page='+e)
    },
    hello(event) {
      this.state = event.target.value
      let index = event.target.selectedIndex - 1
      this.currentIndex = index

      this.locality = ''
      this.area = []
    },
    Search() {
      if (this.state !== '') this.queryParam.state = this.state
      if (this.locality !== '') this.queryParam.lga = this.locality

      this.removeQry()
      this.$router.push({ path: '/p/requests', query: this.queryParam })
    },

    removeQry(){
      if (this.state == '') delete  this.queryParam.state
      if (this.locality == '') delete  this.queryParam.lga
    },

    
    toggleModal(url, index) {
      let payload = {
        url: url,
        token: this.storage.token
      }

      let fullPath = this.$route.fullPath

      this.$router.push({ path: fullPath, query: { url, modal: true } })
      this.$store.commit('nav/seeRequest')
      this.$store.dispatch('nav/getRequestDetails', payload)
      this.$store.commit('nav/setIndex', index)
    },
    async getPostRequests() {
      try {
        let url = this.$route.fullPath
        this.$axios.setToken(this.storage.token, 'Bearer')
        const postRequests = await this.$axios.get(url)
        this.postRequests = postRequests.data.requests
        this.total = postRequests.data.links.total_entries
        this.perPage = postRequests.data.links.per_page
        this.current = postRequests.data.links.current_page
        console.log(postRequests)
      } catch (e) {
        console.log(e)
      }
    }
  },
  filters: {
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    lowerCapitalize(value) {
      var a = value.split(' ')
      if (a.length <= 1) {
        return a[0].charAt(0).toUpperCase() + value.slice(1).toLowerCase()
      } else if (a.length > 1) {
        var b = value.split(' ')

        for (var i = 0; i < b.length; i++) {
          b[i] = b[i][0].toUpperCase() + b[i].slice(1).toLowerCase()
        }

        return b.join(' ')
      }
    }
  },
  created() {
    this.getPostRequests()

    if (this.$route.query.modal) {
      this.$store.commit('nav/seeRequest')
    }
    if (this.$route.query.url) {
      let payload = {
        url: this.$route.query.url,
        token: this.storage.token
      }

      this.$store.dispatch('nav/getRequestDetails', payload)
      console.log(this.$route)
    }
  },

  watch: {
    '$route.fullPath'(){
      this.getPostRequests()
    }
  }
}
</script>

<style>
@media screen and (max-width: 400px) {
  .singleRequest table thead tr th:first-of-type,
  .singleRequest table tbody tr td:first-of-type {
    display: none;
  }
}
</style>




        
