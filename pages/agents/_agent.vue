<template>
  <div class="tds-mobilenegative-margin container tds-page-content">
    <div v-if="show">
      <div class="agent-profile-flex" :class="{'about-agent-profile-flex': aboutAgent}">
        <section>
          <div class="agent-contact-div">
            <div class="agent-profile-image">
              <img :src="baseUrl+agent.avatar" v-if="agent.avatar" />
              <p v-if="!agent.avatar" class="fakeprofile">{{ fakeprofile}}</p>
            </div>
            <div class="agent-profile-contact">
              <header class="tds-titles">
                <b>{{agent.company || agent.name}}</b>
              </header>

              <p v-if="edit">
                <img src="/img/agent.png" width="20px" class="agent-contact-icon" />
                <span id="contact">{{format(agent.account_type)}}</span>
              </p>
              <p>
                <img src="/img/phone.png" width="20px" class="agent-contact-icon" />
                <a :href="'tel:'+agent.phone" id="contact">{{agent.phone}}</a>
              </p>
              <p>
                <img src="/img/mail.png" width="20px" class="agent-contact-icon" />
                <span id="contact">{{agent.email}}</span>
              </p>
              <p>
                <img src="/img/location.png" width="20px" class="agent-contact-icon" />
                <span id="contact">{{agent.location}}</span>
              </p>
              <p v-if="agent.whatsapp" class="agent-contact-icon">
                <img src="/img/whatsapp.png" width="20" />
                <span style="padding-left: 9px;">
                  <a
                    :href="`https://api.whatsapp.com/send?phone=${whatsapp}&text=Please tell me more about this - https://2dotsproperties.com/agents/${$route.params.agent}&source=&data=`"
                    target="_blank"
                  >{{agent.whatsapp}}</a>
                </span>
              </p>

              <p style="position: relative">
                <span
                  v-if="agent.verified"
                  class="bta bta-boost"
                  style="font-size:10px; font-weight:bold; color:white;padding:8px 15px; top:0;position: relative;"
                >verified</span>
              </p>
            </div>
          </div>

          <div class="tds-primary-button btn-holder" v-if="edit">
            <nuxt-link to="/profile" v-if="edit">Edit Profile</nuxt-link>
            <span style="margin:0 10px">|</span>
            <nuxt-link :to="'/p/requests/?username='+username" v-if="edit">My Post Requests</nuxt-link>
            <span style="margin:0 10px" v-if="!agent.verified">|</span>
            <span @click="openVerify" v-if="!agent.verified">Verify Me</span>
          </div>
        </section>

        <article v-if="!aboutAgent">
          <header class="tds-titles">
            <b>About</b>
            <hr />
          </header>
          <div class="tds-agent-about">
            <p v-html="agent.about" class="long-description"></p>
          </div>
        </article>
      </div>
    </div>
    <div class="container">
      <contact :agent="agent" :edit="edit" />
    </div>

    <b-modal :active.sync="isVerifyModalActive">
      <div class="verify_background my-subscription">
        <div>
          <div class="tds-title-tab">
            <h1>
              <b>User Verification</b>
            </h1>
          </div>
          <div class="tds-payment-holder">
            <p>To become a verified user, you need to upload the following: CAC Registration Document, Utility Bill (Not older than 3months).</p>
          </div>
        </div>
        <div>
          <div class="tds-title-tab">
            <h1>
              <b>C A C Registration Certificate</b>
            </h1>
          </div>
          <div class="tds-payment-holder">
            <p>
              <b-field class="file">
                <b-upload v-model="CACfile" accept="image/*">
                  <a class="button is-black">
                    <b-icon icon="upload"></b-icon>
                    <span>Click to upload</span>
                  </a>
                </b-upload>
                <span class="file-name" v-if="CACfile">{{ CACfile.name }}</span>
              </b-field>
            </p>
          </div>
        </div>
        <div>
          <div class="tds-title-tab">
            <h1>
              <b>Utility Bill</b>
              <br />
              <i>Not Longer than 3 months</i>
            </h1>
          </div>
          <div class="tds-payment-holder">
            <p>
              <b-field class="file">
                <b-upload v-model="utilityBill" accept="image/*">
                  <a class="button is-black">
                    <b-icon icon="upload"></b-icon>
                    <span>Click to upload</span>
                  </a>
                </b-upload>
                <span class="file-name" v-if="utilityBill">{{ utilityBill.name }}</span>
              </b-field>
            </p>
          </div>
        </div>
        <div>
          <div class="tds-payment-holder">
            <div class="tds-control-boost">
              <p style="text-align:center !important">
                By clicking the promote button, You've agreed to our
                <a
                  href="/terms-and-conditions"
                  class
                >terms and conditions</a>
              </p>
              <p
                class="tds-ab-btn"
                style="text-align:center !important; margin-top:20px; display:block"
              >
                <span
                  class="button tds-primary-button"
                  style="background: rgb(235, 92, 93);"
                  @click="isVerifyModalActive = false"
                >Cancel</span>
                <span class="tds-primary-button button" @click="Submitfile">Submit</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import contact from '~/components/static_components/contactAgent'
