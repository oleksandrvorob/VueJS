<template>
  <div>
    <div class>

      <b-field style="max-width: 1250px; margin:auto; display:flex; flex-wrap:wrap; padding:10px;">
        <b-input placeholder="Search forum" v-model="term" expanded @keyup.native.enter="search"></b-input>
        <p class="control">
          <span class="tds-primary-button button" @click="search">Search</span>
        </p>
      </b-field>

      <div class="tds-forum-layout" v-if="posts !== undefined &&  !noPostFound " >
        <div style="max-width: 824px;width: 100%;" >
          <div class="tds-forum-card" v-for="(post, index) in posts" :key="index" >
            <div class="tds-forum-card-header">
              <div>
                <img
                  v-if="post.avatar !== null"
                  :src="baseUrl+post.avatar"
                  class="author-image"
                  height="50px"
                  width="50px"
                  @click.exact="seeAgentPage(post)"
                />
                <div
                  class="fakeprofile author-image"
                  v-if="post.avatar === null "
                  @click.exact="seeAgentPage(post)"
                >{{fakeprofile(post)}}</div>
              </div>
              <div class="forum-topic">
                <n-link :to=" page === 'FORUM'? 'forum/'+post.permalink : post.permalink">
                  <p style="color:black">{{post.subject}}</p>
                </n-link>
              </div>
              <div class="forum-replies">
                {{post.replies}}
                <br />
                <span>{{ post.replies > 1 ? 'Replies':'Reply'}}</span>
              </div>
            </div>
            <div class="tds-forum-content">

                <p>{{post.body.length > 1000 ? post.body.slice(0, 300) + '...' : post.body }}</p>

            </div>

            <div class="tds-forum-footer">
              <n-link class="tds-forum-category" :to="`/forum?category=${post.category}`">{{format(post.category)}}</n-link>
              <div class="tds-date-category">Posted on - {{post.posted_at}}</div>
              <div class="tds-post-author">
                By
                <n-link :to="post.link_to_user"> <span> {{post.user}} </span> </n-link>
              </div>
            </div>
          </div>

          <div class="find-agents">
            <b-pagination
              :total="total"
              :current.sync="current"
              :order="'is-centered'"
              :simple="false"
              :rounded="false"
              :per-page="perPage"
              @change="nextPage"
            ></b-pagination>
          </div>
        </div>
        <div v-if="noPostFound" style="max-width: 824px;width: 100%;">
          <h1 style="font-size:65px; margin:30px; 0" align="center"> No Posts Found </h1>
        </div>
        <div>
          <forumMenu />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import forumMenu from '~/components/forumMenu'
export default {
  components: {
    forumMenu
  },
  props: ["page"],
  data() {
    return {
      posts: undefined,
      total: 0,
      current: 1,
      perPage: 0,
      baseUrl: process.env.API_URL,
      term:''
    }
  },
  methods: {
    seeAgentPage(post) {
      this.$router.push(`${post.link_to_user}`)
    },
    fakeprofile(post) {
      if (post.avatar === null) {
        // console.log(post)
        return post.user.slice(0, 1)
      }
    },
    async getposts() {
        var permalink

        switch (this.page) {
          case 'FORUM':
            permalink = this.$route.fullPath.replace('/forum', 'forums')
            break;
          case 'FILTER':
            permalink = this.$route.fullPath
            break;
          default:
            break;
        }


      try {

        // this.$store.commit('spinner/spin', true )

        this.$axios.setToken(this.storage.token, 'Bearer')
        console.log(permalink, this.page)
        const forumPosts = await this.$axios.$get(permalink)

        console.log(forumPosts)
        this.posts = forumPosts.form_posts
        this.total = forumPosts.links.total_entries
        this.perPage = forumPosts.links.per_page
        this.current = forumPosts.links.current_page

        // this.$store.commit('spinner/spin', false )

      } catch (error) {
        console.log(error)
      }
    },
    category(value){
      this.$router.push(`/forum?category=${value}`)
    },

    async nextPage(e) {
      if (e === 0) e = 1
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const forumPosts = await this.$axios.$get(`forums/?page=${e}`)
        this.posts = forumPosts.form_posts
        this.total = forumPosts.links.total_entries
        this.perPage = forumPosts.links.per_page
        this.current = forumPosts.links.current_page
      } catch (error) {
        console.log(error)
      }
      console.log(e)
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
    search(){
      this.$router.push(`?q=${this.term}`)
    }
  },
  computed: {
    noPostFound(){
      if(this.posts !== undefined){
        console.log('posting', this.posts)
        // this.posts.length  === 0 ? true : false
      }
    }
  },
  mounted() {
    this.getposts()
  },
  watch:{
    "$route.fullPath"(){
      console.log('route changed')
      this.getposts()
    }
  }
}
</script>

<style>

/* .tds-forum-layout .fakeprofile {
  font-size: 45px !important;
} */

.edit-forum,
.delete-forum {
  cursor: pointer;
}
</style>
