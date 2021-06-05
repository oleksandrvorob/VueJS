<template>
  <div class="tds-dashboard-profile">
    <div class="tds-avatar-cover"></div>
    <div></div>
    <div class="container">
      <div align="center">
        <div class="tds-profile-imageholder">
          <img :src="avatar" v-if="avatar !== '' " >
          <p class="fakeprofile" v-else-if="company !== '' " > {{ company.slice(0, 1) }} </p>
          <img v-if="company === '' && avatar === '' " src="/img/default_avatar.png" />
        </div>
        <b-upload v-model="file" accept="image/*" @input="change($event)" :loading="isLoading">
          <a class="button tds-primary-button">
            <b-icon icon="upload"></b-icon>
            <span>CHANGE PICTURE</span>
          </a>
        </b-upload>
        <p>
          <b>{{currentUser.company}}</b>
        </p>
        <p>
          <b>{{phone}}</b>
        </p>
        <p>
          <b>{{email}}</b>
        </p>
      </div>
    </div>
    <div>
      <div class="property-request-form">

        <form @submit.prevent="changePassword" class="tds-special-form" validate>
            <b-field horizontal label="Old Password">
              <b-input placeholder="Old Password" expanded type="password" v-model="oldPassword"></b-input>
            </b-field>

            <b-field horizontal label="New Password">
              <b-input placeholder="New Password" expanded type="password" v-model="newPassword"></b-input>
            </b-field>

            <b-field horizontal>
              <p>
                <button class="button tds-primary-button">CHANGE PASSWORD</button>
              </p>
            </b-field>
        </form>
      </div>

<hr style="margin: 40px 0;">
      <div class="property-request-form" v-if="currentUser != {}">
        <form @submit.prevent="submit" class="tds-special-form" validate>
          <b-field horizontal label="Firstname">
            <b-input placeholder="Firstname" expanded required type="text" v-model="firstname"></b-input>
          </b-field>
          <b-field horizontal label="Lastname">
            <b-input placeholder="Lastname" expanded required type="text" v-model="lastname"></b-input>
          </b-field>
          <b-field horizontal label="Username">
            <b-input placeholder="Username" expanded disabled type="text" v-model="username"></b-input>
          </b-field>
          <b-field horizontal label="Email">
            <b-input placeholder="Email" expanded disabled type="email" v-model="email"></b-input>
          </b-field>

          <b-field horizontal label="Whatsapp Number">
            <div class="country-code">
              <b-autocomplete
                @input="logit_whatsapp"
                v-model="country_code_whatsapp"
                :open-on-focus="true"
                :data="codedata_whatsapp"
                placeholder="+234"
                :required="addedWhatsappNumber"
              >
                <template slot="empty">No results found</template>
              </b-autocomplete>
              <b-input placeholder="Whatsapp Number" expanded type="number" v-model="whatsapp" :required="addedWhatsappNumber"></b-input>
            </div>
          </b-field>


          <b-field horizontal label="Phone Number">
            <div class="country-code">
              <b-autocomplete
                @input="logit"
                v-model="country_code"
                :open-on-focus="true"
                :data="codedata"
                placeholder="+234"
                required
              >
                <template slot="empty">No results found</template>
              </b-autocomplete>
              <b-input placeholder="Phone Number" expanded required type="number" v-model="phone"></b-input>
            </div>
          </b-field>





          <b-field horizontal label="Account Type" class="accountType">
            <b-select placeholder="Change account type" v-model="account_type" @input="logit()">
              <option value="ESTATE_AGENT">Estate Agent</option>
              <option value="INDIVIDUAL">Individual</option>
              <option value="PROPERTY_OWNER">Property Owner</option>
              <option value="PROPERTY_DEVELOPER">Property Developer</option>
            </b-select>
          </b-field>

          <b-field horizontal label="Company" v-if="aboutUser">
            <b-input placeholder="Company" expanded required type="text" v-model="company"></b-input>
          </b-field>
          <b-field horizontal label="Street">
            <b-input placeholder="Street" expanded required type="text" v-model="street"></b-input>
          </b-field>
          <b-field horizontal label="City">
            <b-input placeholder="City" expanded required type="text" v-model="city"></b-input>
          </b-field>
          <b-field horizontal label="State">
            <b-input placeholder="State" expanded required type="text" v-model="state"></b-input>
          </b-field>
          <b-field horizontal label="About" v-if="aboutUser">
            <b-input placeholder="About" expanded required type="textarea" v-model="about"></b-input>
          </b-field>
          <b-field horizontal>
            <p>
              <button class="button tds-primary-button">SAVE CHANGES</button>
            </p>
          </b-field>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import countryCode from '~/components/countryCodes'