import { async } from 'q'
export default {
  components: {
    contact
  },
  data() {
    return {
      agent: {},
      baseUrl: process.env.API_URL,
      edit: false,
      show: false,
      title: 'Agents - 2Dots Properties ',
      // user,
      CACfile: {},
      utilityBill: {},
      isVerifyModalActive: false
    }
  },
  computed: {
    username() {
      return this.$store.state.auth.currentUser.username
    },
    aboutAgent() {
      if (this.agent) {
        return (
          this.agent.account_type === 'PROPERTY_OWNER' ||
          this.agent.account_type === 'INDIVIDUAL'
        )
      } else {
        return false
      }
    },
    fakeprofile() {
      if (this.agent.company) {
        return this.agent.company.slice(0, 1)
      } else if (this.agent.name) {
        return this.agent.name.slice(0, 1)
      } else {
        return '2dots'
      }
    },
    whatsapp() {
      if (this.agent.whatsapp) {
        return this.agent.whatsapp.replace('+', '')
      } else {
        return ''
      }
    }
  },
  methods: {
    async Submitfile() {
      if (
        this.CACfile.name !== undefined &&
        this.utilityBill.name !== undefined
      ) {
        let formData = new FormData()
        formData.append('verify_user[cac]', this.CACfile)
        formData.append('verify_user[bill]', this.utilityBill)
        console.log(formData)

        try {
          this.$store.commit('spinner/spin', true)

          this.$axios.setToken(this.storage.token, 'Bearer')
          await this.$axios.post('verify_users', formData)

          let payload = {
            msg: 'Sent successfully',
            isActive: true
          }

          this.$store.commit('notify/success', payload)
          this.$store.dispatch('notify/selfReset')

          this.$store.commit('spinner/spin', false)
        this.isVerifyModalActive = false


        } catch (error) {

          this.$store.commit('spinner/spin', false)

          let payload = {
            msg: 'Unable to send',
            isActive: true
          }

          this.$store.commit('notify/failed', payload)
          this.$store.dispatch('notify/selfReset')
          console.log(error)
        }
        // this.isVerifyModalActive = false
        // console.log(this.CACfile, this.utilityBill, this.validIdCard)
      } else {
        let payload = {
          msg: 'Upload the neccessary file',
          isActive: true
        }

        this.$store.commit('notify/failed', payload)
        this.$store.dispatch('notify/selfReset')
      }
    },
    openVerify() {
      this.isVerifyModalActive = true
    },
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', { marginTop: m, paddingTop: p })
    },
    format(value) {
      if (value === 'PROPERTY_OWNER') {
        return 'Property Owner'
      } else if (value === 'INDIVIDUAL') {
        return 'Individual'
      } else if (value === 'PROPERTY_DEVELOPER') {
        return 'Developer'
      } else {
        return 'Estate Agent'
      }
    },
    parseJwt() {
      let base64Url = this.storage.token.split('.')[1]
      if (base64Url) {
        let user
        user = JSON.parse(atob(base64Url))
        console.log(user.username)
        if (user.username === this.$route.params.agent) {
          this.edit = true
        } else {
          this.edit = false
        }
      }
    },

    async getAgentDetails() {
      let url = this.$route.path
      try {
        const agent = await this.$axios.get(url)
        this.agent = agent.data
        this.show = true
        console.log(this.agent)
      } catch (e) {
        console.log(e)
      }
    }
  },
  created() {
    this.updateTopSpaces(120, 50)
    this.getAgentDetails()
  },
  mounted() {
    this.parseJwt()
  },

  beforeDestroy() {
    this.updateTopSpaces(136, 50)
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: '2Dots Agents',
          name: '2Dots Agents',
          content: '2Dots About Agents'
        }
      ]
    }
  }
}
</script>

<style>
.verify_background {
  background: white;
  width: 85%;
  margin: auto;
}
.verify_background .tds-title-tab,
.verify_background p {
  height: auto !important;
  text-align: left;
  margin-top: 0;
}
.tds-title-tab i {
  font-size: 12px;
}
.tds-primary-button.btn-holder a {
  color: #fff !important;
}

.tds-primary-button.btn-holder a:hover {
  opacity: 0.8;
}

.tds-primary-button.btn-holder {
  display: flex;
  justify-content: center;
  align-items: center;
}
.agent-profile-contact p {
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.first-no-display {
  display: none;
}
.about-agent-profile-flex {
  grid-template-columns: 80%;
}
@media screen and (max-width: 1300px) {
  .tds-mobilenegative-margin {
    margin-top: -59px;
  }
}
@media screen and (max-width: 1259px) {
  .agent-profile-flex {
    display: grid;
    grid-template-columns: 550px 550px;
    grid-gap: 15px;
    justify-content: center;
  }
}

@media screen and (max-width: 1161px) {
  .agent-profile-flex {
    display: grid;
    grid-template-columns: 450px 450px;
    grid-gap: 10px;
    justify-content: center;
  }
}

@media screen and (max-width: 938px) {
  .agent-profile-flex {
    display: grid;
    grid-template-columns: 1.5fr;
    grid-gap: 10px;
    justify-content: center;
    padding: 20px;
  }
  .agent-contact-div {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
