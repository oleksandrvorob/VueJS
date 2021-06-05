<template>
  <div>
    <div class="singleRequest tds-admin-allusers">
      <div>
        <form @submit.prevent="searchTerm()" class="tds-search-agent-admin" validate>
          <b-field>
            <b-input placeholder=" Search... " expanded v-model="term"></b-input>
            <p class="control">
              <button class="button tds-primary-button">Search by Ref No</button>
            </p>
          </b-field>
        </form>
      </div>
    </div>

    <div class="filter-tabs" style="grid-template-columns:1fr;">
      <button
        type="submit"
        class="tds-primary-button"
        @click="lauchModal"
        style="width:100%;margin-left:0;"
      >ADD NEW BRAND SUBCRIPTION</button>
    </div>

    <div class="tds-payment-holder">
      <div>
        <!---->
        <ul>
          <li class="banner-ads-list transactions" v-for="(brand ,i) in brands" :key="i">
            <div>
              <img :src="baseUrl+brand.image" />
            </div>
            <div>
              <p>
                Date Created:
                <b>{{brand.created_at}}</b>
              </p>
              <p>
                Status:
                <b>{{brand.status}}</b>
              </p>
              <p>
                Duration:
                <b>{{brand.duration }} {{ brand.duration > 1 ? 'Months': 'Month'}}</b>
              </p>
              <p>
                Expires:
                <b>{{brand.expiring_date}}</b>
              </p>
              <p>
                Reference Number:
                <b>{{brand.ref_no}}</b>
              </p>
              <div class="form-holder">
                URL:
                <b class v-if="!(i === counter)">{{brand.url}}</b>
                <form validate class="bannerEdit bannerEditflex" v-if="i === counter">
                  <input
                    type="url"
                    autofocus="autofocus"
                    required="required"
                    class="input"
                    v-model="formerurl"
                  />
                  <span type="submit" class="button" @click="doneEditing(brand)">
                    <img src="/img/Yes.png" style="width: 45px; height: 30px;" />
                  </span>
                  <span class="button" @click="cancleEdit">
                    <img src="/img/No.png" style="width: 45px; height: 30px;" />
                  </span>
                </form>
              </div>
              <p>
                <span class="ads-edit-Link" @click="editUrl(i, brand)">Edit</span>|
                <span class="ads-delete-link" @click="deletelist(brand)">Delete</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <b-modal :active.sync="ModalActive">
      <BrandModal />
    </b-modal>
    <b-pagination
      :current.sync="brandLinks.current_page"
      :total="brandLinks.total_entries"
      :order="'is-centered'"
      :simple="false"
      :rounded="false"
      :per-page="brandLinks.per_page"
      @change="nextPage($event)"
    ></b-pagination>
  </div>
</template>

<script>
import BrandModal from './modalBrandsub'
export default {
  components: {
    BrandModal
  },
  data() {
    return {
      ModalActive: false,
      counter: null,
      formerurl: '',
      brands: [],
      brandLinks: {},
      baseUrl: process.env.API_URL,
      term: '',


    }
  },
  methods: {
    async searchTerm() {
      this.$axios.setToken(this.storage.token, 'Bearer')
      let banner = await this.$axios.$get(`admin/all-banners?q=${this.term}`)
      this.banners = banner.banners
      this.bannerLinks = banner.links
    },
    lauchModal() {
      this.ModalActive = true
    },
    async doneEditing(i, brand) {
      this.counter = null
      this.$axios.setToken(this.storage.token, 'Bearer')
      console.log(brand)
      try {
        await this.$axios.$patch(brand.permalink, { url: this.formerurl })
        this.formerurl = ''
        this.getLists()
      } catch (error) {
        console.log(error)
      }
    },
    editUrl(i, formerUrl) {
      this.counter = i
      this.formerurl = formerUrl.url
    },
    cancleEdit() {
      this.counter = null
    },
    async deletelist(brand) {
      let confirmation = confirm('Do you want to delete this Subcription')
      if (confirmation) {
        try {
          this.$axios.setToken(this.storage.token, 'Bearer')
          await this.$axios.delete(brand.permalink)
          this.getLists()
        } catch (error) {
          console.log(error)

          let payload = {
            msg: 'Something went wrong. Please try again',
            isActive: true
          }

          this.$store.commit('notify/failed', payload)
          this.$store.dispatch('notify/selfReset')
        }
      }
    },
    async nextPage(e) {
      if (e === 0) e = 1
      this.$axios.setToken(this.storage.token, 'Bearer')
      let brand = await this.$axios.$get(`admin/all-brands/?page=${e}&q=`)
      console.log(brand)
      this.brands = brand.brands
      this.brandLinks = brand.links
    },
    async getLists() {
      this.$axios.setToken(this.storage.token, 'Bearer')
      let brand = await this.$axios.$get(`admin/all-brands/?page=1&q=`)
      console.log(brand)
      this.brands = brand.brands
      this.brandLinks = brand.links
    }
  },
  beforeDestroy() {
    this.ModalActive = false
    this.isVerifyModalActive = false
  },
  created() {
    this.getLists()
  }
}
</script>

<style>

</style>
