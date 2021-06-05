<template>
  <div class="tds-advertise-cards tds-admin-adverts">
    <header align="center" class="tds-titles">
      <b>SEO Tools</b>
      <hr />
    </header>

    <b-modal v-if="editMode" :active.sync="editMode">
      <modalSeoForm :selectedRecord="selectedItem" :key="selectedItem" @closed="handleClose"></modalSeoForm>
    </b-modal>
    <div class="singleRequest tds-admin-allusers">
      <div>
        <div class="filter-tabs" style="grid-template-columns: 1fr 1fr;">
          <button type="submit" class="tds-primary-button" :class="{'activeButton' : activeFilter === 'default'}" @click="setActiveFilter('default')" style="width:100%;margin-left:0;margin-right:10px; background:#3E3E3E">DEFAULT</button>
          <button type="submit" class="tds-primary-button" :class="{'activeButton' : activeFilter === 'edited'}" @click="setActiveFilter('edited')" style="width:100%; background:#3E3E3E;">EDITED</button>
        </div>

        <form @submit.prevent="searchTerm()" class="tds-search-agent-admin" validate>
          <b-field>
            <b-input placeholder=" Search by Listing... " expanded v-model="term"></b-input>
            <p class="control">
              <button class="button tds-primary-button">Find SEO-records</button>
            </p>
          </b-field>
        </form>
      </div>

      <table class="table is-fullwidth admin-table">
        <thead>
          <tr>
            <th>Listing ID</th>
            <th>Listing Title (preview)</th>
            <th>SEO Title</th>
            <th>SEO Description</th>
            <th>Keywords</th>
            <th>Modify</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(seoRecord, index) in seoRecords" :key="index">
            <td data-label="Listing ID" class>
              <span> {{seoRecord.post_id}} </span>
            </td>
            <td data-label="Listing Title" class>
              <a :href="`/properties/${seoRecord.post_permalink}`" target="_blank" v-if="seoRecord.post_permalink">
                <span> {{ truncateString(seoRecord.post_title) }} </span>
              </a>
              <span v-else>{{ truncateString(seoRecord.post_title) }}</span>
            </td>
            <td data-label="SEO Title" class>
              <span> {{ truncateString(seoRecord.title) }} </span>
            </td>
            <td data-label="SEO description" class>
              <span> {{ truncateString(seoRecord.description) }} </span>
            </td>
            <td data-label="Keywords" class>
              <span> {{ truncateString(seoRecord.keywords) }} </span>
            </td>
            <td data-label="Modify" class="modify">
              <u @click="enterEditMode(seoRecord.id)">Edit</u>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="container find-agents">
      <b-pagination
        :total="seoRecordslinks.total_entries"
        :order="'is-centered'"
        :simple="false"
        :rounded="false"
        :per-page="seoRecordslinks.per_page"
        :current.sync="seoRecordslinks.current_page"
        @change="nextPage($event)"
      ></b-pagination>
    </div>

  </div>
</template>

<script>
import modalSeoForm from './modalSeoForm'

export default {
  components: {modalSeoForm},
  data() {
    return {
      editMode: false,
      term:"",
      seoRecords:[],
      seoRecordslinks:{},
      selectedItem: {},
      activeFilter: 'default',
    }
  },
  methods: {
    async enterEditMode(itemId) {
      if (this.editMode && this.selectedItem.id == itemId) {
        return
      }
      this.$axios.setToken(this.storage.token, 'Bearer')
      let result = await this.$axios.get(`admin/meta_data/${itemId}`)
      this.selectedItem = result.data
      this.editMode = true
    },
    closeEditMode() {
      this.selectedItem = {}
      this.editMode = false
    },
    async searchTerm(){
      try {
          this.$axios.setToken(this.storage.token, 'Bearer')
          let listings = await this.$axios.get(`admin/meta_data?q=${this.term}&mode=${this.activeFilter}`)
          this.seoRecords = listings.data.meta_data
          this.seoRecordslinks = listings.data.links
      } catch (e) {
        console.log(e)
      }
    },
    async getSeoRecords() {
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        let listings = await this.$axios.get('admin/meta_data', {params: {mode: this.activeFilter}})
        this.seoRecords =  listings.data.meta_data
        this.seoRecordslinks = listings.data.links
      } catch (error) {
        console.log(error)
      }
    },
    async nextPage(e) {
      if(e === 0) e = 1

      this.$axios.setToken(this.storage.token, 'Bearer')
      let listings = await this.$axios.get(`admin/meta_data?q=${this.term}&page=${e}&mode=${this.activeFilter}`)
      this.seoRecords =  listings.data.meta_data
      this.seoRecordslinks = listings.data.links

    },
    handleClose() {
      this.editMode = false
      this.selectedItem = {}
      this.getSeoRecords()
    },
    truncateString(string) {
      return (string.length < 20) ? string : string.slice(0,40)+"..."
    },
    setActiveFilter(filter) {
      this.activeFilter = filter
      this.term = ''
      this.getSeoRecords()
    },
  },
  filters: {
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  created(){
    this.getSeoRecords()
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
.new-btn-wrap {
  text-align: right;
}
</style>
