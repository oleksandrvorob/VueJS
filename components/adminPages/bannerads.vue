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
      <button type="submit" class="tds-primary-button" @click="lauchModal" style="width:100%;margin-left:0;">ADD NEW BANNER SUBCRIPTION</button>
    </div>

    <div class="tds-payment-holder" v-if="banners.length !== 0">
      <div>
        <!---->
        <ul>
          <li class="banner-ads-list transactions" v-for="(banner ,i) in banners" :key="i">
            <div>
              <img
                :src="baseUrl+banner.image"
              />
            </div>
            <div>
              <p>
                Date Created:
                <b>{{banner.created_at}}</b>
              </p>
              <p>
                Status:
                <b>{{banner.status}}</b>
              </p>
              <p>
                Type:
                <b>{{banner.banner_type}}</b>
              </p>
              <p>
                Duration:
                <b>{{banner.duration }} {{ banner.duration > 1 ? 'Months': 'Month'}}</b>
              </p>
              <p>
                Expires:
                <b>{{banner.expiring_date}}</b>
              </p>
              <p>
                Reference Number:
                <b>{{banner.ref_no}}</b>
              </p>
              <div class="form-holder">
                URL:
                <b class v-if="!(i === counter)">{{banner.url}}</b>
                <form validate class="bannerEdit bannerEditflex" v-if="i === counter">
                  <input type="url" autofocus="autofocus" required="required" class="input" v-model="formerurl" />
                  <span type="submit" class="button" @click="doneEditing(banner)">
                    <img src="/img/Yes.png" style="width: 45px; height: 30px;" />
                  </span>
                  <span class="button" @click="cancleEdit">
                    <img src="/img/No.png" style="width: 45px; height: 30px;" />
                  </span>
                </form>
              </div>
              <p>
                <span class="ads-edit-Link" @click="editUrl(i, banner)">Edit</span>|
                <span class="ads-delete-link" @click="deletelist(i, banner)">Delete</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <b-modal :active.sync="ModalActive">
            <BannerModal/>
    </b-modal>
      <b-pagination
        :current.sync="bannerLinks.current_page"
        :total="bannerLinks.total_entries"
        :order="'is-centered'"
        :simple="false"
        :rounded="false"
        :per-page="bannerLinks.per_page"
        @change="nextPage($event)"
      ></b-pagination>
  </div>
</template>

<script>
import BannerModal from './modalBanner'
export default {
  components:{
    BannerModal
  },
  data(){
    return{
      ModalActive:false,
      counter:null,
      formerurl:'',
      banners:[],
      bannerLinks:{},
      baseUrl: process.env.API_URL,
      term:''
    }
  },
  methods:{
    async searchTerm(){

      this.$axios.setToken(this.storage.token, 'Bearer');
      let banner = await this.$axios.$get(`admin/all-banners?q=${this.term}`);
      this.banners = banner.banners;
      this.bannerLinks = banner.links;
    },
    lauchModal(){
      this.ModalActive = true
    },
    async doneEditing(banner){
       this.counter = null
       this.$axios.setToken(this.storage.token, 'Bearer');
       console.log(banner)
       try {
         await this.$axios.$patch(banner.permalink, {url: this.formerurl})
          this.formerurl = ''
          this.getLists()
       } catch (error) {
         console.log(error)
       }
    },
    editUrl(i,formerUrl){
      // formerUrl.url
      this.counter = i
      this.formerurl = formerUrl.url
    },
    cancleEdit(){
       this.counter = null
    },
    async deletelist(i, banner){
      let confirmation = confirm('Do you want to delete this Subcription')
      if(confirmation){
        try {
          this.$axios.setToken(this.storage.token,'Bearer');
          await this.$axios.delete(banner.permalink);
          this.getLists();
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
    async getLists(){
      this.$axios.setToken(this.storage.token, 'Bearer');
      let banner = await this.$axios.$get(`admin/all-banners`);
      this.banners = banner.banners;
      this.bannerLinks = banner.links;
    },
    nextPage(){
      console.log('next')
    }
  },
  created(){
    this.getLists()
  },
  beforeDestroy(){
    this.ModalActive = false
  }
}
</script>

<style>

</style>
