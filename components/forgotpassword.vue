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
              <p align="center" class="tds-login-title">Forgot Password</p>
              <input
                class="input"
                type="email"
                placeholder="Email"
                required
                v-model="email"
              >
              <p align="right">
                Remembered Password ?
                <nuxt-link to="/login">Login</nuxt-link>
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
</style>
  
<script>
export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    async submit() {
      this.$store.commit('spinner/spin', true)

      let f = {
        email: this.email
      }
      try {
        const user = await this.$axios.patch('users/iforgot', { user: f })
        this.$store.commit('spinner/spin', false)
        this.successful()
        console.log(user.data)
        this.$router.push({ path: '/login' })
      } catch (e) {
        this.unsuccessful()
        this.$store.commit('spinner/spin', false)

        console.log(e)
      }
    },
    unsuccessful() {
      let load = {
        isActive: true,
        msg: `${this.email} doesn't exist. Please enter a valid email`
      }
      this.$store.commit('notify/failed', load)
      this.$store.dispatch('notify/selfReset')
    },
    successful() {
      let payload = {
        msg: 'A temporary password has been sent to your email',
        isActive: true
      }

      this.$store.commit('notify/success', payload)
      this.$store.dispatch('notify/selfReset')
    }
  }
}
</script>
