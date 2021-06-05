<template>
    <div>
        <div class="form4 tds-post-property-form">
      <div style="text-align:center">
        <form @submit.prevent>
          <b-field>
            <b-upload
              v-model="dropFiles"
              multiple
              drag-drop
              @input="change($event)"
              accept="image/*"
            >
              <section class="section">
                <div class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large"></b-icon>
                  </p>
                  <p>Drop your files here or click to upload</p>
                </div>
              </section>
            </b-upload>
          </b-field>
          <div class="tags">
            <div v-for="(tag, index) in tags" :key="index" class="tag is-primary">{{tag}}</div>
          </div>
          <div class="tds-display-image">
            <div class="column" v-for="(image, index ) in imageLink" :key="index">
              <div class="card-image">
                <button class="delete is-small" type="button" @click="deleteDropFile(index)"></button>
                <div>
                  <figure class="image is-4by3">
                    <img :src="image" alt="Placeholder image">
                  </figure>
                </div>
                
              </div>
            </div>
          </div>
          <b-field>
            <!-- Label left empty for spacing -->
            <p class="tds-form-button-holder">
              <span class="button tds-primary-button tds-is-secondary" @click="back">GO BACK</span>
              
              <button class="button tds-primary-button " @click="next">SUBMIT</button>
            </p>
          </b-field>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data() {
    return {
      counter: null,
      dropFiles: [],
      imageLink: [],
      tags: [],
    }
  },
  methods: {
    next() {
   
      if (this.dropFiles.length == 0) {
        
        let mgs = 'images is required'
        this.error(mgs)
      } else {
        this.$store.commit('spinner/spin', true )
        let payload = {
          images: this.dropFiles,
          token: this.storage.token
        }
        this.$store.commit('postproperty/completeData')
        this.$store.dispatch('postproperty/newPost', payload)
        
      }
    },
    error(mgs) {
      let payload = {
        msg: mgs,
        isActive: true
      }
      this.$store.commit('notify/failed', payload)

      this.$store.dispatch('notify/selfReset')
    },
    back() {
      this.$store.commit('postproperty/prevcount')
    },
    deleteDropFile(index) {
      this.tags.splice(index, 1)
      this.imageLink.splice(index, 1)
      this.dropFiles.splice(index, 1)
    },
    change(e) {
      let payload = {
        images : this.dropFiles
      }
      
      this.dropFiles == []
      this.tags = []
      this.imageLink = []
      console.log(e)
      e.forEach(element => {
        console.log(element)
        const reader = new FileReader()

        reader.readAsDataURL(element)

        reader.onload = event => {
          // called once readAsDataURL is completed
          console.log(event.target.result)
          this.imageLink.push(event.target.result)
          this.tags.push(element.name)
          console.log(this.imageLink)
        }
      })
    }
  },

}
</script>

<style>
  .tds-display-image{
    display: grid;
    grid-template-columns: repeat(4, 30%);
    justify-content: center;
    align-items: center;
  }
</style>
