<template>
  <div class="tds-contact-us">
    <section class="tds-image-background tds-contact">
      <div class="container">
        <div class="tds-flex">
          <div class="tds-form-black">
            <div style="max-width:350px;">
              <h2>Get In touch with Us</h2>
              <p>
                There are many ways to get in touch with us.
                <br />Choose your preferred method.
                We shall be at the other end.
                <br />
              </p>
              <!-- <p>Pent Floor, Akron House, 94 Allen Avenue, Ikeja, Lagos</p> -->
              <p>
                <a href="https://wa.me/2348090665714">WhatsApp: +2348090665714</a>
                <br />support@2dotsproperties.com
                <br />www.2DotsProperties.com
                <br />
              </p>
              <p class="tds-contact-icon">
                <a href="https://www.facebook.com/2dotsproperties" target="_blank">
                  <img src="/img/facebook_round.png" />
                </a>
                <a href="https://twitter.com/2dotsproperties" target="_blank">
                  <img src="/img/twitter_round.png" />
                </a>
                <a href="https://www.instagram.com/2dotsproperties_ng/" target="_blank">
                  <img src="/img/instagram_round.png" />
                </a>
                <a href="https://www.linkedin.com/company/2dotsproperties" target="_blank">
                  <img src="/img/linkedin_round.png" />
                </a>
              </p>
            </div>
          </div>
          <div class="tds-form-white">
            <form @submit.prevent="submit">
              <input class="input" type="text" placeholder="Name" required v-model="name" />
              <input
                class="input"
                type="email"
                placeholder="Email"
                required
                v-model="email"
                autocomplete
              />
              <input
                class="input"
                type="number"
                placeholder="Phone Number"
                required
                min="7"
                v-model="phoneNumber"
              />
              <textarea class="textarea" placeholder="Message" required v-model="message"></textarea>
              <input type="SUBMIT" value="SUBMIT" class="button" />
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      phoneNumber: '',
      message: '',
      title: 'Contact Page - 2Dots Properties'
    }
  },
  methods: {
    hideSearchBar(payload){
      this.$store.commit('common/updateIsIndex', payload)
    },
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', {
        marginTop: m,
        paddingTop: p
      })
    },
    async submit() {
      this.$store.commit('spinner/spin', true)

      if (
        this.name !== '' &&
        this.email !== '' &&
        this.phoneNumber !== '' &&
        this.message !== ''
      ) {
        let contact = {
          owner: 'ADMIN',
          phone: this.phoneNumber,
          email: this.email,
          body: this.message,
          name: this.name
        }

        await this.$store.dispatch('contact/postMessage', contact)

        // this.$axios.setToken(this.storage.token)
        // await this.$axios.post('contacts', contact)
        if (this.$store.state.contact.empty) {
          ;(this.name = ''),
            (this.email = ''),
            (this.phoneNumber = ''),
            (this.message = '')
        }

        this.$store.commit('spinner/spin', false)
      }
    }
  },
  created() {
    this.updateTopSpaces(0, 0),
    this.hideSearchBar(false)
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
          hid: 'Contact 2DotsProperties ',
          name: 'Contact 2DotsProperties ',
          content:
            ' There are many ways to get in touch with us. Choose your preferred method. We shall be at the other end. support@2dotsproperties.com www.2DotsProperties.com  '
        }
      ]
    }
  }
}
</script>

<style>
</style>
