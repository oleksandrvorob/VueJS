<template>
  <div style="background:white;">
    <div class="advertise-payment">
      <div>
        <div class="responsive-payment">
          <div class="tds-title-tab">Advert Details</div>
          <div class="tds-payment-holder">
            <div class="tds-tab-title-tile">
              Post
              <a v-if="selectedPost.id !== null" :href="selectedPostUrl" target="_blank">preview listing</a>
              <b-field style="max-width:480px; width:100%"
                       :type="{'is-danger': hasError('post')}"
                       :message="errorMessage('post')">
                <b-autocomplete v-model="selectedPost.title"
                                :data="posts"
                                :open-on-focus="true"
                                :loading="postsLoading"
                                field="title"
                                placeholder="Type listing info to select from list"
                                @typing="searchPosts"
                                @select="selectPost"
                                @focus="clearError('post')">
                  <template slot-scope="props">
                    {{ props.option.title }} (ID: {{ props.option.id }})
                  </template>
                </b-autocomplete>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              Page Title
              <b-field style="max-width:480px; width:100%">
                <b-input name="title" v-model="seoRecord.title" type="text"></b-input>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              Site Name (Full title would be "Page Title" - "Site Name")
              <b-field style="max-width:480px; width:100%">
                <b-input name="site" v-model="seoRecord.site" type="text" placeholder="2Dots Properties" ></b-input>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              Description
              <b-field style="max-width:480px; width:100%">
                <b-input type="textarea" rows="4" name="description" maxlength="157" v-model="seoRecord.description"></b-input>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              Keywords
              <b-field style="max-width:480px; width:100%">
                <b-input type="textarea" rows="4" name="keywords" v-model="seoRecord.keywords"></b-input>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              Charset
              <b-field style="max-width:480px; width:100%">
                <b-input name="charset" v-model="seoRecord.charset" type="text" placeholder="utf-8" ></b-input>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              Reverse title and site
              <b-field style="max-width:480px; width:100%">
                <b-checkbox v-model="seoRecord.reverse"></b-checkbox>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              No index
              <b-field style="max-width:480px; width:100%">
                <b-checkbox v-model="seoRecord.noindex"></b-checkbox>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              No follow
              <b-field style="max-width:480px; width:100%">
                <b-checkbox v-model="seoRecord.nofollow"></b-checkbox>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              No archive
              <b-field style="max-width:480px; width:100%">
                <b-checkbox v-model="seoRecord.noarchive"></b-checkbox>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              canonical
              <b-field style="max-width:480px; width:100%">
                <b-input name="canonical" v-model="seoRecord.canonical" type="text" placeholder="https://2dotsproperties.com/..."></b-input>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              image URL
              <a v-if="seoRecord.image_src !== null && seoRecord.image_src !== undefined && seoRecord.image_src !== ''" :href="seoRecord.image_src" target="_blank">preview image</a>

              <b-field style="max-width:480px; width:100%">
                <p class="control">
                  <b-upload v-model="seo_image" accept="image/*" @input="uploadImage('seo_image')" :loading="imagesLoading">
                    <a class="button tds-primary-button img-upload-btn" title="Upload" style="max-width: 40px; margin: 0">
                      <b-icon icon="upload"></b-icon>
                    </a>
                  </b-upload>
                </p>
                <b-input name="image_src" v-model="seoRecord.image_src" type="text" style="width: 100%"></b-input>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              og:title
              <b-field style="max-width:480px; width:100%">
                <b-input name="og_title" v-model="seoRecord.og_title" type="text"></b-input>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              og:type
              <b-field style="max-width:480px; width:100%">
                <b-input name="og_type" v-model="seoRecord.og_type" type="text" placeholder="website"></b-input>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              og:url
              <b-field style="max-width:480px; width:100%">
                <b-input name="og_url" v-model="seoRecord.og_url" type="text"></b-input>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              og:image
              <a v-if="seoRecord.og_image !== null && seoRecord.og_image !== undefined && seoRecord.og_image !== ''" :href="seoRecord.og_image" target="_blank">preview image</a>
              <b-field style="max-width:480px; width:100%">
                <p class="control">
                  <b-upload v-model="seo_og_image" accept="image/*" @input="uploadImage('seo_og_image')" :loading="imagesLoading">
                    <a class="button tds-primary-button img-upload-btn" title="Upload" style="max-width: 40px; margin: 0">
                      <b-icon icon="upload"></b-icon>
                    </a>
                  </b-upload>
                </p>
                <b-input name="og_image" v-model="seoRecord.og_image" type="text" style="width: 100%"></b-input>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              og:video:director
              <b-field style="max-width:480px; width:100%">
                <b-input name="og_video_director" v-model="seoRecord.og_video_director" type="text"></b-input>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              og:video:writer
              <b-field style="max-width:480px; width:100%">
                <b-input name="og_video_writer" v-model="seoRecord.og_video_writer" type="text"></b-input>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              twitter:card
              <div class="select">
                <select name="twitter_card" v-model="seoRecord.twitter_card" placeholder="Please, select...">
                  <option value="summary">summary</option>
                  <option value="summary_large_image">summary_large_image</option>
                  <option value="app">app</option>
                </select>
              </div>
            </div>
            <div class="tds-tab-title-tile">
              twitter:site
              <b-field style="max-width:480px; width:100%">
                <b-input name="twitter_site" v-model="seoRecord.twitter_site" placeholder="@yourwebsite" type="text"></b-input>
              </b-field>
            </div>
            <div class="tds-tab-title-tile">
              twitter:creator
              <b-field style="max-width:480px; width:100%">
                <b-input name="twitter_creator" v-model="seoRecord.twitter_creator" type="text"></b-input>
              </b-field>
            </div>

            <div align="center">
              <button class="button tds-primary-button" style="margin: 20px auto !important;" @click="saveChanges">Submit</button>
              <button class="button" style="margin: 20px auto !important;" @click="close">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      selectedRecord: {
        id: Number,
        post_id: Number,
        site: String,
        title: String,
        description: String,
        keywords: String,
        charset: String,
        reverse: Boolean,
        noindex: Boolean,
        nofollow: Boolean,
        noarchive: Boolean,
        canonical: String,
        image_src: String,
        og_title: String,
        og_type: String,
        og_url: String,
        og_image: String,
        og_video_director: String,
        og_video_writer: String,
        twitter_card: String,
        twitter_site: String,
        twitter_creator: String,
      },
    },
    data() {
      return {
        seoRecordErrors: {},
        searchTerm: '',
        posts: [],
        selectedPost: {id: null, title: ''},
        postsLoading: false,
        imagesLoading: false,
        seoRecord: {
          id: null,
          post_id: null,
          site: "",
          title: "",
          description: "",
          keywords: "",
          charset: "",
          reverse: false,
          noindex: false,
          nofollow: false,
          noarchive: false,
          canonical: "",
          image_src: "",
          og_title: "",
          og_type: "",
          og_url: "",
          og_image: "",
          og_video_director: "",
          og_video_writer: "",
          twitter_card: "",
          twitter_site: "",
          twitter_creator: "",
        },
        seo_image: null,
        seo_og_image: null,
      }
    },
    computed: {
      selectedPostUrl() {
        return `${window.location.origin}/properties/${this.selectedPost.permalink}`
      },
    },
    methods: {
      async saveChanges() {
        return await this.update()
      },
      async update() {
        try {
          await this.$axios.put(`/admin/meta_data/${this.seoRecord.id}`, this.seoRecord)
          this.close()
        } catch (e) {
          console.log(e)
          if(!e.response || !e.response.data) {
            return
          }
          this.seoRecordErrors = e.response.data
        }
      },
      close() {
        this.$emit('closed')
      },
      selectPost(post) {
        this.selectedPost = post
        if (this.selectedPost.id == null) {
          this.seoRecord.post_id = null
          return
        }
        this.seoRecord.post_id = this.selectedPost.id

        this.seoRecord.title = this.selectedPost.title
        this.seoRecord.og_title = this.selectedPost.title
        this.seoRecord.description = this.selectedPost.description
        this.seoRecord.canonical = `${window.location.origin}/properties/${this.selectedPost.permalink}`
        this.seoRecord.keywords =  [
          this.selectedPost.locality,
          this.selectedPost.state,
          this.selectedPost.type_of_property,
          this.selectedPost.permalink.replace(/-/g, ' ')
        ].filter(kw => (kw !== undefined && kw !== '' && kw !== null))
         .join(', ')
        this.seoRecord.og_url = this.seoRecord.canonical
        this.seoRecord.image_src = this.selectedPost.images[0] || null
        this.seoRecord.og_image = this.seoRecord.image_src
      },
      async searchPosts(searchTerm) {
        if (searchTerm == '') {
          this.posts = []
          this.selectedPost = {id: null, title: ''}
          this.seoRecord.post_id = null
          return
        }
        this.postsLoading = true
        this.$axios.setToken(this.storage.token, 'Bearer')
        try {
          let result = await this.$axios.get(`admin/meta_data/available_posts?q=${searchTerm}`)
          this.posts = result.data.posts
          this.postsLoading = false
        } catch (e) {
          console.log(e)
        }
      },
      hasError(field) {
        return (this.seoRecordErrors[field] !== undefined)
      },
      clearError(field) {
        let clearErr = {}
        clearErr[field] = undefined
        Object.assign(this.seoRecordErrors, clearErr)
      },
      errorMessage(field) {
        if (!this.hasError(field)) {
          return ''
        }

        return this.seoRecordErrors[field][0]
      },
      async loadPost() {
        await this.searchPosts(this.seoRecord.post_title)
        let current = this.posts.find(p => p.id == this.seoRecord.post_id)
        if (current !== undefined) {
          this.selectPost(current)
        }
      },
      async uploadImage(imageType) {
        let imageData = new FormData()
        imageData.append(imageType, this[imageType], this[imageType].name)

        this.imagesLoading = true
        try {
          this.$axios.setToken(this.storage.token, 'Bearer')
          const response = await this.$axios.patch(`admin/meta_data/${this.seoRecord.id}/upload_images`, imageData)
          this.seoRecord = response.data
        } catch (e) {
          console.log(e)
        } finally {
          this.imagesLoading = false
        }
      },
    },
    mounted() {
      this.seoRecord = this.selectedRecord
      if (this.seoRecord.post_id !== null && this.seoRecord.post_title !== '') {
        this.loadPost()
      }
    }
  }
</script>

<style>
@import '~/static/mobile.css';
</style>
