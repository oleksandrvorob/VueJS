<template>
  <div class="responsive-image-holder">
    <div class="lg-holder">
      <div>
        <lingallery :items="images" :height="500" :width="850" />
      </div>
      <p>
        <span class="bta bta-boost" v-if="content.boost > 0">Boosted Ad</span>
        <span class="bta bta-priority" v-if="content.priority > 0">Priority Ad</span>
      </p>

      <button class="zoom-in-action" @click="zoom">
        <img src="/img/zoom-in.svg" width="20" />
      </button>
    </div>

    <div class="tds-share-flex" v-if="content.type_of_property != 'LAND' ">
      <div>
        <img src="/img/toilet_white.png" width="13" />
        Toilets: {{content.toliets}}
      </div>
      <div>
        <img src="/img/bath_white.png" width="19" />
        Bathrooms: {{content.bathrooms}}
      </div>
      <div>
        <img src="/img/bed_white.png" width="20" />
        Bedrooms: {{content.bedrooms}}
      </div>
    </div>
    <section class="tds-navbar2">
      <nav class="navbar">
        <div class="navbar-start">
          <button @click="seeDescription" :class="{tdsnavbarOpacity : showDescription}">Description</button>
          <button @click="seeMap" :class="{tdsnavbarOpacity  : showMap}">Map</button>
          <button
            @click="seeVideo"
            :class="{tdsnavbarOpacity  : Video}"
            v-if="content.video_link"
          >Video</button>
        </div>
      </nav>
      <transition name="fade">
        <div class="tds-description" v-if="showDescription">
          <p v-html="content.description"></p>
        </div>
      </transition>
      <transition name="fade">
        <div class="tds-map" v-if="showMap">
          <div class="mapouter">
            <div class="gmap_canvas">
              <iframe
                height="400"
                width="100%"
                id="gmap_canvas"
                :src=" 'https://maps.google.com/maps?q=' + content.location + '&t=&z=13&ie=UTF8&iwloc=&output=embed'"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
              ></iframe>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="tds-map" v-if="Video">
          <div class="mapouter">
            <div class="gmap_canvas">
              <iframe
                width="850"
                height="406"
                :src="filterit(content.video_link)+'?rel=0'"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </transition>
    </section>

    <div>
      <div class="tds-info">
        <p class="is-center">Interested in this property?</p>
        <p>
          Call:
          <a :href="'tel:'+content.agent.country_code+content.agent.phone">
            <span style="color:black">{{Half(content.agent.phone)}}</span>
          </a>
          <button
            class="tds-primary-button show-number-btn"
            @click="showContact(content.phone)"
          >{{Show}} Number</button>
        </p>
        <p v-if="content.agent.whatsapp">
          <img src="/img/whatsapp.png" width="20" />
          <a
            :href="`https://api.whatsapp.com/send?phone=${whatsapp}&text=Please tell me more about this - https://2dotsproperties.com/properties/${content.permalink}&source=&data=`"
            target="_blank"
            style="color:black !important"
          >{{content.agent.country_code_whatsapp + content.agent.whatsapp}}</a>
        </p>
      </div>
    </div>

    <div class="card-header-title card-header-color">
      <span class="marketed-by">
        Contact
        <b
          v-if="content.agent.account_type === 'PROPERTY_OWNER' || content.agent.account_type === 'INDIVIDUAL'"
        >Owner</b>
        <b v-else>Agent</b>
      </span>
    </div>

    <div class="tds-description tds-contact-agent-form">
      <form @submit.prevent validate>
        <b-field>
          <b-input v-model="name" type="name" placeholder="name" required></b-input>
        </b-field>

        <b-field>
          <b-input v-model="email" type="email" placeholder="email" required></b-input>
        </b-field>

        <b-field>
          <b-input v-model="phone" placeholder="phone number" type="text" required></b-input>
        </b-field>

        <b-field>
          <b-input maxlength="400" type="textarea" placeholder="message" v-model="message" required></b-input>
        </b-field>

        <button class="tds-primary-button" @click="submitForm">SEND MESSAGE</button>
      </form>
    </div>

    <div class="card-header-title card-header-color">
      <div class="tds-disclaimer">
        <h1 align="center">DISCLAIMER</h1>The advertiser,
        <nuxt-link
          :to="'/agents' + content.agent.url"
        >{{content.agent.company || content.agent.name}}</nuxt-link> assumes all responsibilities for this property
        listing and details, herein.
        2Dots Properties only provides a platform for listing this property.
      </div>
    </div>
  </div>
