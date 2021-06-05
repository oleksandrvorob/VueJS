<template>
  <div class="tds-advertise-cards tds-admin-adverts">
    <header align="center" class="tds-titles">
      <b>Listings</b>
      <hr />
    </header>

    <div class="singleRequest tds-admin-allusers">

       <div>
      <form @submit.prevent="searchTerm()" class="tds-search-agent-admin" validate>
        <b-field>
          <b-input placeholder=" Search... " expanded v-model="term"></b-input>
          <p class="control">
            <button class="button tds-primary-button">Find Listings</button>
          </p>
        </b-field>
      </form>
    </div>

    <div class="filter-tabs" style="grid-template-columns: 1fr 1fr 1fr auto;">
      <b-field>
        <b-select placeholder="Type" v-model="type">
          <option value="" selected>Select Purpose</option>
          <option value="FLAT OR APARTMENT">Flat/Apartment</option>
          <option value="LAND">Land</option>
          <option value="HOUSE">House</option>
          <option value="COMMERCIAL">Commercial Property</option>
        </b-select>
      </b-field>

      <div class="field-body">
            <div class="field">
              <div class="control is-expanded">
                <span class="select is-fullwidth">
                  <select @change="hello" required>
                    <option selected value>Select state</option>
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

      <b-field>
        <b-select placeholder="Locality" v-model="locateArea">
          <option selected value="">Select Area</option>
          <option
              v-for="(lga , index) in states[currentIndex].area"
              :key="index"
            >{{lga | capitalize}}</option>
        </b-select>
      </b-field>

      <button type="submit" class="tds-primary-button" @click="searchTerm">FILTER</button>
    </div>

    <table class="table is-fullwidth admin-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Type </th>
          <th>Locality</th>
          <th>State</th>
          <th>Modify</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(lists, index) in allListings" :key="index">
          <td data-label="Title" class @click="view(lists.permalink)">
            <span> {{lists.title.length  &lt; 20 ? lists.title : lists.title.slice(0,40)+"..." }} </span>
          </td>
          <td data-label="Type" class>
            <span>{{format(lists.type_of_property)}}</span>
          </td>
          <td data-label="Locality" class>
            <span>{{lists.locality}}</span>
          </td>
          <td data-label="State" class>
            <span>{{lists.state}}</span>
          </td>
          <td data-label="Modify" class="modify">
            <u @click="edit(lists.permalink)">Edit</u> |
            <u>Suspend</u> |
            <u @click="deleteProperty(lists.permalink)">Delete</u>
          </td>
          <td data-label="Status" class="reported">
            <span v-if="lists.status"> Reported </span> 
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div class="container find-agents">
      <b-pagination
        :total="allListingslinks.total_entries"
        :order="'is-centered'"
        :simple="false"
        :rounded="false"
        :per-page="allListingslinks.per_page"
        :current.sync="allListingslinks.current_page"
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
      term:"",
      type:'',
      states: formlocations,
      state:'',
      locality: '',
      locateArea:'',
      area: [],
      currentIndex: 0,
      allListings:[],
      allListingslinks:{}
    }
  },
  methods: {
    format(value){
      if( value === "FLAT OR APARTMENT"){
        return 'Flat/Apartment'
      }else if(value === "LAND"){
        return "Land"
      }else if(value === "HOUSE"){
        return "House"
      }else{
        return "Commercial"
      }

    },
    async deleteProperty(index){
      let del = confirm("Are you sure you want to DELETE this?");
      try{
        if (del === true){
          this.$axios.setToken(this.storage.token, 'Bearer')
          let url = this.properties[index].permalink
          const deletePost = await this.$axios.$delete(url)
          this.$store.commit('agents/deletePost', index)
        }
      }catch(e){
        console.log(e)
      }
      
    },
    edit(link){
      let route = this.$router.resolve({ path: `/edit/${link}` });
      window.open(route.href, '_blank');
    },
    async searchTerm(){
      try {
          this.$axios.setToken(this.storage.token, 'Bearer')
          let listings = await this.$axios.get(`admin/all-posts?type_of_property=${this.type}&state=${this.state}&lga=${this.locateArea}&q=${this.term}`)
          this.allListings = listings.data.posts
          this.allListingslinks = listings.data.links
      } catch (e) {
        console.log(e)
      }
    },
    view(link){
      this.$router.push(`/properties/${link}`)
    },
    async getAllListings() {
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        let listings = await this.$axios.get('admin/all-posts')
        this.allListings =  listings.data.posts
        this.allListingslinks = listings.data.links
      } catch (error) {
        console.dir(error)
      }
    },
    hello(event) {
      this.state = event.target.value
      let index; 
      if(!event.target.selectedIndex){
        index = 0
        debugger
      }else{
        index = event.target.selectedIndex - 1
        debugger
      }  
      
      
      console.log(index)
      this.currentIndex = index
      this.locality ='';
      this.area = []
    },
    async nextPage(e) {
      if(e === 0) e = 1

      this.$axios.setToken(this.storage.token, 'Bearer')
      let listings = await this.$axios.get(`admin/all-posts?type_of_property=${this.type}&state=${this.state}&lga=${this.locateArea}&q=${this.term}&page=${e}`)
      this.allListings =  listings.data.posts
      this.allListingslinks = listings.data.links

    },
  },
  filters: {
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  created(){
    this.getAllListings()
  }
}
</script>

<style>
.tds-admin-adverts .tds-cards {
  background: #50b9e1;
}
.tds-admin-grey-box .tds-cards {
  background: transparent !important;
  color: #696868;
  border: 1px solid #c9c9c9;
}
.tds-admin-grey-box .tds-card-footer {
  font-size: 26px !important;
}
.tds-period-admin {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.reported{
  color:#FA6980;
}
</style>
