<template>
  <div class="container tds-advertise-cards banner-ads">
    <header align="center" class="tds-titles">
      <b>Partnered</b> Brands
      <hr>
    </header>
    <div class="column is-full tds-column-grey">
      Partnered Brands are clients that opt to display their corporate
      logos or promos on our homepage. This ensures maximum visibility for such brands.
      <br>Partnered brands Ads are clickable and direct traffic to the corporate websites of such brands.
      This ensures brands can measure the effectiveness of their advertising spend while promoting their business.
      <br>
    </div>
    <div class="banner-ads-grid">
      <div class="subscription-card">
        <p style="font-size: 16px">
          <b>{{plans.title}}</b>
        </p>
        <p class="tds-subcard-item-price">
          {{plans.price | currency}}
          <span style="font-size:15px;">/month</span>
        </p>
        <div class="tds-subcard-item">
          <p style="font-size: 16px">
            <span>Height :</span>
            <span>{{plans.height}}px</span>
          </p>
        </div>
        <div class="tds-subcard-item">
          <p style="font-size: 16px">
            <span>Width :</span>
            <span>{{plans.width}}px</span>
          </p>
        </div>
      </div>
    </div>

    <div class="column is-full tds-column-grey-empty"></div>

    <div class="advertise-payment">
      <div class="tds-grid">
        <div class="responsive-payment">
          <div class="tds-title-tab">Logo Details</div>

          <div class="tds-payment-holder">
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
              Select
              <div style="display:flex;width: 478px;">
                <b-tooltip label="484px X 334px For Banner Ads" type="is-black" position="is-right">
                  <b-field class="file">
                    <b-upload v-model="file" accept="image/*" @input="validateImage">
                      <a class="button is-black">
                        <b-icon icon="upload"></b-icon>
                        <span>Click to upload</span>
                      </a>
                    </b-upload>

                    <span class="file-name" v-if="file">{{file.name }}</span>
                  </b-field>
                </b-tooltip>
              </div>
            </div>

            <div class="tds-tab-title-tile">
              URL:
              <b-field style="max-width:480px; width:100%">
                  <b-input type="url" v-model="url" validate expanded required placeholder="https://2dotsproperty.com"> </b-input>
              </b-field>
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
                  <td>Duration</td>
                  <td class="is-title" v-show="Duration">
                    <b>{{Duration}} {{ Duration === 1? 'Month' : 'Months'}}</b>
                  </td>
                </tr>
                <tr></tr>
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
                  <td>{{200000 | currency}}</td>
                </tr>
                <tr v-if="Duration >= 6 && Duration <= 11">
                  <td>Discount</td>
                  <td>5%</td>
                </tr>
                <tr v-if="Duration === 12">
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
                  <td>{{ totalAmount | currency}}</td>
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
              <button class="button tds-primary-button" :disabled="enabled" @click="postBrand">MAKE PAYMENT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdvertisePayment from '~/components/AdvertisePayment.vue'
import paystack from 'vue-paystack'

export default {
  data() {
    return {
      plans: {
        price: 200000,
        height: 334,
        width: 484,
        title: 'Partnered Brand'
      },
      file: null,
      Duration: '',
      Payment_Method: 'Paystack',
      url: '',

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
    paystack
  },
  computed: {
    totalAmount() {
      if (this.Duration >= 6 && this.Duration < 12) {
        return (
          this.plans.price * this.Duration -
          (this.plans.price * this.Duration * 5) / 100
        )
      } else if (this.Duration >= 12) {
        return (
          this.plans.price * this.Duration -
          (this.plans.price * this.Duration * 10) / 100
        )
      } else {
        return this.plans.price * this.Duration
      }
    },
    enabled() {
      if (
        this.file !== null &&
        this.Duration !== '' &&
        this.Payment_Method !== '' &&
        this.url != ''

      ) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    callback(response){
      let payload = {
        token: this.storage.token,
        reference: response.reference,
        actionLink: 'subscribe-brand',
      }
      this.$store.dispatch('transaction/verifyPayment', payload)
      console.log(response.reference)
    },

    close(){
      console.log("Payment closed")
    },

    validateImage(e) {
      const reader = new FileReader()
      reader.readAsDataURL(e)
      var image = new Image()
      reader.onload = event => {
        image.src = event.target.result

        image.onload = e => {
          if (
            this.plans.height !== e.path[0].height &&
            this.plans.width !== e.path[0].width
          ) {
            let load = {
              isActive: true,
              msg: 'Image Height or Width is incorrect'
            }
            this.$store.commit('notify/failed', load)
            this.$store.dispatch('notify/selfReset')
            this.file = null
          }
        }
      }
    },

    initiatePayment(){
      this.$refs.paystack.click()
      console.log('clicked me')
    },

    async postBrand(){
       
      let brandData = new FormData()
      brandData.append('brand[amount]', this.totalAmount)
      brandData.append('brand[duration]', this.Duration)
      brandData.append('brand[url]', this.url)
      brandData.append('brand[logo]', this.file)

      this.$store.commit('spinner/spin', true )
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const brand = await this.$axios.post('brands', brandData)
        this.email = brand.data.email
        this.amount = brand.data.amount
        this.reference = brand.data.ref_no
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
  }
}
</script>

<style>
@import '~/static/mobile.css';
</style>