</template>

<style>
@media screen and (max-width: 700px) {
  .zoom-in-action {
    display: none;
  }
}
.zoom-in-action {
  position: absolute;
  top: 400px;
  right: 50px;
  cursor: pointer;
  border-radius: 100%;
  height: 50px;
  width: 50px;
  background: #54bddc;
  border: none;
  outline: none;
}
.responsive-image-holder .card-header-color {
  color: black;
  text-align: left !important;
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  font-size: 30px;
}
.responsive-image-holder .card-header-color span {
  margin: 0 !important;
  padding-left: 50px;
}
/* .responsive-image-holder .bta {
  position: absolute;
  top: 30px;
  background-image: linear-gradient(45deg, #28f29c, #0cb8e0);
  padding: 10px 20px;
  color: #ffff;
  font-weight: bold;
} */
.responsive-image-holder .bta.bta-boost {
  left: 140px;
}

.lg-holder {
  position: relative;
  width: 100%;
  height: 650px;
  overflow: hidden;
}

.tdsnavbarOpacity {
  background: #53bddc !important;
  color: white !important;
}
.tds-single-view {
  padding-top: 170px;
}

.tds-flex {
  display: flex;
}

.tds-disclaimer {
  padding: 20px;
  font-size: 15px;
  font-weight: 100;
}
.tds-disclaimer h1 {
  margin-bottom: 10px;
}
.tds-thumbnail {
  height: 114px;
  width: 158px;
  margin-right: 10px;
}

.tds-detail-title {
  justify-content: space-between;
  font-size: 25px;
  /* max-width: 50%; */
  display: flex;
  color: #3b3b3b;
  font-weight: 400;
}
.tds-detail-title span {
  color: #0ebcdb;
}

.tds-subtitle {
  font-size: 15px;
  color: #3b3b3b;
  font-weight: 100;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-bottom: 20px;
}

.tds-image {
  width: 100%;
  height: 100%;
}

.tdsactive {
  opacity: 0.3;
}
.tds-description {
  padding: 50px;
  border: 1px solid #ebeded;
  /* white-space: nowrap; */
}

