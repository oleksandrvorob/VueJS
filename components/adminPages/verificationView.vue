<template>
  <div class="verification-verify" v-if="contact.email !== undefined">
    <div class="tds-dashboard-profile">
      <p>
        <b>Name:</b> {{contact.name}}
      </p>
      <p>
        <b>Phone No:</b>{{contact.phone}}
      </p>
      <p>
        <b>Email :</b>{{contact.email}}
      </p>
      <p>
        <b>CAC file:</b> <a :href="baseUrl+images.cac_doc" target="_blank"> view </a>
      </p>
      <p>
        <b>Utility Bill:</b> <a :href="baseUrl+images.bill_doc" target="_blank"> view </a>
      </p>
      <div>
         <button class="button tds-primary-button"  style="margin:0;font-size:14px;float:right;" @click="verifyUser">
          verify
        </button>
      </div>

      <p class="date">
        <b>Date :</b> {{contact.created_at}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props:['contact'],
  data() {
    return {
      images:{},
      baseUrl: process.env.API_URL,
    }
  },
  methods: {
    verifyUser() {
      let confirmVerify = confirm('Do you want to Verify this user ?')
      if (confirmVerify) {
        try {
          let answer = confirm('Do you want to verify this Person')
          this.$axios.setToken(this.storage.token, 'Bearer')
          // await this.$axios.get('admin/verify-agent/'+this.$route.params.id+'?status='+ !this.agent.verified);

          let payload = {
            msg: 'Verified Sucessfully',
            isActive: true
          }

          this.$store.commit('notify/success', payload)
          this.$store.dispatch('notify/selfReset')
        } catch (error) {
           let payload = {
            msg: 'Something went wrong. Please try again',
            isActive: true
          }

          this.$store.commit('notify/failed', payload)
          this.$store.dispatch('notify/selfReset')
        }
      }
    },
    async getImages(){
      this.$axios.setToken(this.storage.token, 'Bearer');
      let images = await this.$axios.$get(`${this.contact.permalink}`)
      this.images = images
      console.log(images)
    }
  },
  created(){
    this.getImages()
  }
}
</script>

<style>
.verification-verify {
  padding: 30px !important;
  background: white;
}
.edit-user-modal .date {
  margin-top: 55px;
}
.tds-dashboard-profile {
  overflow: hidden;
}
.tds-message-component {
}
</style>
