<template>
  <div class="container tds-advertise-cards banner-ads">
    <header align="center" class="tds-titles">
      <b>Banner</b> <remodify :word="'Ads'"/>
      <hr>
    </header>
    <div class="column is-full tds-column-grey tds-remedy-component ">
      Banner <remodify :word="'Ads'"/> are usually displayed in vantage points on our platform. That way site users get to see your <remodify :word="'Ads'"/>,
       and can even click on such <remodify :word="'Ads'"/> to take them directly to your corporate webpage.
        You can directly measure the impact of your <remodify :word="'Ads'"/>, using the number of unique user
         clicks that translate into more sales and awareness for your brand. 
      <br>Take advantage of our Banner <remodify :word="'Ads'"/> to display your company information, products and services.
       This is a very efficient and targeted method of reaching our platform users and your potential customers

      <br>
    </div>
    <div class="banner-ads-grid">
      <div class="subscription-card" v-for="(plan, index) in plans" :key="index">
        <p> <b style="text-transform: capitalize;">{{plan.title.toLowerCase()}}</b> </p>
        <p class="tds-subcard-item-price">{{plan.price | currency}}<span style="font-size:16px;"><b>/Month</b></span> </p>
        <div class="tds-subcard-item">
          <p>
            <span>Desktop:</span>
            <span>{{plan.Width}}px By {{plan.Height}}px</span>
          </p>
        </div>

        <div class="tds-subcard-item" v-if="plan.mobile">
          <p>
            <span>Mobile:</span>
            <span>{{plan.mobile.Width}}px By {{plan.mobile.Height}}px </span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p>
            <span>Site Location:</span>
            <span>{{plan.location}}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="column is-full tds-column-grey-empty"></div>

    <div class="advertise-payment">
      <div class="tds-grid">
        <div class="responsive-payment">
          <div class="tds-title-tab">Advert Details</div>
          <div class="tds-payment-holder">
            <div class="tds-tab-title-tile">
              Banner Type:
              <div class="select">
                <select v-model="bannerType" @change="clearForm">
                  <option disabled value>Select Option</option>
                  <option value="SMALL" >Small</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LARGE">Large</option>
                </select>
              </div>
            </div>

            <div class="tds-tab-title-tile">
              Duration:
              <div class="select">
                <select v-model="Duration">
                  <option disabled value>Select Option</option>
                  <option v-for="n in 12" :key="n" :value="n">{{n}} {{ n === 1? 'Month' : 'Months'}}</option>
                  <option></option>
                </select>
              </div>
            </div>

            <div class="tds-tab-title-tile">
              URL:
              <b-field style="max-width:480px; width:100%">
                  <b-input type="url" v-model="url" validate expanded required placeholder="https://2dotsproperty.com"> </b-input>
              </b-field>
            </div>

            <div class="tds-tab-title-tile" v-if="Upload">
              Desktop {{bannerType? bannerType.toLowerCase(): null}}
              <div style="display:flex;width: 478px;">
                <b-tooltip :label="tooltiplabel" type="is-black" position="is-right">
                  <b-field class="file">
                    <b-upload v-model="DesktopFile" accept="image/*" @input="logFile">
                      <a class="button is-black">
                        <b-icon icon="upload"></b-icon>
                        <span>Click to upload</span>
                      </a>
                    </b-upload>

                    <span class="file-name" v-if="DesktopFile">{{DesktopFile.name }}</span>
                  </b-field>
                </b-tooltip>
              </div>
            </div>

            <div class="tds-tab-title-tile" v-if="MobileUpload">
              Mobile {{ bannerType ? bannerType.toLowerCase() : null}}
              <div style="display:flex;width: 478px;">
                <b-tooltip
                  label=" 375px X 138px For Banner Ads"
                  type="is-black"
                  position="is-right"
                >
                  <b-field class="file">
                    <b-upload v-model="mobileFile" accept="image/*" @input="mobileLogFile">
                      <a class="button is-black">
                        <b-icon icon="upload"></b-icon>
                        <span>Click to upload</span>
                      </a>
                    </b-upload>

                    <span class="file-name" v-if="mobileFile">{{mobileFile.name }}</span>
                  </b-field>
                </b-tooltip>
              </div>
            </div>
          </div>

          <div class="tds-payment-holder">
            <div class="tds-tab-title-tile">
              Payment Method
              <div class="select">
                <select v-model="Payment_Method">
                  <option selected value="Paystack">Paystack</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="responsive-payment">
          <div class="tds-title-tab" align="center">
            <b>Details</b>
          </div>
          <div class="tds-payment-holder">
            <table class="table is-fullwidth">
              <tbody>
                <tr>
                  <td>Banner Type</td>
                  <td v-show="bannerType">
                    <b>{{bannerType}}</b>
                  </td>
                </tr>
                <tr>
                  <td>Duration</td>
                  <td class="is-title">
                    <b v-show="Duration">{{Duration}} {{ Duration === 1? 'Month' : 'Months'}}</b>
                  </td>
                </tr>
                <tr>
                  <td>Site Location</td>
                  <td>
                    <b>{{SiteLocation}}</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <hr>
                  </td>
                  <td>
                    <hr>
                  </td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>{{Price | currency}}</td>
                </tr>

                <tr v-if="Duration >= 6 && Duration <= 11">
                  <td>Discount</td>
                  <td>5%</td>
                </tr>
                <tr v-if="Duration >= 12">
                  <td>Discount</td>
                  <td>10%</td>
                </tr>
                <tr>
                  <td>
                    <hr>
                  </td>
                  <td>
                    <hr>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>TOTAL</b>
                  </td>
                  <td >
                    {{ totalAmount | currency}}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="tds-payment">
            <paystack
              :amount="totalAmount*100"
              :email="email"
              :paystackkey="paystackKey"
              :reference="reference"
              :callback="callback"
              :close="close"
              :embed="false">
              <span class="button tds-primary-button" style="display:none" ref="paystack" >
                Make Payment
              </span>
            </paystack>
              <button class="button tds-primary-button" :disabled="enabled" @click="postBannerAd" >MAKE PAYMENT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import remodify from '~/components/remodify'