.tds-description p {
  white-space: pre-wrap;
}
.tds-map {
  border: 1px solid #ebeded;
}
.tds-navbar2 {
  margin-top: 20px;
  width: 100%;
}
.tds-navbar2 nav {
  background: #ededed;
  color: black;
  z-index: 1;
}
.tds-navbar2 nav button {
  height: 100%;
  background: transparent;
  color: #000;
  border: none;
  outline: none;
  border-right: 2px solid white;
  border-radius: 0;
  width: 150px;
  font-size: 15px;
  cursor: pointer;
}
.tds-nav {
  background: #3e3e3e;
  padding: 5px;
  margin-top: 20px;
  z-index: 1;
}
.mapouter {
  text-align: center;
  /* height: 500px;
  width: 600px; */
}
.gmap_canvas {
  overflow: hidden;
  background: none !important;
  width: auto;
}
.tds-nav button {
  height: 100%;
  background: transparent;
  color: #ffffff;
  border: none;
  outline: none;
  border-right: 2px solid white;
  border-radius: 0;
  width: 150px;
  font-size: 15px;
  cursor: pointer;
}
.tds-nav .button {
  background: #777777;
  color: white;
  width: 73px;
  border: none;
  margin: 0 3px;
  height: 100%;
}
.responsive-image-holder .tds-single-card {
  height: 100% !important;
}
@media screen and (max-width: 1280px) {
  .lg-holder {
    position: relative;
    width: 100%;
    margin: auto;
    height: auto;
  }
  .responsive-image-holder {
    width: 100%;
    padding: 10px;
  }
  .tds-image {
    width: auto;
    height: auto;
  }
  .tds-navbar2 {
    margin-top: 20px;
    width: 100%;
  }
}
@media screen and (max-width: 500px) {
  .lg-holder .bta {
    height: 20px;
    width: 110px;
    font-size: 9px;
    padding: 3px;
    text-align: center;
    border-radius: 20px;
    z-index: 9;
    left: 10px;
  }
  .lg-holder .bta-boost {
    left: 140px;
  }
  .tds-navbar2 .navbar-start {
    margin: 0;
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .tds-navbar2 nav button {
    width: 100%;
  }
  .tds-description {
    padding: 15px;
    border: 1px solid #ebeded;
    margin: auto;
  }
  .bta {
    /* width: 100%; */
    left: 0;
  }
  .tds-detail-title {
    padding-right: 10px;
    font-size: 15px;
    max-width: 100%;
    padding-left: 10px;
  }
  .tds-subtitle {
    font-size: 12px;
    padding-left: 10px;
  }
  .tds-description {
    font-size: 13px;
    text-align: left;
  }
}
</style>


<script>
import lingallery from 'lingallery'
export default {
  props: ['images', 'content'],
  data() {
    return {
      currentUser: {},
      current: this.content.logo,
      isactive: false,
      showDescription: true,
      showMap: false,
      location: 'Elioparawno Road, Port harcourt',
      shownNum: '',
      isPhone: false,
      Video: false,
      name: '',
      email: '',
      phone: '',
      message: '',
      Show: 'Show'
    }
  },

  computed: {
    whatsapp() {
      if (
        this.content.agent.country_code_whatsapp &&
        this.content.agent.whatsapp
      ) {
        return (
          this.content.agent.country_code_whatsapp.replace('+', '') +
          this.content.agent.whatsapp
        )
      } else {
        return ''
      }
    }
  },
  methods: {
    async submitForm() {
      if (
        this.name !== '' &&
        this.email !== '' &&
        this.phone !== '' &&
        this.message !== ''
      ) {
        this.$store.commit('spinner/spin', true)

        let contact = {
          owner: this.content.agent.url.replace('/', ''),
          phone: this.phone,
          email: this.email,
          body: `${this.message} \n\n URL: https://2dotsproperties.com${this.$route.fullPath} \n\n REF NO: ${this.content.reference}  `,
          name: this.name
        }

        await this.$store.dispatch('contact/postMessage', contact)

        if (this.$store.state.contact.empty) {
          this.name = ''
          this.email = ''
          this.phone = ''
          this.message = ''
        }

        this.$store.commit('spinner/spin', false)
      } else {
      }
    },
    filterit(value) {
      let link

      if(value.includes("&")){
        let linkArray = value.split("&")
        link = linkArray[0]
      }else{
        link = value
      }

      return link.replace(
        'https://www.youtube.com/watch?v=',
        'https://www.youtube.com/embed/'
      )
    },
    findAgent() {},
    zoom() {
      this.$store.commit('nav/Zoomin')
    },
    change(image) {
      this.current = image
    },
    seeMap() {
      this.showMap = true
      this.showDescription = false
      this.Video = false
    },
    seeDescription() {
      this.showDescription = true
      this.Video = false
      this.showMap = false
    },
    seeVideo() {
      this.showDescription = false
      this.Video = true
      this.showMap = false
    },
    showContact() {
      if (this.Show === 'Show') {
        this.Show = 'Hide'
      } else {
        this.Show = 'Show'
      }
      this.isPhone = !this.isPhone
    },
    Half(number) {
      if (number != null) {
        if (!this.isPhone) {
          let shownNum = number.slice(0, 4)
          shownNum += ' *** ***'
          return shownNum
        } else if (this.content.agent.country_code) {
          return (this.shownNum =
            this.content.agent.country_code + ' ' + number)
        } else {
          return this.shownNum + number
        }
      }
    }
  },
}
</script>
