<template>
  <div v-if="post !== {}">
    <div class="tds-forum-params">
      <div class="tds-forum-layout">
        <div style="max-width: 824px; width: 100%;">
          <div class="tds-forum-card tds-forum-first">
            <div class="tds-forum-card-header">
              <div>
                <img
                  :src="baseUrl+post.avatar"
                  class="author-image"
                  height="50px"
                  width="50px"
                  v-if="post.avatar !== null"
                  @click.exact="seeAgentPage"
                />

                <div
                  class="fakeprofile author-image"
                  v-if="post.avatar === null"
                  @click="seeAgentPage"
                >{{fakeprofile(post)}}</div>
              </div>
              <div class="forum-topic" align="center">{{post.subject}}</div>
            </div>

            <div class="tds-forum-content">
              <p>{{post.body}}</p>
              <div class="tds-forum-content-footer">
                <div align="right" v-if="post.can_delete" class="can-delete-button">
                  <span @click="editPost(post.permalink)">Edit</span> |
                  <span @click="deletePost(post.permalink)">Delete</span>
                </div>

                <div align="left">
                  <n-link class="tds-forum-category" :to="'/forum?category='+ post.category">{{format(post.category)}}</n-link>
                </div>
              </div>
            </div>
            <div class="tds-forum-footer" v-if="post.link_to_user !== undefined">
                <div class="tds-date-category">Posted on - {{post.posted_at}}</div>
                <div class="tds-post-author">By <nuxt-link :to="post.link_to_user"><span> {{post.user}} </span> </nuxt-link>
                </div>
            </div>
          </div>
          <div></div>

          <!-- Replies -->

          <div class="tds-forum-card" v-for="(reply, i) in post.comments" :key="i">
            <div class="tds-forum-card-reply">
              <div class="tds-reply-author">
                <img
                  :src="baseUrl+reply.avatar"
                  class="author-image"
                  height="50px"
                  width="50px"
                  v-if="reply.avatar"
                  @click="goToUser(reply)"
                />
                <div
                  class="fakeprofile author-image"
                  v-else
                >{{fakeprofile(reply)}}</div>

                <div class="tds-author-details" v-if="reply.link_to_user">
                  <n-link :to="reply.link_to_user">{{reply.user}}</n-link>
                  <br />
                  <span class="tds-date-category">Posted on - {{reply.posted_at}}</span>
                </div>
              </div>
            </div>

            <div class="tds-forum-content tds-reply-content">
              <p v-if="indexOfComment !== i">{{reply.body}}</p>
              <div v-if="indexOfComment === i" class="editcomment">
                <b-field>
                  <b-input
                    class="inputEdit-comment"
                    v-model="editcommentModel"
                    type="textarea"
                    placeholder="Edit your comment"
                  ></b-input>
                </b-field>
                <button class="button" @click="editCommentDone">Submit</button>
              </div>
              <div align="right" v-if="reply.can_delete" class="can-delete-button">
                <span @click="editcomment(reply.permalink, reply.body , i)">Edit</span> |
                <span @click="deleteComment(reply.permalink)">Delete</span>
              </div>
            </div>
          </div>
          <div class="tds-new-replies" style="position:relative" v-if="username">
            <!-- <button class="tds-primary-button">LOAD MORE</button> -->
            <VueEmoji ref="emoji" @input="onInput" :value="newreply" :height="400"/>
            <!-- <form class="tds-form-add-reply" validate @submit.prevent="addReply()"> -->
              <!-- <textarea
                class="textarea"
                placeholder="add reply"
                rows="15"
                required
                v-model="newreply"
              ></textarea> -->
              <button class="tds-primary-button" @click="addReply()">submit</button>
            <!-- </form>  -->
          </div>
        </div>

        <div>
          <forumMenu />
        </div>
      </div>
    </div>
  </div>
</template>
<style>


.emoji-wysiwyg-editor.emoji-vue-textarea, .emoji-picker-container{
  width:100% !important;
}
.tds-forum-params .fakeprofile {
  font-size: 35px !important;
}

.inputEdit-comment .textarea:not([rows]) {
  /* max-height: auto; */
  border: none;
  box-shadow: none;
  /* min-height: auto; */
  border-bottom: 1px solid black;
  margin-bottom: 20px;
  border-radius: 0;
}
.editcomment {
  padding-left: 20px;
}
</style>

<script>
import forumMenu from '~/components/forumMenu'
import VueEmoji from 'emoji-vue'
export default {
  components: {
    forumMenu,
    VueEmoji
  },
  data() {
    return {
      editlink: '',
      indexOfComment: null,
      editcommentModel: '',
      isEditModalActive: false,
      post: {},
      replies: {},
      newreply: '',
      editnow: false,
      postedit: '',
      baseUrl: process.env.API_URL
    }
  },
  computed: {
    username(){
      return this.$store.state.auth.currentUser.username
    }
  },
  methods: {
    onInput(event) {
          //event.data contains the value of the textarea
          this.newreply = event.data
      },
      clearTextarea(){
        this.$refs.emoji.clear()
      },
    category(value){
      this.$router.push(`/forum?category=${value}`)
    },
    async editCommentDone() {
      this.$axios.setToken(this.storage.token, 'Bearer')
      let f = {
        body: this.editcommentModel
      }
      await this.$axios.patch(`${this.editlink}`, { comment: f })

      this.indexOfComment = null
      await this.getPost()
    },
    format(term){
      switch(term){
        case 'QUESTIONS':
          return 'Questions'
        break
        case 'DESIGN':
          return 'Designs'
        break
        case 'CONSTRUCTION':
          return 'Constructions'
        break
        case 'SALES':
          return 'Sales & Rentals'
        break
        case 'LEGAL':
          return 'Legal'
        break
        case 'INVESTMENTS':
          return 'Property Investments'
        break
        case 'AGENTS':
          return 'Agents & Brokers'
        break
      }
    },
    async deleteComment(link) {
      let confirmed = confirm('Do you want to Delete')

      this.$axios.setToken(this.storage.token, 'Bearer')

      if (confirmed) await this.$axios.delete(`${link}`)
      this.getPost()
    },
    editcomment(link, body, index) {
      this.indexOfComment = index
      this.editcommentModel = body
      this.editlink = link
    },
    editPost(link) {
      this.$router.push(`/forum/edit/${link}`)
    },
    goToUser(user) {
      this.$router.push(user)
    },
    seeAgentPage() {
      this.$router.push(this.post.link_to_user)
    },
    async deletePost() {
      let confirmed = confirm('Do you want to delete this Post')
      if (confirmed) {
        this.$axios.setToken(this.storage.token, 'Bearer')
        try {
          let permalink = this.$route.params.permalink

          await this.$axios.delete(`/forums/${permalink}`)
          this.$router.push('/forum')
        } catch (error) {
          console.log(error.message)
        }
      }
    },
    fakeprofile(post) {
      if (post.avatar === null) {
        // console.log(post)
        return post.user.slice(0, 1)
      }
    },
    async getPost() {
      let permalink = this.$route.params.permalink
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        let post = await this.$axios.$get(`/forums/${permalink}`)
        this.post = post
        console.log(post)
      } catch (error) {
        console.log(error)
      }
    },
    async addReply() {
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        let f = {
          body: this.newreply
        }
        await this.$axios.post(
          `forums/${this.$route.params.permalink}/comments`,
          f
        )
        await this.getPost()
      } catch (error) {
        console.log(error)
      }
      console.log(this.newreply)
      this.newreply = ''
    }
  },
  created() {
    this.getPost()
  }
}
</script>
