<template>
  <div class="pop-up-request" v-if="modal">
    <div class="pop-up-content" v-if="requestDetails">
      <button type="button" class="close-request-modal" @click="toggleModal">
        <span style="font-size:40px">&times;</span>
      </button>
      <div>
        <div class="grid-one-column">
          <div class="tds-titles pop-up">
            <span>
              <p>{{requestDetails.title}}</p>
            </span>
          </div>
          <div class="tds-sub-title">
            <p style="color:#0CA7CB; font-size: 14px;">
              {{requestDetails.location}} | Requested -
              <time>{{requestDetails.created_at}}</time>
            </p>
          </div>
          <p class="single-detail single-detail-list" v-html="requestDetails.description"></p>
        </div>

        <div v-if="edit" class="tds-ab-btn">
          <span @click="editRequest" class="tds-primary-button button">Edit</span>
          <span
            @click="deleteRequest"
            class="button tds-primary-button"
            style="background:#eb5c5d"
          >Delete</span>
        </div>
        <div>
          <div class="contact-flex-list">
            <div v-if="requestDetails.buyer">
              <nuxt-link
                :to="'/agents'+requestDetails.buyer.url"
                style="display:flex;align-items:center;"
              >
                <img :src="baseUrl+requestDetails.buyer.avatar" width="40" v-if="hello" />
                <p v-if="helloname" class="fakeprofile" style="font-size:25px !important;">
                  <span>{{fakeprofile()}}</span>
                </p>
                <b
                  v-if="requestDetails.buyer"
                  class="buyer-name"
                  style="color:black; font-size: 14px"
                >{{requestDetails.buyer.name}}</b>
              </nuxt-link>
            </div>
            <div class="align-b-center">
              <b>Budget: {{requestDetails.budget | currency}}</b>
            </div>
            <div class="align-b-center" v-if="requestDetails.can_delete">
              <b @click="deleteUrl" style="cursor:pointer">Delete</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: process.env.API_URL
    }
  },
  methods: {
    async deleteUrl() {
      if (confirm('do you want to delete this post')) {
        try {
          let url = this.$route.query.url.replace('p/requests/', '')

          this.$axios.setToken(this.storage.token, 'Bearer')
          await this.$axios.$delete(`post_requests/${url}`)
          this.$store.commit('nav/seeRequest')

          this.$router.push('/p/requests')
        } catch (e) {
          console.log(e)
        }
      }
    },
    editRequest() {
      let url = this.$route.query.url.replace('p/requests/', '')
      this.$router.push(`/p/requests/edit/${url}`)
    },

    async deletePostRequest() {
      let url = this.$route.query.url.replace('p/requests/', '')

      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const postData = await this.$axios.$delete(`post_requests/${url}`)
        this.$store.commit('nav/seeRequest')
        this.$router.push('/p/requests')
      } catch (e) {
        console.log(e)
      }
    },

    toggleModal() {
      this.$store.commit('nav/seeRequest')
      let url = this.$route.fullPath

      this.$router.push(url)
    },
    fakeprofile() {
      if (this.requestDetails.buyer) {
        return this.requestDetails.buyer.name.slice(0, 1)
      } else {
        return '2dots'
      }
    },
    deleteRequest() {
      var x = confirm('Confirm Delete')
      if (x === true) {
        this.deletePostRequest()
      }
    }
  },
  computed: {
    hello() {
      if (this.requestDetails.buyer) {
        if (this.requestDetails.buyer.avatar === null) {
          return false
        } else {
          return true
        }
      }
    },
    helloname() {
      if (this.requestDetails.buyer) {
        if (this.requestDetails.buyer.avatar === null) {
          return true
        } else {
          return false
        }
      }
    },
    edit() {
      let base64Url = this.storage.token.split('.')[1]
      if (base64Url) {
        let user
        user = JSON.parse(atob(base64Url))
        console.log(user.username)
        if (this.requestDetails.buyer) {
          if (
            user.username === this.requestDetails.buyer.url.replace('/', '')
          ) {
            return true
          } else {
            return false
          }
        }
      }
    },

    modal() {
      return this.$store.state.nav.seeRequestModal
    },
    requestDetails() {
      return this.$store.state.nav.requestDetails
    }
  }
}
</script>

<style>
.pop-up-request .tds-sub-title {
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

.tds-titles.pop-up {
  font-size: 15px;
  line-height: 1;
  font-weight: bold;
  text-align: left;
}

@media screen and (max-width: 500px) {
  .pop-up-request .tds-sub-title {
    display: block;
  }
  .pop-up-request .tds-sub-title span {
    display: none;
  }
  .contact-flex-list {
    justify-content: center;
  }
}
.tds-ab-btn {
  margin-top: 35px;
  display: flex;
  justify-content: space-between;
}

/* .tds-ab-btn .button {
  margin: 0;
  max-width: 230px !important;
  width: 100%;
} */

.tds-ab-btn span:hover {
  color: #0cb8e0;
  cursor: pointer;
}

.pop-up-content .tds-primary-button {
  margin: 0;
  /* min-width: 50%; */
  float: right;
}
.contact-flex-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-top: 1px solid rgba(201, 201, 201, 0.534);
  margin-top: 15px;
  padding-top: 15px;
  align-content: center;
}
.contact-flex-list .align-b-center {
  display: grid;
  align-items: center;
  font-size: 14px;
}
.contact-flex-list div:first-of-type {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  align-items: center;
}
.contact-flex-list img {
  border-radius: 100%;
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 5px;
}
.pop-up-request {
  height: 100vh;
  /* background: #70707077; */
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding-top: 20vh;
  z-index: 40;
}
.pop-up-content {
  margin: auto;
  background: #fff;
  max-height: 576px;
  max-width: 1000px;
  overflow: auto;
  padding: 40px 60px;
  position: relative;
}

.single-detail-list {
  /* max-width: 70%; */
  white-space: pre-line;
}
.close-request-modal {
  border: none;
  background: transparent;
  color: #0ca7cb;
  outline: none;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}

@media screen and (max-width: 700px) {
  .pop-up-content {
    padding: 15px;
    max-height: 82vh;
  }
  .close-request-modal {
    top: 0;
  }
  .pop-up-request {
    z-index: 47;
    padding-top: 9vh;
  }
}
</style>
