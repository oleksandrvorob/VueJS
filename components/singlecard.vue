<template>
  <div class="tds-singlecard">
    <div class="card">
      <header class="card-header">
        <div class="card-header-title card-header-color">
          <span class="marketed-by">Marketed by</span>
        </div>
      </header>
      <div class="card-content">
        <div class="content tds-card-content">
          <img :src="baseUrl + content.agent_avatar" width="100" v-if="content.agent_avatar" />
          <div class="agent-adress">
            <span id="agent-adress">{{content.agent.company || content.agent.name}}</span>
            <div>
              <div class="content-location">
                <img src="/img/location.png"/>
                {{content.agent.address}}
              </div>
              <div>
                <img src="/img/phone.png" width="20" />
                <a :href="'tel:'+content.agent.country_code+content.agent.phone">
                  <span>{{isHalf(content.agent.phone)}}</span>
                </a>
                <button
                  class="tds-primary-button show-number-btn"
                  @click="showNumber(content.phone)"
                >{{Show}} Number</button>
              </div>

              <div v-if = "content.agent.whatsapp">
                <img src="/img/whatsapp.png" width="20" />
                <a :href="`https://api.whatsapp.com/send?phone=${whatsapp}&text=Please tell me more about this - https://2dotsproperties.com/properties/${content.permalink}&source=&data=`" target="_blank">{{content.agent.country_code_whatsapp + content.agent.whatsapp}}</a>
              </div>

              <div>
                <span v-if="content.agent.verified" class="bta bta-boost" style="position:relative; font-size:10px; font-weight:bold; color:white;padding:8px 15px;">verified</span>
              </div>



            </div>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <span v-if="isCurrentUser">
          <nuxt-link :to="'/agents' + content.agent.url">
            <b>View Profile</b>
          </nuxt-link>
          <span style="margin: 0 10px">|</span>
          <b @click="edit">Edit This Post</b>
        </span>
        <span v-else>
          <nuxt-link :to="'/agents' + content.agent.url">
            <b>
              View
              <b
                v-if="content.agent.account_type === 'PROPERTY_OWNER' || content.agent.account_type === 'INDIVIDUAL'"
              >Owner</b>
              <b v-else>Agent</b> Profile
            </b>
          </nuxt-link>
        </span>
      </footer>
    </div>
    <div class="tds-share-flex">
      <div v-if="content.saved" @click="unsave">
        <img v-if="content.saved" src="/img/save_icon.png" width="20px" /> Saved
      </div>
      <div v-if="!content.saved" @click="save">
        <img v-if="!content.saved" src="/img/save_ICON2.png" width="20px" /> Save
      </div>
      <div class="share-container" @click="showShare()">
        <div :class="{'hide-share':showShareButtons }">
          <a :href=" 'https://www.facebook.com/sharer.php?u=https://2dotsproperties.com' + $route.fullPath" class="button"  target="_blank"> <img src="/img/facebook.png" width="30"/> </a>
          <a :href="'https://twitter.com/intent/tweet?url=https://2dotsproperties.com'+ $route.fullPath + '&text='+twitterText" class="button"  target="_blank"> <img src="/img/twitter.png" width="30"/>  </a>
        </div>

        <span v-if="!showShareButtons"><img src="/img/share_icon.png" width="20px" /> Share</span> <span v-if="showShareButtons">×</span>
      </div>
    </div>

    <div class="single-card-table">
      <div align="center" style="padding: 16px; background-color: #f2f2f2 ">
        <b>Property Details</b>
      </div>
      <section>
        <div>
          <p>
            <b>
              <img src="/img/ref.svg" style="margin:0 24px;" />Reference No:
            </b>
          </p>
          <p>{{content.reference}}</p>
        </div>
        <div>
          <p>
            <b>
              <img src="/img/type.svg" />Type of Property:
            </b>
          </p>
          <p>{{capitalize(content.type_of_property)}}</p>
        </div>
        <div>
          <p>
            <b>
              <img src="/img/purpose.svg" />Purpose:
            </b>
          </p>
          <p>{{ purposefilter(content.purpose)}}</p>
        </div>
        <div v-if="content.square_meters">
          <p>
            <b>
              <img src="/img/land-size.svg" />Total Land Area:
            </b>
          </p>
          <p>{{ content.square_meters }} sqm</p>
        </div>
        <div>
          <p>
            <b>
              <img src="/img/added.svg" />Added At:
            </b>
          </p>
          <p>{{content.created_at}}</p>
        </div>
        <div>
          <p>
            <b>
              <img src="/img/calendar.svg" />Last Updated:
            </b>
          </p>
          <p>{{content.updated_at}}</p>
        </div>
        <div v-if="isOwner">
          <p>
            <b>
              <img src="/img/views.svg" />Views:
            </b>
          </p>
          <p>{{content.views}}</p>
        </div>
      </section>
    </div>

    <footer class="card-footer tds-report" @click="Report">Report this Property</footer>

    <AdsCard/>
  </div>
