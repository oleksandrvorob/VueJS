<template>
  <div>
    <div class="container tds-page-content my-subscription">
      <header class="tds-titles" align="center">
        <strong>My</strong> Subscription
        <hr />
      </header>
      <div class="tds-grid-listings">
        <div  v-if="Object.keys(subDetails).length !== 0">
          <div class="tds-title-tab">
            Current Plan:
            <b>{{subDetails.plan}}</b>
          </div>
          <div class="tds-payment-holder">
            <div class="my-subscription-flex">
              <div>
                <p v-html="regularPost"></p>
                <p>
                  Remaining Priority Listing:
                  <b>{{subDetails.priorities}}</b>
                </p>
                <p>
                  Remaining Boost:
                  <b>{{subDetails.boost}}</b>
                </p>
                <p>
                  Expires:
                  <b>{{subDetails.expiring_date}}</b>
                </p>
                <hr />
                <p>
                  Used Boost :
                  <b>{{plan[subDetails.plan].priorityB - subDetails.boost}}</b>
                </p>
                <p>
                  Used Priority Listing:
                  <b>{{plan[subDetails.plan].priorityL - subDetails.priorities}}</b>
                </p>
              </div>
              <div>
                <nuxt-link to="/upgrade" class="button tds-primary-button">CHANGE PLAN</nuxt-link>

              </div>
            </div>
          </div>

          <div class="tds-title-tab">
            <b>Banner Ads</b>
          </div>

          <div class="tds-payment-holder">
            <div>
              <p v-if="!banners">You don’t currently have any banner ads.</p>
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
                      URL:
                      <b :class="{ 'HideUrl' : ShowbannerEdit(index)}">{{banner.url}}</b>
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
              :total="bannerTotal"
              :current.sync="bannerCurrent"
              :order="'is-centered'"
              :simple="true"
              :rounded="false"
              :per-page="bannerPerPage"
              @change="nextbannerPage"
            ></b-pagination>
          </div>

          <div class="tds-title-tab">
            <b>Partnered Brands</b>
          </div>

          <div class="tds-payment-holder">
            <div>
              <p v-if="!brands">You don’t currently have any partnered brands</p>
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
                      URL:
                      <b :class="{ 'HideUrl' : ShowbrandEdit(index)}">{{brand.url}}</b>
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
              :total="brandTotal"
              :current.sync="brandCurrent"
              :order="'is-centered'"
              :simple="true"
              :rounded="false"
              :per-page="brandPerPage"
              @change="nextbrandPage"
            ></b-pagination>
          </div>

          <div class="tds-title-tab">
            <b>Subscription History</b>
          </div>
          <div class="tds-payment-holder">
            <p v-if="!userSub">You don’t currently have any subscriptions.</p>
            <ul v-if="userSub">
              <li v-for="(transaction, index) in userSub" :key="index" class="transactions">
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
                  {{transaction.duration > 1 ? transaction.duration + ' months' : transaction.duration + ' month' }}
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
        <div class="tds-sub-payment" v-if="subDetails.plan != 'FREE'">
          <div class="responsive-payment">
            <div class="tds-title-tab" align="center">
              <b>Purchase Additional Boosts</b>
            </div>
            <div class="tds-payment-holder">
              <table class="table is-fullwidth">
                <tbody>
                  <tr>
                    <td>
                      <b>Packages</b>
                    </td>
                    <td>
                      <b>Quantity</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Boosts {{ `(₦${price}/Boost)`}}</td>
                    <td>
                      <input
                        class="input"
                        type="number"
                        oninput="validity.valid||(value='');"
                        v-model="additionalBoost"
                        min="0"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>{{price}}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>TOTAL</b>
                    </td>
                    <td>
                      <b>{{ totalBoostAmount | currency }}</b>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="tds-payment">
                <paystack
                  :amount="totalBoostAmount*100"
                  :email="email"
                  :paystackkey="paystackKey"
                  :reference="reference"
                  :callback="callback"
                  :close="close"
                  :embed="false"
                >
                  <span
                    class="button tds-primary-button"
                    style="display:none"
                    ref="BOOST"
                  >Make Payment</span>
                </paystack>
                <button
                  class="button tds-primary-button"
                  :disabled="isBoostActive"
                  @click="transaction(totalBoostAmount, 'BOOST', additionalBoost )"
                >MAKE PAYMENT</button>
              </div>
            </div>
            <div class="tds-sub-payment" v-if="subDetails.plan === 'CUSTOM'">
              <div class="responsive-payment">
                <div class="tds-title-tab" align="center">
                  <b>Purchase Additional Listings</b>
                </div>
                <div class="tds-payment-holder">
                  <table class="table is-fullwidth">
                    <tbody>
                      <tr>
                        <td>
                          <b>Packages</b>
                        </td>
                        <td>
                          <b>Quantity</b>
                        </td>
                      </tr>
                      <tr v-if="subDetails.plan ==='CUSTOM'">
                        <td>Listings (₦500/Boost)</td>
                        <td>
                          <input
                            class="input"
                            type="number"
                            oninput="validity.valid||(value='');"
                            v-model="additionalList"
                            min="0"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Price</td>
                        <td>₦500</td>
                      </tr>
                      <tr>
                        <td>
                          <b>TOTAL</b>
                        </td>
                        <td>
                          <b>{{ totalListAmount | currency }}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="tds-payment">
                    <paystack
                      :amount="totalListAmount*100"
                      :email="email"
                      :paystackkey="paystackKey"
                      :reference="reference"
                      :callback="callback"
                      :close="close"
                      :embed="false"
                    >
                      <span
                        class="button tds-primary-button"
                        style="display:none"
                        ref="PRIORITY"
                      >Make Payment</span>
                    </paystack>
                    <button
                      class="button tds-primary-button"
                      :disabled="isListActive"
                      @click="transaction(totalListAmount, 'PRIORITY', additionalList )"
                    >MAKE PAYMENT</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import paystack from 'vue-paystack'

