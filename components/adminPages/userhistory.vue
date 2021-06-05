<template>
  <div class="my-subscription">

          <div class="tds-title-tab">
            <b>Banner Ads</b>
          </div>

          <div class="tds-payment-holder">
            <div>
              <p v-if="banners.length === 0">You don’t currently have any banner ads.</p>
              <ul v-if="banners">
                <li
                  v-for="(banner, index) in banners"
                  :key="index"
                  class="banner-ads-list transactions"
                >
                  <div>
                    <img :src="process.env.API_URL+banner.image" />
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
                      Duration:
                      <b>{{banner.duration}} Month(s)</b>
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
                      URL: <b :class="{ 'HideUrl' : ShowbannerEdit(index)}">{{banner.url}}</b>
                      <form
                        validate
                        @submit.prevent="submitbanners(index)"
                        class="bannerEdit"
                        :class="{ 'bannerEditflex' : ShowbannerEdit(index)}"
                      >
                        <input type="url" class="input" v-model="editBannerLink" autofocus required />
                        <span type="submit" class="button" @click="submitbanners(index)">
                          <img src="/img/Yes.png" style="width:45px; height:30px" />
                        </span>
                        <span class="button" @click="cancleEditBanner(index)">
                          <img src="/img/No.png" style="width:45px; height:30px" />
                        </span>
                      </form>
                    </div>
                    <p>
                      <span class="ads-edit-Link" @click="bannerEdit(index)">Edit</span> |
                      <span @click="Deletebanner(index)" class="ads-delete-link">Delete</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <b-pagination
              :total="bannerLinks.total_entries"
              :current.sync="bannerLinks.current_page"
              :order="'is-centered'"
              :simple="true"
              :rounded="false"
              :per-page="2"
              @change="nextbannerPage"
            ></b-pagination>
          </div>

          <div class="tds-title-tab">
            <b>Partnered Brands</b>
          </div>

          <div class="tds-payment-holder">
            <div>
              <p v-if="brands.length === 0">You don’t currently have any partnered brands</p>
              <ul v-if="brands">
                <li
                  v-for="(brand, index) in brands"
                  :key="index"
                  class="banner-ads-list transactions"
                >
                  <div>
                    <img :src=" process.env.API_URL + brand.image" />
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
                      <b>{{brand.duration}} Month(s)</b>
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
                      URL: <b :class="{ 'HideUrl' : ShowbrandEdit(index)}">{{brand.url}}</b>
                      <form
                        validate
                        @submit.prevent="submitbrand(index)"
                        class="bannerEdit"
                        :class="{ 'bannerEditflex' : ShowbrandEdit(index)}"
                      >
                        <input type="url" class="input" v-model="editBrandLink" autofocus required />
                        <span type="submit" class="button" @click="submitbrand(index)">
                          <img src="/img/Yes.png" style="width:45px; height:30px" />
                        </span>
                        <span class="button" @click="cancleEditbrand(index)">
                          <img src="/img/No.png" style="width:45px; height:30px" />
                        </span>
                      </form>
                    </div>
                    <p>
                      <span class="ads-edit-Link" @click="brandEdit(index)">Edit</span>|
                      <span @click="Deletebrand(index)" class="ads-delete-link">Delete</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <b-pagination
              :total="brandLinks.total_entries"
              :current.sync="brandLinks.current_page"
              :order="'is-centered'"
              :simple="true"
              :rounded="false"
              :per-page="2"
              @change="nextbrandPage"
            ></b-pagination>
          </div>

          <div class="tds-title-tab">
            <b>Subscription History</b>
          </div>
          <div class="tds-payment-holder">
            <p v-if="userSub.length === 0">You don’t currently have any subscriptions.</p>
            <ul v-if="userSub">
              <li
                v-for="(transaction, index) in userSub"
                :key="index"
                class="transactions"
              >
                <span>
                  <b>Plan:</b>
                  {{transaction.plan}}
                </span>
                <span>
                  <b>Amount:</b>
                  {{transaction.amount | currency}}
                </span>
                <span>
                  <b>Duration:</b>
                  {{transaction.duration}} month(s)
                </span>
                <span>
                  <b>Status:</b>
                  {{transaction.status}}
                </span>
                <span>
                  <b>Date:</b>
                  {{transaction.date}}
                </span>
              </li>
            </ul>
            <b-pagination
              :total="userSubLinks.total_entries"
              :current.sync="userSubLinks.current_page"
              :order="'is-centered'"
              :simple="true"
              :rounded="false"
              :per-page="2"
              @change="nextuserSubLinksPage"
          ></b-pagination>

          </div>
  </div>
</template>

