<template>
  <div>
    <header class="tds-titles" align="center">
      <strong>Questions</strong>
      <hr />
    </header>
    <div class="tds-forum-layout">
      <div class="tds-forum-ask">
        <div class="tds-forum-card">
          <form class="tds-ask-question" validate @submit.prevent>
            <b-field horizontal label="Select Category">
              <b-select placeholder="Select a topic" expanded required v-model="category">
                <option value="DESIGN">Design and Renovations</option>
                <option value="CONSTRUCTION">Construction</option>
                <option value="SALES">Sales & Rentals</option>
                <option value="LEGAL">Legal</option>
                <option value="INVESTMENTS">Property Investments</option>
                <option value="AGENTS">Agents & Brokers</option>
                <option value="QUESTIONS">Questions</option>
              </b-select>
            </b-field>

            <b-field horizontal label="Subject">
              <b-input name="subject" maxlength="30" expanded required v-model="subject"></b-input>
            </b-field>
            <b-field horizontal label>
              <textarea
                class="textarea"
                placeholder="Add a new forum post"
                rows="15"
                required
                v-model="question"
              ></textarea>
            </b-field>
            <b-field horizontal label>
              <p align="right">
                <button class="tds-primary-button" @click="addPost()">submit</button>
              </p>
            </b-field>
          </form>
        </div>
      </div>
      <forumMenu />
    </div>
  </div>
</template>

<script>
import forumMenu from '~/components/forumMenu'
export default {
  components: {
    forumMenu
  },
  data() {
    return {
      category: '',
      question: '',
      subject: '',
      title: 'Questions Forum - 2Dots Properties'
    }
  },
  methods: {
    async addPost() {
      if (this.category !== '' && this.subject !== '' && this.question !== '') {
        this.$axios.setToken(this.storage.token, 'Bearer')

        let f = {
          category: this.category,
          subject: this.subject,
          body: this.question
        }

        try {
          let posts = await this.$axios.post('forums', f)
          let link = posts.data.permalink.replace('forums', '')
          this.$router.push(`/forum/${link}`)
        } catch (error) {
          console.log(error)
        }
      }
    },
    hideSearchBar(payload) {
      this.$store.commit('common/updateIsIndex', payload)
    },
    updateTopSpaces(m, p) {
      this.$store.commit('common/updateSpace', {
        marginTop: m,
        paddingTop: p
      })
    }
  },
  created() {
    this.updateTopSpaces(64, 0)
    this.hideSearchBar(false)
  },
  beforeDestroy() {
    this.hideSearchBar(true)
    this.updateTopSpaces(136, 50)
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'Questions Forum',
          name: 'Questions Forum',
          content: 'Questions Forum - 2Dots Property'
        }
      ]
    }
  },
  middleware: 'auth',
}
</script>

<style>
.tds-ask-question .field-label {
  width: 200px;
}
.tds-ask-question {
  width: 800px;
}

@media screen and (max-width: 830px) {
  .tds-ask-question {
    width: 100%;
  }
  .tds-forum-ask {
    width: 100%;
  }
}
.tds-ask-question .field.is-horizontal {
  margin-bottom: 30px !important;
}
.tds-ask-question input,
.tds-ask-question textarea,
.tds-ask-question select,
.tds-ask-question .tds-primary-button {
  border-radius: 8px;
}
.tds-ask-question .tds-primary-button {
  margin: 0;
}
</style>
