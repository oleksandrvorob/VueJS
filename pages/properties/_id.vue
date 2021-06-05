<template>
  <div class="container tds-page-content">
    <zoom :images="images"/>
    <div class="tds-single-card-view">
      <div style="max-width: 850px; width:100%">
        <div class="tds-detail-title">
          <p>{{post.title}}</p>
          <p>
            <span>
              <b v-if="post.price">{{post.price | currency}}</b>
            </span>
          </p>
        </div>
        <p class="tds-subtitle" v-if="post.location">
          <img src="/img/location.png" width="20px">
          {{post.location}}
        </p>
        <gallery :images="images" :content="post" v-if="loaded"/>
      </div>
      <div>
        <singlecard v-if="loaded"/>
      </div>
    </div>

    <div>
      <similarProperties :posts="similarPosts" v-if="similarPosts"/>
    </div>
    <button class="button is-rounded tds-penholder" v-if="authenticated" @click="edit">
      <img src="/img/pen.svg" width="50">
    </button>
  </div>
</template>

<script>
import zoom from '~/components/zoom.vue'
import gallery from '~/components/singledetail.vue'
import singlecard from '~/components/singlecard.vue'
import similarProperties from '~/components/similarProperties.vue'
export default {
  name: 'SeePropertyPage',

  components: {
    gallery,
    singlecard,
    similarProperties,
    zoom
  },
  data() {
    return {
      content: {},
      post: {},
      images: [],
      authenticated:false,
      loaded: false,
      baseUrl: process.env.API_URL,
      similarPosts: [],
      seoData: {
        title: null,
        canonical: null,
        charset: "utf-8",
        description: null,
        image_src: "https://2dots.ams3.digitaloceanspaces.com/FB-Cover.jpg",
        keywords: null,
        og_image: "https://2dots.ams3.digitaloceanspaces.com/FB-Cover.jpg",
        og_title: null,
        og_type: "website",
        og_description: null,
        og_url: "https://2dotsproperties.com",
        og_video_director: null,
        og_video_writer: null,
        site: "2Dots Properties",
        twitter_card: "summary",
        twitter_creator: null,
        twitter_description: null,
        twitter_site: "2Dots Properties",
      },
    }
  },

  created() {
    // this.$store.commit('common/updateSpace', { marginTop: 64, paddingTop: 50 })
    this.fetchData()
  },
  methods: {
    async fetchData() {
      let result = await this.getHomPost()
      if (result) {
        await this.getSeoData()
      }
    },
    async getSeoData() {
      let response = await this.$axios.get(`/meta_data/${this.post.id}`)
      this.seoData = response.data
    },
    edit(){
      this.$router.push(`/edit/${this.post.permalink}`)
    },
    async getHomPost() {
      let url = this.$route.params.id
      let token = this.storage.token

      try {
        if(token) this.$axios.setToken(token, 'Bearer');
        const post = await this.$axios.$get(`/${url}`)
        this.post = post
        this.$store.commit('properties/setSingPost', post)

        post.images.map((image, index) => {
          this.images.push({
            src: image.large_url,
            thumbnail: image.large_url
          })
          if (post.images.length == this.images.length) {
            this.loaded = true
          }
        })
        this.getSimilar(post)
        return true
      } catch (e) {
        if(e.message === "Network Error"){
          let payload = {
            msg :"Your internet is slow or you're not connected",
            isActive:true
          }
          this.$store.commit('notify/warning',payload )
          this.$store.dispatch('notify/selfReset')
        }
        return false
      }
    },

    async getSimilar(post){
      let url = `q/search?q=${post.lga, post.state}&type_of_property=${post.type_of_property}&purpose=${post.purpose}`
      let permalink = this.$route.params.id

      const similar = await this.$axios.$get(url)
       this.similarPosts = similar.posts.filter( self => {
        return self.permalink !== permalink
      } )
    },
  },
  head() {
    return {
      title: this.seoData.title,
      meta: this.metaData,
    }
  },
  computed:{
    saved(){
      return this.$store.state.properties.singlePost
    },
    title(){
      return this.post.title
    },
    metaData() {
      let result = Object.keys(this.seoData).map((key) => {
        if (this.seoData[key] === null || this.seoData[key] === undefined || this.seoData[key] === '') {
          return null
        }
        let origKey = key
        if (key === 'title') {
          return {title: this.seoData[origKey]}
        }
        if (key === 'charset') {
          return {hid: 'charset', charset: this.seoData[origKey]}
        }
        if (key.includes('twitter') || key.includes('og')) {
          key = key.replace(/\_/g, ":")
        }
        if (key.includes('og')) {
          return {hid: key, property: key, content: this.seoData[origKey]}
        }
        return {hid: key, name: key, content: this.seoData[origKey]}
      }).filter(item => item !== null)
      return result
    }
  },

  watch:{
    'saved'(){
      // this.getHomPost()
    }

  }

}
</script>

<style >
.tds-single-card-view {
  display: grid;
  justify-content: center;
  grid-template-columns: auto auto;
}
.tds-detail-title p:first-of-type {
  font-size: 20px;
  width: 65% !important;
  text-align: left;
}
.tds-detail-title p {
  width: 35%;
  text-align: right;
}
.tds-penholder {
  border-radius: 100% !important;
  height: 70px;
  width: 70px;
  position: fixed;
  background: black;
  top: 80vh;
  bottom: 20vh;
  right: 100px;
  outline: none;
  z-index:5;
  box-shadow: 0px -3px 42px 0px rgba(0, 0, 0, 0.705);
}
@media screen and (max-width: 600px){
  .tds-penholder {
    right: 10px;
  }
}
@media screen and (max-width: 1280px) {
  .tds-single-card-view {
    display: block;
    justify-content: center;
    text-align: center;
  }
  .tds-detail-title p:first-of-type {
    font-size: 14px;
  }
}
</style>
