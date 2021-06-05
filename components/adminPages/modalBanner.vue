<template>
    <div style="background:white;">
    <div class="advertise-payment">
      <div>
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
              Username:
              <b-field style="max-width:480px; width:100%">
                  <b-input type="text" v-model="username" validate expanded placeholder="Customer's Username"> </b-input>
              </b-field>
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
            <div align="center">
              <button class="button tds-primary-button" style="margin:20px auto !important" @click="postBannerAd"> Submit </button>
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>

</template>

<script>
import AdvertisePayment from '~/components/AdvertisePayment.vue'


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
      DesktopFile: null,
      mobileFile: null,
      isValid: false,
      username:''
    }
  },
  components: {
    AdvertisePayment,
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


    logFile(e) {
      console.log(this.DesktopFile)
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

    async postBannerAd(){

      let bannerData = new FormData()
      bannerData.append('amount', this.totalAmount)
      bannerData.append('username', this.username)
      bannerData.append('duration', this.Duration)
      bannerData.append('banner_type', this.bannerType)
      bannerData.append('url', this.url)

      if (this.bannerType === "SMALL" ) bannerData.append('sidebar_image', this.DesktopFile)

      if(this.bannerType==="MEDIUM"){
        bannerData.append('listing_image', this.DesktopFile, this.DesktopFile.name)
        bannerData.append('listing_mobile_image', this.mobileFile, this.mobileFile.name)
      }

      if(this.bannerType==="LARGE"){
        bannerData.append('home_image', this.DesktopFile, this.DesktopFile.name)
        bannerData.append('home_mobile_image', this.mobileFile, this.mobileFile.name)
      }

      this.$store.commit('spinner/spin', true )

      // console.log(bannerData)
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const bannerAd = await this.$axios.post('/admin/banners', bannerData)
        this.$store.dispatch('spinner/stopSpinning')
      } catch(e){
        console.log(e)

         let payload = {
            msg: 'Something went wrong. Please try again',
            isActive: true
        }

        this.$store.commit('notify/failed', payload)
        this.$store.dispatch('notify/selfReset')
      }

      this.$store.commit('spinner/spin', false )

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