<script>
export default {
  components:{
  },
  data(){
    return{
      currentPlan: '',
      additionalBoost: '',
      additionalList: '',
      userSub: '',
      userSubLinks:{},
      banners: [],
      bannerLinks: {},
      brands: [],
      brandLinks: {},
      EditbrandIndex: null,
      EditindexBanner: null,
      editBannerLink: '',
      editBrandLink: '',
      subDetails: {},
    }
  },
  methods:{
    async submitbanners(i){
      try{
        let url = this.banners[i].permalink
        this.$axios.setToken(this.storage.token, 'Bearer')
        const banner = await this.$axios.$patch(url, { banner_ad: { url: this.editBannerLink } })
        this.banners[i].url = banner.url
        this.cancleEditBanner()}
      catch (e){
        console.log(e)
      }
    },
    async submitbrand(i){
      try{
        let url = this.brands[i].permalink
        this.$axios.setToken(this.storage.token, 'Bearer')
        const brand = await this.$axios.$patch(url, {brand: { url: this.editBrandLink } })
        this.brands[i].url = brand.url
        this.cancleEditbrand()}
      catch (e){
        console.log(e)
      }

    },

    async Deletebanner(index) {
      let del = confirm("Are you sure you want to DELETE this?");
      try{
        if (del === true){
          this.$axios.setToken(this.storage.token, 'Bearer')
          let url = this.banners[index].permalink
          const deletePost = await this.$axios.$delete(url)
          // this.banners.splice(index, 1)
          this.getBannerAds()
        }
      }catch(e){
        console.log(e)
      }
    },
    bannerEdit(i) {
      this.EditindexBanner = i
      this.editBannerLink = this.banners[i].url
    },
    async Deletebrand(index){
      let del = confirm("Are you sure you want to DELETE this?");
      try{
        if (del === true){
          this.$axios.setToken(this.storage.token, 'Bearer')
          let url = this.brands[index].permalink
          const deletePost = await this.$axios.$delete(url)
          this.getPartnerned()
        }
      }catch(e){
        console.log(e)
      }
    },
    ShowbannerEdit(i) {
      if (i === this.EditindexBanner) {
        return true
      } else {
        return false
      }
    },
    cancleEditBanner(i) {
      this.EditindexBanner = null
    },


    brandEdit(i) {
      this.EditbrandIndex = i
      this.editBrandLink = this.brands[i].url
    },

    ShowbrandEdit(i) {
      if (i === this.EditbrandIndex) {
        return true
      } else {
        return false
      }
    },
    cancleEditbrand(i) {
      this.EditbrandIndex = null
    },
    async nextuserSubLinksPage(e){
      try {
        if (e===0) e=1
        this.$axios.setToken(this.storage.token, 'Bearer')
        const userSub = await this.$axios.$get(`my-subscription/${this.$route.params.id}?page=${e}`)
        this.userSub = userSub.transactions
        this.userSubLinks = userSub.links
      } catch (error) {

      }
    },

    async nextbannerPage(e) {
      // if(e === 0) e =  1
      try {
        if (e===0) e=1
        this.$axios.setToken(this.storage.token, 'Bearer')
        const banners = await this.$axios.$get(`banner_ads/users/${this.$route.params.id}?page=${e}`)
        this.bannerLinks = banners.links
        this.banners = banners.banners
      } catch (error) {
        console.log(error)
      }

      console.log(e)
    },

    async nextbrandPage(e) {
      try {
        if (e===0) e=1
        this.$axios.setToken(this.storage.token, 'Bearer')
        const banners = await this.$axios.get(`brands/users/${this.$route.params.id}?page=${e}`)
        console.log(banners)
        this.brandLinks = banners.data.links
        this.brands = banners.data.brands
      } catch (error) {
        console.log(error)
      }
    },
    Delete(i) {
      confirm('Are you sure you want to delete it')
    },
    async getSubscriptionDetails() {
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const sub = await this.$axios.$get(`my-subscription/${this.$route.params.id}`)
        this.userSub = sub.transactions
        this.userSubLinks = sub.links
        let payload = {
          boost: sub.boost,
          expiring_date: sub.expiring_date,
          max_post: sub.max_post,
          plan: sub.plan,
          priorities: sub.priorities
        }

        this.$store.commit('admin/sub', payload)
      } catch (e) {
        console.log(e)
      }
    },

    async getBannerAds() {
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const banners = await this.$axios.$get(`banner_ads/users/${this.$route.params.id}`)
        this.banners = banners.banners
        this.bannerLinks = banners.links
      } catch (e) {
        console.log(e)
      }
    },

    async getPartnerned() {
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const brands = await this.$axios.$get(`brands/users/${this.$route.params.id}`)
        this.brands = brands.brands
        this.brandLinks = brands.links

      } catch (e) {
        console.log(e)
      }
    }
  },
  created() {
    this.currentPlan = this.$store.state.propertyads.currentSub
    this.getSubscriptionDetails()
    this.getBannerAds()
    this.getPartnerned()
  }
}
</script>

<style>
.my-subscription .tds-title-tab {
  height: 56px;
  background: #ededed;
  padding: 15px;
  margin-top: 25px;
}
</style>
