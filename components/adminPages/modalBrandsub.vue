<template>
  <div class="advertise-payment" style="background:white;">
    <div class="tds-title-tab">Logo Details</div>

    <div class="tds-payment-holder">
      <div class="tds-tab-title-tile">
        Duration:
        <div class="select">
          <select v-model="duration">
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
        Username:
        <b-field style="max-width:480px; width:100%">
          <b-input
            type="text"
            v-model="username"
            validate
            expanded
            required
            placeholder="Customer's Username"
          ></b-input>
        </b-field>
      </div>
      <div class="tds-tab-title-tile">
        URL:
        <b-field style="max-width:480px; width:100%">
          <b-input
            type="url"
            v-model="url"
            validate
            expanded
            required
            placeholder="https://2dotsproperty.com"
          ></b-input>
        </b-field>
      </div>
      <div align="center">
        <button
          class="button tds-primary-button"
          style="margin:20px auto !important"
          @click="postBrand"
        >Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
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
      duration: '',
      url: '',
      username: ''
    }
  },
  components: {},
  computed: {},
  methods: {
    callback(response) {
      let payload = {
        token: this.storage.token,
        reference: response.reference,
        actionLink: 'subscribe-brand'
      }
      this.$store.dispatch('transaction/verifyPayment', payload)
      console.log(response.reference)
    },

    close() {
      console.log('Payment closed')
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

    async postBrand() {
      let brandData = new FormData()
      brandData.append('amount', this.totalAmount)
      brandData.append('duration', this.duration)
      brandData.append('url', this.url)
      brandData.append('logo', this.file)
      brandData.append('username', this.username)

      this.$store.commit('spinner/spin', true)
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const brand = await this.$axios.post('/admin/brands', brandData)
        this.$store.dispatch('spinner/stopSpinning')

        let payload = {
          msg: 'Successful',
          isActive: true
        }

        this.$store.commit('notify/success', payload)
      } catch (e) {
        console.log(e)

        let payload = {
          msg: 'Something went wrong. Please try again',
          isActive: true
        }

        this.$store.commit('notify/failed', payload)
        this.$store.dispatch('notify/selfReset')
        this.$store.commit('spinner/spin', false)
      }
    }
  },
  computed: {
    totalAmount() {
      return this.duration * this.plans.price
    }
  }
}
</script>

<style>
@import '~/static/mobile.css';
</style>