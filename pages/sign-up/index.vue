
import { try } from 'q';
<template>
  <div class="tds-contact just-sign-up">
    <div class="tds-sign-up">
      <section class="tds-image-background tds-signup">
        <div class="container">
          <div class="tds-flex">
            <div class="tds-form-black">
              <div>
                <h2>Welcome Back</h2>
                <img src="/img/signup.png" />
              </div>
            </div>
            <div class="tds-form-white">
              <form @submit.prevent="submit">
                <p align="center" class="tds-login-title">Sign Up</p>
                <input
                  class="input"
                  type="text"
                  placeholder="First Name"
                  required
                  v-model="firstName"
                />

                <input
                  class="input"
                  type="text"
                  placeholder="Last Name"
                  required
                  v-model="lastName"
                />

                <input class="input" type="text" placeholder="Username" required v-model="userName" />

                <input class="input" type="email" placeholder="Email" required v-model="email" />

                <div class="viewPassword">
                  <input
                  class="input"
                  :type="type"
                  placeholder="Password"
                  required
                  v-model="password"
                />
                  <span class="button eye" @click="showPassword"> <img :src="image" width="26" /> </span>
                </div>
                

                <span>
                  <select required v-model="accountType" class="select is-fullwidth input">
                    <option selected disabled value>Account Type</option>
                    <option value="ESTATE_AGENT">Estate Agent</option>
                    <option value="INDIVIDUAL">Individual</option>
                    <option value="PROPERTY_OWNER">Property Owner</option>
                    <option value="PROPERTY_DEVELOPER">Property Developer</option>
                  </select>
                </span>

                <input class="input" type="text" placeholder="Company Name" required v-model="CompanyName" v-if="accountType === 'ESTATE_AGENT' || accountType === 'PROPERTY_DEVELOPER' "/>

                <b-radio
                  v-model="agree"
                  native-value="agree"
                  type="is-info"
                  required
                  class="sign-up-radio"
                >
                  <p class="tds-agree">
                    Creating an account you agree to our
                    terms of service and privacy policy,
                  </p>
                </b-radio>

                <input type="SUBMIT" value="CREATE ACCOUNT" class="button tds-primary-button" />

                <hr />
                <p align="center">
                  Already a member?
                  <nuxt-link to="/login">Sign in</nuxt-link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      password: '',
      accountType: '',
      email: '',
      type:'password',
      image:'/img/view_password.png',
      agree: false,
      lastName: '',
      firstName: '',
      CompanyName:'',
      title: 'Sign up - 2Dots Properties'
    }
  },
  methods: {
     hideSearchBar(payload){
      this.$store.commit('common/updateIsIndex', payload)
    },
    showPassword(){
      if(this.type === 'password'){
        this.type = "text"
        this.image = " /img/view_password.png "
      }else{
        this.type = 'password'
        this.image = "/img/hide_password.png"
      }
    },
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', {
        marginTop: m,
        paddingTop: p
      })
    },
    checkForError() {
      var a = this.userName.split(' ')

      let testExp = new RegExp('[^A-Za-z0-9-_]');

      let testresult = testExp.test(this.userName);

      if (testresult === true) {
        let mgs = 'Username cannot contain SPACES or SPECIAL CHARACTERS'
        this.error(mgs)
        return false
      } else {
        this.userName = a[0].replace('.', '')
        return true
      }
    },
    async submit() {
      this.$store.commit('spinner/spin', true)

      if (this.checkForError()) {
        if (this.agree) {
          let f = {
            username: this.userName.toLowerCase(),
            password: this.password,
            account_type: this.accountType,
            l_name: this.lastName,
            f_name: this.firstName,
            email: this.email.toLowerCase(),
            company:this.CompanyName
          }
          try {
            const user = await this.$axios.post('users', { user: f })
            console.log(user)
            let msg = `Your Account Was Successfully Created - WELCOME: ${
              this.firstName
            }`
            this.success(msg)
            this.$store.commit('spinner/spin', false)

            this.$router.push({ path: '/login' })
          } catch (e) {

            if(e.message === 'Network Error'){
              let msg = "Your internet is slow or you're not connected"
              this.error(msg)
            }else{
              let msg = e.response.data.message
              this.error(msg)
            }

            this.$store.commit('spinner/spin', false)

          }
        } else {
          this.$store.commit('spinner/spin', false)

          let mgs = 'Agree to our Terms & conditions'
          this.error(mgs)
        }
      }
      this.$store.commit('spinner/spin', false)
    },
    error(mgs) {
      let payload = {
        msg: mgs,
        isActive: true
      }
      this.$store.commit('notify/failed', payload)
      this.$store.dispatch('notify/selfReset')
    },

    success(mgs) {
      let payload = {
        msg: mgs,
        isActive: true
      }
      this.$store.commit('notify/success', payload)
      this.$store.dispatch('notify/selfReset')
    }
  },
  created() {
    this.updateTopSpaces(0, 0);
    this.hideSearchBar(false);
  },
  beforeDestroy(){
    this.hideSearchBar(true);
    this.updateTopSpaces(136,50);
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'Sign Up Page',
          name: 'Sign Up Page',
          content: 'Sign Up Page'
        }
      ]
    }
  }
}
</script>

<style>
.viewPassword{
  display: inline-block;
  position: relative;
  width:100%;
}
.viewPassword .button{
    position: absolute;
    top: 2px;
    right: 0;
    width: auto;
    border: none;
    background: transparent;
}
.tds-sign-up {
  height: 100vh;
  padding-top: 60px;
}
@media screen and (max-width: 900px) {
  .tds-sign-up {
    height: auto;
    padding-top: 60px;
    margin-bottom: -61px;
  }
  .tds-agree {
    margin-top: 10px;
    margin-bottom: 10px;
    color: white;
  }
  .sign-up-radio {
    text-align: center;
  }
}
</style>
