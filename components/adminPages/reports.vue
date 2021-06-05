<template>
  <div>
    <header align="center" class="tds-titles">
      <b>Reports</b>
      <hr>
    </header>
      <div class="singleRequest tds-admin-allusers">

       <div>
      <!-- <form @submit.prevent="searchTerm()" class="tds-search-agent-admin" validate>
        <b-field>
          <b-input placeholder=" Search... " expanded v-model="term"></b-input>
          <p class="control">
            <button class="button tds-primary-button">Find Reports</button>
          </p>
        </b-field>
      </form> -->
    </div>

    <div class="filter-tabs" style="grid-template-columns: 1fr 1fr auto;display:none">
      <b-field>
        <b-select placeholder="Forum/Property" v-model="reportissue">
          <option value selected disabled>Select</option>
          <option value="Forum">Forum</option>
          <option value="Property">Property</option>
        </b-select>
      </b-field>

      <b-field>
        <b-select placeholder="State" v-if="reportissue === 'Property'">
          <option v-for="(option, i) in states" :value="option.state" :key="i">{{ option.state }}</option>
        </b-select>
      </b-field>


      <button type="submit" class="tds-primary-button">FILTER</button>
    </div>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Reported Date</th>
          <th>Name</th>
          <th>State</th>
          <th>Report Count</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(report, index) in reports" :key="index">
          <td data-label="Reported Date">
            {{report.reported_date}}
          </td>
          <td data-label="Name" class>
            <span> {{report.title.length  &lt; 20 ? report.title : report.title.slice(0,40)+"..."}}</span>
          </td>
          <td data-label="State" class>
            <span>{{report.state}}</span>
          </td>
          <td data-label="Report_count" class>
            <span>{{report.report_count}}</span>
          </td>
          <td data-label="Status" class="modify">
            <u @click="view(report.permalink)"> View</u> |
            <u @click="deleteReport(report.permalink, index)">Delete</u>
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
  data(){
    return{
      term:'',
      reports:[],
      states: formlocations,
      reportissue:'',
      reportslink:{}
    }
  },
  methods:{
    format(x){
      if(x === "ESTATE_AGENT" ){
        return "Estate Agent"
      }else if(x === "PROPERTY_DEVELOPER"){
        return "Property Developer"
      }else if(x === "INDIVIDUAL"){
        return "individual"
      }else{
        return "Property Owner"
      }
    },
    view(e){
      this.$router.push(`/properties/${e}`)
    },
    async searchTerm(e){
      this.$axios.setToken(this.storage.token, 'Bearer')
      let reports = await this.$axios.get(`admin/reports?q=${this.term}`)
      this.reports = reports.data.reports
      this.reportslink = reports.data.links
    },
    async deleteReport(link, index){
      let del = confirm("Are you sure you want to DELETE this Property?");
      try{
        if (del === true){
          this.$axios.setToken(this.storage.token, 'Bearer')
          let url = link
          const deletePost = await this.$axios.$delete(url)
          this.reports.splice(index, 1)
        }
      }catch(e){
        console.log(e)
      }
    },
    async getReports(){
      this.$axios.setToken(this.storage.token, 'Bearer')
      let reports = await this.$axios.get('admin/reports')
      this.reports = reports.data.reports
      this.reportslink = reports.data.links
    },
     async nextPage(e) {
      if(e === 0) e = 1

      this.$axios.setToken(this.storage.token, 'Bearer')
      let listings = await this.$axios.get(`admin/reports?page=${e}`)
      this.reports = reports.data.reports
      this.reportslink = reports.data.links

    },
  },
  created(){
    this.getReports()
  }
}
</script>

<style>
</style>