</template>

<script>
import AdsCard from '~/components/static_components/AdsCard.vue'
export default {
  components: {
    AdsCard
  },
  data() {
    return {
      number: '0814 556 666',
      shownNum: '',
      isPhone: false,
      showShareButtons: false,
      purpose: [
        { name: 'SALE', value: 'SALE' },
        { name: 'RENT', value: 'RENT' },
        { name: 'SHORT LET', value: 'SHORT' },
        { name: 'NEW DEVELOPMENTS', value: 'NEW' },
        { name: 'PAY IN INSTALLMENTS', value: 'INSTALLMENT' }
      ],
      Show: 'Show',
      baseUrl: process.env.API_URL
    }
  },
  methods: {
    showShare(){
      this.showShareButtons = !this.showShareButtons
    },
    showNumber() {
      this.isPhone = !this.isPhone
      if (this.Show === 'Show') {
        this.Show = 'Hide'
      } else {
        this.Show = 'Show'
      }
    },
    save() {
      let payload = {
        backend: {
          saved: true,
          type_of_maker: 'BOOKMARK'
        },
        token: this.storage.token,
        url: this.content.save_url
      }

      // this.content.saved = true

      this.$store.dispatch('properties/saveProperty', payload)
    },

    Report(){
      let payload = {
        backend: {
          saved: true,
          type_of_maker: 'REPORTED'
        },
        token: this.storage.token,
        url: this.content.save_url
      }

      this.$store.dispatch('properties/saveProperty', payload)
    },

    unsave() {
      let payload = {
        token: this.storage.token,
        url: this.content.unsave_url
      }

      // this.content.saved = false

      this.$store.dispatch('properties/unsaveProperty', payload)
    },


    isHalf(number) {
      if (number != null) {
        if (!this.isPhone) {
          let shownNum = number.slice(0, 4)
          shownNum += ' *** ***'
          return shownNum
        } else if (this.content.agent.country_code) {
          return (this.shownNum =
            this.content.agent.country_code+number)
        } else {
          return this.shownNum + number
        }
      }
    },
    purposefilter(value) {
      if (value.length > 0) {
        let name = ''
        this.purpose.forEach(e => {
          if (e.value === value) {
            name = e.name
          }
        })
        return name.toLowerCase()
      }
    },
    capitalize(value) {
      if (value.length > 0) {
        var caps = value.toLowerCase()

        return caps.charAt(0).toUpperCase() + caps.slice(1)
      }
    },

    edit() {
      let permalink = this.$route.params.id
      this.$router.push(`/edit/${permalink}`)
    }
  },
  computed: {
    // username() {
    //   return this.$store.state.auth.currentUser.username
    // }
    username(){
      return this.$store.state.auth.currentUser.username
    },

    isOwner(){
      let agent = this.content.agent.url.replace('/','')

      if (this.username && this.username === agent){
        return true
      }else{
        return false
      }
    },

    twitterText(){
      return `${this.content.title} \n in ${this.content.location}. \n Price: ₦${this.content.price }`
    },
    whatsapp(){
      if (this.content.agent.country_code_whatsapp && this.content.agent.whatsapp){
      return this.content.agent.country_code_whatsapp.replace('+','') + this.content.agent.whatsapp
      }else{
        return ''
      }
    },

    content(){
      return this.$store.state.properties.singlePost
    },
    isCurrentUser() {
      return this.$store.state.auth.isCurrentUser
    }
  },
}
</script>

<style>
.tds-singlecard .card:first-of-type {
  max-height: 100%;
}
.share-container{
  position: relative;
}
.share-container .button{
  background: transparent;
  border:none;
  width:30px;
  padding: 4px;
  margin: 10px;
  z-index: 19;
}
.share-container div{
  display: none;
  padding: 0;
  position: absolute;
  top: -80px;
  background:  #3e3e3eb5 !important;
}
.hide-share{
  display: block !important;
}

</style>
