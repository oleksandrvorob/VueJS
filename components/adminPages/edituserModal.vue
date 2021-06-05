<template>
  <div class="tds-dashboard-profile">
    <div class="container" style="width:100%">
      <div align="center" v-if="currentUser !== {}">
        <div class="tds-profile-imageholder">
          <img :src="getuserimage" />
          <!-- <p class="fakeprofile" v-else-if="company !== '' && company !== null" > {{ company.slice(0, 1) }} </p>
          <p class="fakeprofile" v-else> {{ firstname.slice(0, 1) }} </p>
          <img v-if="company === '' && avatar === '' " src="/img/default_avatar.png" />-->
        </div>
        <b-upload v-model="file" accept="image/*" @input="change($event)" :loading="isLoading">
          <a class="button tds-primary-button">
            <b-icon icon="upload"></b-icon>
            <span>CHANGE PICTURE</span>
          </a>
        </b-upload>

        <a class="button tds-primary-button" style="background: red;" @click="deleteAvatar" :loading="isLoading">
          <b-icon icon="delete"></b-icon>
          <span>REMOVE PICTURE</span>
        </a>
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

      <hr style="margin: 40px 0;" />
      <div class="property-request-form" v-if="currentUser != {}">
        <form @submit.prevent="submit" class="tds-special-form" validate>
          <b-field horizontal label="Firstname">
            <b-input placeholder="Firstname" expanded type="text" v-model="firstname"></b-input>
          </b-field>
          <b-field horizontal label="Lastname">
            <b-input placeholder="Lastname" expanded type="text" v-model="lastname"></b-input>
          </b-field>
          <b-field horizontal label="Username">
            <b-input placeholder="Username" expanded type="text" v-model="username"></b-input>
          </b-field>
          <b-field horizontal label="Email">
            <b-input placeholder="Email" expanded type="email" v-model="email"></b-input>
          </b-field>

          <b-field horizontal label="Whatsapp Number">
            <div class="country-code">
              <b-autocomplete
                @input="logit_whatsapp"
                v-model="country_code_whatsapp"
                :open-on-focus="true"
                :data="codedata_whatsapp"
                placeholder="+234"
              >
                <template slot="empty">No results found</template>
              </b-autocomplete>
              <b-input placeholder="Whatsapp Number" expanded type="number" v-model="whatsapp"></b-input>
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
              >
                <template slot="empty">No results found</template>
              </b-autocomplete>
              <b-input placeholder="Phone Number" expanded type="number" v-model="phone"></b-input>
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
            <b-input placeholder="Company" expanded type="text" v-model="company"></b-input>
          </b-field>
          <b-field horizontal label="Street">
            <b-input placeholder="Street" expanded type="text" v-model="street"></b-input>
          </b-field>
          <b-field horizontal label="City">
            <b-input placeholder="City" expanded type="text" v-model="city"></b-input>
          </b-field>
          <b-field horizontal label="State">
            <b-input placeholder="State" expanded type="text" v-model="state"></b-input>
          </b-field>
          <b-field horizontal label="About" v-if="aboutUser">
            <b-input placeholder="About" expanded type="textarea" v-model="about"></b-input>
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
      codedata_whatsapp: [],
      countryCode_whatsapp: countryCode,
      countryCode,
      account_type: '',
      country_code: '',
      phone: '',
      email: '',
      username: '',
      whatsapp: '',
      country_code_whatsapp: '',
      company: '',
      firstname: '',
      lastname: '',
      newPassword: '',
      street: '',
      city: '',
      state: '',
      about: '',
      isLoading: false,
      file: null,
      avatar: '',
      currentUser: {},
      baseUrl: process.env.API_URL,
      aboutUser: false
    }
  },
  watch: {
    account_type: function() {
      if (this.account_type === 'PROPERTY_OWNER') {
        this.aboutUser = false
      } else if (this.account_type === 'INDIVIDUAL') {
        this.aboutUser = false
      } else {
        this.aboutUser = true
      }
    }
  },
  computed: {
    whatsappNumber() {
      return this.country_code_whatsapp + this.whatsapp
    },
    addedWhatsappNumber() {
      if (this.country_code_whatsapp || this.whatsapp) {
        return true
      } else {
        false
      }
    },
    getuserimage() {
      if (this.avatar === '') {
        return '/img/default_avatar.png'
      } else if (this.avatar === undefined) {
        return '/img/default_avatar.png'
      } else {
        return this.baseUrl + this.avatar
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
    error(){
      let load = {
        isActive: true,
        msg: 'Failed to make changes'
      }
      this.$store.commit('notify/failed', load)
      this.$store.dispatch('notify/selfReset')
    },
    change(e) {
      console.log(e)
      const reader = new FileReader()
      let avatarData = new FormData()
      avatarData.append('user[avatar]', this.file, this.file.name)
      this.avatar = ''
      // reader.readAsDataURL(e)
      // reader.onload = event => {
      //   this.avatar = event.target.result
      // }
      this.updateAvatar(avatarData)
    },
    async getUserData() {
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const userData = await this.$axios.$get(
          `/users/${this.$route.params.id}`
        )

        console.log(userData)
        this.avatar = userData.avatar
        this.currentUser = userData
        this.phone = userData.phone
        this.lastname = userData.l_name
        this.firstname = userData.f_name
        this.account_type = userData.account_type
        this.country_code = userData.country_code
        this.company = userData.company

        this.about = userData.about
        this.whatsapp = userData.whatsapp
        this.country_code_whatsapp = userData.country_code_whatsapp
        this.username = userData.username
        this.email = userData.email


        if (userData.address.city) this.city = userData.address.city
        if (userData.address.state) this.state = userData.address.state
        if (userData.address.street) this.street = userData.address.street
      } catch (e) {
        console.log(e)
      }
    },

    async updateAvatar(data) {
      this.$store.commit('spinner/spin', true)
      let url = this.$route.params.id
      this.loading = true
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const avatar = await this.$axios.patch(`/users/${url}`, data)
        this.avatar = avatar.data.avatar
        this.loading = false
        this.next()
        this.$store.commit('spinner/spin', false)

      } catch (e) {
        console.log(e)
        this.error()
        this.loading = false
        this.$store.commit('spinner/spin', false)
      }
    },
    async deleteAvatar() {
      let confirmdelete = confirm('Do you want to delete this Avatar')

      if (confirmdelete && this.avatar !== '') {
        this.$store.commit('spinner/spin', true)

        let url = this.$route.params.id

        try {
          this.$axios.setToken(this.storage.token, 'Bearer')
          const avatar = await this.$axios.delete(`users/delete-avatar/${url}`)
          this.avatar = ''
          this.next()
          this.$store.commit('spinner/spin', false)

        } catch (error) {
          console.log(error)
          this.$store.commit('spinner/spin', false)

        }
      } else {
        alert('avatar is empty')
        this.error()
      }
    },

    async changePassword() {
      let f = {
        password: this.newPassword
      }

      try {
        this.$store.commit('spinner/spin', true)

        this.$axios.setToken(this.storage.token, 'Bearer')
        const passwordUpdate = await this.$axios.patch(
          `users/${this.$route.params.id}`,
          { user: f }
        )

        let load = {
          isActive: true,
          msg: 'Password change successful'
        }
        this.$store.commit('notify/success', load)
        this.$store.dispatch('notify/selfReset')
        this.$store.commit('spinner/spin', false)

      } catch (e) {
        let load = {
          isActive: true,
          msg: 'Something went wrong... Try again'

        }
        this.$store.commit('notify/failed', load)
        this.$store.dispatch('notify/selfReset')
        console.log(e)
        this.$store.commit('spinner/spin', false)

      }
    },

    async submit() {
      if (this.whatsappNumber !== '') {
        console.log(this.whatsappNumber)
      }
      let f = {
        phone: this.phone,
        username: this.username,
        email: this.email,
        l_name: this.lastname,
        f_name: this.firstname,
        company: this.company,
        about: this.about,
        country_code: this.country_code,
        account_type: this.account_type,
        whatsapp: this.whatsapp,
        country_code_whatsapp: this.country_code_whatsapp,
        address: {
          city: this.city,
          street: this.street,
          state: this.state
        }
      }

      let url = this.$route.params.id

      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const userData = await this.$axios.$patch(`/users/${url}`, { user: f })
        console.log('userData', userData)
        this.currentUser = userData

        this.$store.commit('admin/closemodal', false)

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
.control.has-icons-right.is-expanded {
  width: 100%;
}
</style>
