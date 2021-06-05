<template>
  <div class="tds-sign-up tds-contact only-login">
    <section class="tds-image-background tds-signin">
      <div class="container">
        <div class="tds-flex">
          <div class="tds-form-black">
            <div>
              <img src="/img/signin.png">
            </div>
          </div>
          <div class="tds-form-white">
            <form @submit.prevent="submit">
              <p align="center" class="tds-login-title">Log In</p>
              <input
                class="input"
                type="text"
                placeholder="Username / Email"
                required
                v-model="userName"
              >
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

                
              <p align="right">
                Forgot Password ?
                <nuxt-link to="/forgot-password">Reset</nuxt-link>
              </p>
              <input type="SUBMIT" value="SUBMIT" class="button tds-primary-button">
              <hr>
              <p align="center">
                Are you a new User?
                <nuxt-link to="/sign-up">Sign Up</nuxt-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
  <style>
.tds-sign-up {
  height: 100vh;
  padding-top: 60px;
}

.viewPassword{
  display: inline-block;
  position: relative;
  width:100%;
}
.viewPassword .button.eye{
    position: absolute;
    top: 2px;
    right: 0;
    width: auto;
    border: none;
    background: transparent;
}
</style>
  
<script>
export default {
  data() {
    return {
      userName: '',
      type:'password',
      image:'/img/view_password.png',
      password: ''
    }
  },
  methods: {
     showPassword(){
      if(this.type === 'password'){
        this.type = "text"
        this.image = " /img/view_password.png "
      }else{
        this.type = 'password'
        this.image = "/img/hide_password.png"
      }
    },
    async submit() {
      this.$store.commit('spinner/spin', true)

      let f = {
        email: this.userName.toLowerCase(),
        password: this.password,
        username: this.userName.toLowerCase()
      }
      try {
        const user = await this.$axios.post('user_token', { auth: f })
        // console.log(user.data.jwt)
        this.storage.token = user.data.jwt
        this.$store.commit('auth/login')
        this.$store.commit('spinner/spin', false)
        this.successful()
        this.$router.push({ path: '/' })

        this.Username = ''
        this.password = ''
        console.log(this.storage.token)
      } catch (e) {
        console.log('errrr', e.message)
        if(e.message === 'Network Error'){

          this.networkError()
          this.$store.commit('spinner/spin', false)
        }else{
          this.unsuccessful()
          this.$store.commit('spinner/spin', false)
        }
      }
    },
    unsuccessful() {
      let load = {
        isActive: true,
        msg: 'Incorrect Login Details'
      }
      this.$store.commit('notify/failed', load)
      this.$store.dispatch('notify/selfReset')
    },
    networkError(){
      let load = {
        isActive: true,
        msg: "Your internet is slow or you're not connected"
      }
      this.$store.commit('notify/failed', load)
      this.$store.dispatch('notify/selfReset')
    },
    successful() {
      let payload = {
        msg: 'Login Successful',
        isActive: true
      }

      this.$store.commit('notify/success', payload)
      this.$store.dispatch('notify/selfReset')
    }
  }
}
</script>