export default {
  data() {
    return {
      codedata: [],
      codedata_whatsapp:[],
      countryCode_whatsapp:countryCode,
      countryCode,
      account_type: '',
      country_code: '',
      phone: '',
      whatsapp:'',
      country_code_whatsapp:'',
      company: '',
      firstname: '',
      lastname: '',
      oldPassword:'',
      newPassword:'',
      street: '',
      city: '',
      state: '',
      about: '',
      isLoading: false,
      file: null,
      avatar: '',
      currentUser: {},
      baseUrl: process.env.API_URL,
      aboutUser:false
    }
  },
  watch:{
    account_type: function(){
      if (this.account_type === 'PROPERTY_OWNER' ){
          this.aboutUser = false
        } else if(this.account_type === 'INDIVIDUAL' ){
          this.aboutUser = false
        } else {
          this.aboutUser = true
      }
    }
  },
  computed: {
    username() {
      return this.$store.state.auth.currentUser.username
    },
    email() {
      return this.$store.state.auth.currentUser.email
    },
    whatsappNumber(){
      return  this.country_code_whatsapp + this.whatsapp
    },
    addedWhatsappNumber(){
      if (this.country_code_whatsapp || this.whatsapp){
        return true
      }else{
        false
      }
    }
  },
  middleware: 'auth',
  methods: {

    logit() {
      this.codedata = []
      var countryCode = this.countryCode
      countryCode.forEach(e => {
        if (e.dial_code.includes(this.country_code)) {
          this.codedata.push(e.dial_code)
        }
      })
    },
    logit_whatsapp() {
      this.codedata_whatsapp = []
      var countryCode_whatsapp = this.countryCode_whatsapp
      countryCode_whatsapp.forEach(e => {
        if (e.dial_code.includes(this.country_code_whatsapp)) {
          this.codedata_whatsapp.push(e.dial_code)
        }
      })
    },
    next() {
      let load = {
        isActive: true,
        msg: 'Saved changes'
      }
      this.$store.commit('notify/success', load)
      this.$store.dispatch('notify/selfReset')
    },
    change(e) {
      console.log(e)
      const reader = new FileReader()
      let avatarData = new FormData()
      avatarData.append('user[avatar]', this.file, this.file.name)
      reader.readAsDataURL(e)
      reader.onload = event => {
        this.avatar = event.target.result
      }
      this.updateAvatar(avatarData)
    },
    async getUserData() {
      let url = this.username

      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const userData = await this.$axios.$get(`/users/${url}`)
        console.log(userData)
        this.currentUser = userData
        this.phone = userData.phone
        this.lastname = userData.l_name
        this.firstname = userData.f_name
        this.account_type = userData.account_type
        this.country_code = userData.country_code
        this.company = userData.company
        this.city = userData.address.city
        this.state = userData.address.state
        this.street = userData.address.street
        this.about = userData.about
        this.avatar = this.baseUrl + userData.avatar
        this.whatsapp = userData.whatsapp
        this.country_code_whatsapp = userData.country_code_whatsapp
      } catch (e) {
        console.log(e)
      }
    },

    async updateAvatar(data) {
      let url = this.username
      this.loading = true
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const avatar = await this.$axios.patch(`/users/${url}`, data)
        this.loading = false
        this.next()
      } catch (e) {
        console.log(e)
        this.loading = false
      }
    },

    async changePassword(){
      let f = {
        old_password: this.oldPassword,
        new_password: this.newPassword
      }

      try{
        this.$axios.setToken(this.storage.token, 'Bearer')
        const passwordUpdate = await this.$axios.patch("users/change-password", {user: f})

        let load = {
          isActive:true,
          msg: 'Password change successful'
        }
        this.$store.commit('notify/success', load);
        this.$store.dispatch('notify/selfReset')

        console.log(passwordUpdate)
      } catch (e){

        let load = {
          isActive:true,
          msg: 'Something went wrong... Try again'
        }
        this.$store.commit('notify/failed', load);
        this.$store.dispatch('notify/selfReset')
        console.log(e)
      }
    },

    async submit() {
      if(this.whatsappNumber !== ''){
        console.log(this.whatsappNumber)
      }
      let f = {
        phone: this.phone,
        l_name: this.lastname,
        f_name: this.firstname,
        company: this.company,
        about: this.about,
        country_code: this.country_code,
        account_type: this.account_type,
        whatsapp:this.whatsapp,
        country_code_whatsapp:this.country_code_whatsapp,
        address: {
          city: this.city,
          street: this.street,
          state: this.state
        }
      }



      let url = this.username

      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const userData = await this.$axios.patch(`/users/${url}`, { user: f })
        this.currentUser = userData
        this.next()
      } catch (e) {
        console.log(e)
      }
    }
  },
  created() {},
  mounted() {
    this.$store.commit('auth/parseJwt', this.storage.token)
    this.getUserData()

  }
}
</script>

<style>
.country-code {
  display: flex;
  justify-content: flex-start !important;
}
.accountType .select,
.accountType .select select {
  width: 100%;
}
.country-code input {
  width: 100%;
}
.country-code .control.is-expanded.is-clearfix {
  max-width: 490px;
  width: 100%;
}
.control.has-icons-right.is-expanded{
  width: 100%;
}
</style>