export default {
  components: { paystack },
  data() {
    return {
      plan:{
        "CUSTOM":{
          priorityL:60,
          priorityB:30
        },
        "PRO":{
          priorityL:40,
          priorityB:20
        },
        "CLASSIC":{
          priorityL:15,
          priorityB:10
        },
        "BASIC":{
          priorityL:5,
          priorityB:5
        },
        "FREE":{
          priorityL:0,
          priorityB:0
        }
      },
      currentPlan: '',
      additionalBoost: '',
      additionalList: '',
      userSub: '',
      userSubLinks: {},
      banners: [],
      bannerLinks: {},
      brands: [],
      brandLinks: {},
      EditbrandIndex: null,
      EditindexBanner: null,
      editBannerLink: '',
      editBrandLink: '',
      subDetails: {},

      bannerTotal: 0,
      bannerCurrent: 1,
      bannerPerPage: 0,

      brandTotal: 0,
      brandCurrent: 1,
      brandPerPage: 0,

      // Paystack
      currentPlan: '',
      paystackKey: 'pk_live_7d935fc7df0c78afc094bb0b85861f83e0e9a1fe', //paystack public key
      email: '', // Customer email
      amount: 0, // in kobo
      reference: ''
    }
  },
  middleware: 'auth',

  computed: {
    regularPost() {
      if (this.subDetails.max_post > 10) {
        return 'Regular Listings per month: <b> Unlimited </b>'
      } else {
        return `Regular Listings per month: <b> ${
          this.subDetails.max_post
        } </b>`
      }
    },

    userName() {
      let base64Url = this.storage.token.split('.')[1]
      return JSON.parse(atob(base64Url)).username
    },

    totalBoostAmount() {
      return this.price * this.additionalBoost
    },

    totalListAmount() {
      return 500 * this.additionalList
    },

    price() {
      return 500
    },

    isBoostActive() {
      if (this.additionalBoost > 0) {
        return false
      } else {
        return true
      }
    },

    isListActive() {
      if (this.additionalList > 0) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    callback(response) {
      let payload = {
        token: this.storage.token,
        reference: response.reference,
        actionLink: 'subscribe'
      }
      this.$store.dispatch('transaction/verifyPayment', payload)
      this.additionalList = ''
      this.additionalBoost = ''
    },
    close() {
      console.log('Payment closed')
    },

    initiatePayment(paystack) {
      this.$refs[paystack].click()
      // console.log('clicked me', this.$refs[paystack])
    },

    async transaction(total, type, duration) {
      let f = {
        amount: total,
        transaction_for: type,
        duration: duration
      }

      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const transaction = await this.$axios.post('transactions', {
          transaction: f
        })
        this.email = transaction.data.email
        this.amount = transaction.data.amount
        this.reference = transaction.data.ref_no
        this.initiatePayment(f.transaction_for)
      } catch (e) {
        console.log(e)
      }
    },

    async submitbanners(i) {
      try {
        let url = this.banners[i].permalink
        this.$axios.setToken(this.storage.token, 'Bearer')
        const banner = await this.$axios.$patch(url, {
          banner_ad: { url: this.editBannerLink }
        })
        this.banners[i].url = banner.url
        this.cancleEditBanner()
      } catch (e) {
        console.log(e)
      }
    },
    async submitbrand(i) {
      try {
        let url = this.brands[i].permalink
        this.$axios.setToken(this.storage.token, 'Bearer')
        const brand = await this.$axios.$patch(url, {
          brand: { url: this.editBrandLink }
        })
        this.brands[i].url = brand.url
        this.cancleEditbrand()
      } catch (e) {
        console.log(e)
      }
    },

    async Deletebanner(index) {
      let del = confirm('Are you sure you want to DELETE this?')
      try {
        if (del === true) {
          this.$axios.setToken(this.storage.token, 'Bearer')
          let url = this.banners[index].permalink
          const deletePost = await this.$axios.$delete(url)
          // this.banners.splice(index, 1)
          this.getBannerAds()
        }
      } catch (e) {
        console.log(e)
      }
    },
    bannerEdit(i) {
      this.EditindexBanner = i
      this.editBannerLink = this.banners[i].url
    },
    async Deletebrand(index) {
      let del = confirm('Are you sure you want to DELETE this?')
      try {
        if (del === true) {
          this.$axios.setToken(this.storage.token, 'Bearer')
          let url = this.brands[index].permalink
          const deletePost = await this.$axios.$delete(url)
          this.getPartnerned()
        }
      } catch (e) {
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
    async nextuserSubLinksPage(e) {
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const userSub = await this.$axios.get(
          `my-subscription/${this.userName}?page=${e}`
        )
        this.userSub = userSub.data.transactions
        this.userSubLinks = userSub.data.links
      } catch (error) {}
    },

    async nextbannerPage(e) {
      try {
        if (e === 0) e = 1
        this.$axios.setToken(this.storage.token, 'Bearer')
        const banners = await this.$axios.$get(
          `banner_ads/users/${this.userName}?page=${e}`
        )
        this.banners = banners.banners

        this.bannerTotal = banners.links.total_entries
        this.bannerPerPage = banners.links.per_page
        this.bannerCurrent = banners.links.current_page
      } catch (error) {
        console.log(error)
      }

      console.log(e)
    },

    async nextbrandPage(e) {
      try {
        if (e === 0) e = 1
        this.$axios.setToken(this.storage.token, 'Bearer')
        const brands = await this.$axios.$get(
          `brands/users/${this.userName}?page=${e}`
        )
        this.brands = brands.brands

        this.brandTotal = brands.links.total_entries
        this.brandPerPage = brands.links.per_page
        this.brandCurrent = brands.links.current_page
      } catch (error) {
        console.log(error)
      }
    },

    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', {
        marginTop: m,
        paddingTop: p
      })
    },
    Delete(i) {
      confirm('Are you sure you want to delete it')
    },
    async getSubscriptionDetails() {
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const userSub = await this.$axios.$get(
          `my-subscription/${this.userName}`
        )
        this.userSub = userSub.transactions
        this.userSubLinks = userSub.links
        this.subDetails = userSub
        console.log(userSub)
      } catch (e) {
        console.log(e)
      }
    },

    async getBannerAds() {
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const banners = await this.$axios.$get(
          `banner_ads/users/${this.userName}`
        )
        this.banners = banners.banners

        this.bannerTotal = banners.links.total_entries
        this.bannerPerPage = banners.links.per_page
        this.bannerCurrent = banners.links.current_page
      } catch (e) {
        console.log(e)
      }
    },

    async getPartnerned() {
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const brands = await this.$axios.$get(`brands/users/${this.userName}`)
        this.brands = brands.brands

        this.brandTotal = brands.links.total_entries
        this.brandPerPage = brands.links.per_page
        this.brandCurrent = brands.links.current_page

        console.log(this.userName)
      } catch (e) {
        console.log(e)
      }
    }
  },
  created() {
    this.updateTopSpaces(100, 50)
    this.currentPlan = this.$store.state.propertyads.currentSub
    this.getSubscriptionDetails()
    this.getBannerAds()
    this.getPartnerned()
  },
  beforeDestroy() {
    this.updateTopSpaces(136, 50)
  },
  head() {
    return {
      title: 'My Subscriptions - 2Dots Properties',
      meta: [
        {
          hid: 'My Subscriptions',
          name: 'My Subscriptions',
          content:
            ' Subscription -- Current Plan: ,Banner Ads:, Subscription History: '
        }
      ]
    }
  }
}
</script>

<style>
</style>