import AdvertisePayment from '~/components/AdvertisePayment.vue'
import paystack from 'vue-paystack'

export default {
  data() {
    return {
      plans: [
        {
          title: 'SMALL',
          price: 130000 ,
          size: '380 X 279px',
          location: 'Sidebar',
          Height: 279,
          Width: 380
        },
        {
          title: 'MEDIUM',
          price: 150000 ,
          size: '1029 X 158px',
          location: 'Listings / Forum',
          mobile: {
            Height: 138,
            Width: 375
          },
          Height: 158,
          Width: 1029
        },
        {
          title: 'LARGE',
          price: 170000 ,
          size: '1344 X 158px',
          location: 'Homepage',
          mobile: {
            Height: 138,
            Width: 375
          },
          Height: 158,
          Width: 1344
        }
      ],
      url:'',
      subActive: 0,
      bannerType: '',
      Duration: '',
      Payment_Method: 'Paystack',
      DesktopFile: null,
      mobileFile: null,
      isValid: false,


      // Paystack
      currentPlan:'',
      paystackKey: 'pk_live_7d935fc7df0c78afc094bb0b85861f83e0e9a1fe', //paystack public key
      email: '', // Customer email
      amount: 0,// in kobo
      reference: ''
    }
  },
  components: {
    AdvertisePayment,
    paystack,
    remodify
  },
  methods: {
    clearForm(){
      this.DesktopFile = null
      this.mobileFile = null
    },

    callback(response){
      let payload = {
        token: this.storage.token,
        reference: response.reference,
        actionLink: 'subscribe-banner',
      }
      this.$store.dispatch('transaction/verifyPayment', payload)
      console.log(response.reference)
    },

    close(){
      console.log("Payment closed")
    },

    logFile(e) {
      console.log(this.DesktopFile, "Banner Adscom")
      console.log("I ran")
      const reader = new FileReader()
      reader.readAsDataURL(e)
      var image = new Image()
      reader.onload = event => {
        image.src = event.target.result
        let plan
        image.onload = e => {
          this.plans.forEach(p => {
            if (this.bannerType === p.title) {
              plan = p
            }
          });
          
          if (plan.Width === e.path[0].width && plan.Height === e.path[0].height) {
            return
          }

          let load = {
            isActive: true,
            msg: 'Image Height or Width is Incorrect '
          }

          this.$store.commit('notify/failed', load)
          this.$store.dispatch('notify/selfReset')

          this.DesktopFile = null
        }
      }
    },
    mobileLogFile(e) {
      console.log(this.mobileFile)
      const reader = new FileReader()
      reader.readAsDataURL(e)
      var image = new Image()
      reader.onload = event => {
        image.src = event.target.result
        let a
        image.onload = e => {
          this.plans.forEach(e => {
            if (this.bannerType === e.title) {
              a = e
            }
          })
          if (
            a.mobile.Height !== e.path[0].height &&
            a.mobile.Width !== e.path[0].width
          ) {
            let load = {
              isActive: true,
              msg: 'Image Height or Width is incorrect'
            }
            this.$store.commit('notify/failed', load)
            this.$store.dispatch('notify/selfReset')
            this.mobileFile = null
          }
        }
      }
    },

    initiatePayment(){
      this.$refs.paystack.click()
      console.log('clicked me')
    },

    async postBannerAd(){
       
      let bannerData = new FormData()
      bannerData.append('banner_ad[amount]', this.totalAmount)
      bannerData.append('banner_ad[duration]', this.Duration)
      bannerData.append('banner_ad[banner_type]', this.bannerType)
      bannerData.append('banner_ad[url]', this.url)

      if (this.bannerType === "SMALL" ) bannerData.append('banner_ad[sidebar_image]', this.DesktopFile)

      if(this.bannerType==="MEDIUM"){
        bannerData.append('banner_ad[listing_image]', this.DesktopFile, this.DesktopFile.name)
        bannerData.append('banner_ad[listing_mobile_image]', this.mobileFile, this.mobileFile.name)
      }
      if(this.bannerType==="LARGE"){
        bannerData.append('banner_ad[home_image]', this.DesktopFile, this.DesktopFile.name)
        bannerData.append('banner_ad[home_mobile_image]', this.mobileFile, this.mobileFile.name)
      }
      
      this.$store.commit('spinner/spin', true )
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const bannerAd = await this.$axios.post('/banner_ads', bannerData)
        this.email = bannerAd.data.email
        this.amount = bannerAd.data.amount
        this.reference = bannerAd.data.ref_no
        this.$store.dispatch('spinner/stopSpinning')
        this.initiatePayment()
      } catch(e){
        console.log(e)

         let payload = {
            msg: 'Something went wrong. Please try again',
            isActive: true
        }

        this.$store.commit('notify/failed', payload)
        this.$store.dispatch('notify/selfReset')
      }
    }
  },
  computed: {
    enabled(){
      if(this.bannerType !== '' && this.DesktopFile !== null && this.Duration !== '' && this.url !== ''){
        if(this.bannerType === 'SMALL'){
          return false
        }else if (this.mobileFile !== null){
          return false
        }else{
          return true
        }
        
      }else{
        return true
      }
    },
    Upload() {
      if (this.bannerType != '') {
        return true
      } else {
        false
      }
    },
    Price(){
      if(this.bannerType){
      let a;
      this.plans.forEach(e => {
        if(e.title === this.bannerType ){
          a = e
        }
      })
      return a.price
      }else{
        return 0
      }
    },

    totalAmount(){
      if(this.Duration >= 6 && this.Duration < 12){
        return (this.Price * this.Duration ) - ((this.Price * this.Duration) * 5/100)
      }
      else if( this.Duration >= 12){
        return (this.Price * this.Duration ) - ((this.Price * this.Duration) * 10/100)
      }
      else{
        return this.Price * this.Duration
      } 
    },
    SiteLocation(){
      if(this.bannerType){
      let a;
      this.plans.forEach(e => {
        if(e.title === this.bannerType ){
          a = e
        }
      })
      return a.location
      }
    },
    MobileUpload() {
      if (this.bannerType === 'MEDIUM' || this.bannerType === 'LARGE') {
        return true
      } else {
        return false
      }
    },
    tooltiplabel() {
      if (this.bannerType === 'SMALL') {
        return `${this.plans[0].size} For Banner Ads`
      } else if (this.bannerType === 'MEDIUM') {
        return `${this.plans[1].size} For Banner Ads`
      } else if (this.bannerType === 'LARGE') {
        return `${this.plans[2].size} For Banner Ads`
      }
    }
  }
}
</script>

<style>
@import '~/static/mobile.css';
</style>
