<template>
  <div class="post-property">
    <div class="form-1 tds-post-property-form">
      <form @submit.prevent="updatePost">
        <!-- <formOne/> -->

        <div class="form-1 tds-post-property-form">
          <b-field horizontal label="Title">
            <b-input placeholder="Title" expanded required v-model="title"></b-input>
          </b-field>

          <b-field horizontal label="State">
            <b-input placeholder="State" expanded required v-model="state" disabled></b-input>
          </b-field>

          <b-field horizontal label="Locality">
            <b-input placeholder="Choose Locality" expanded required v-model="locality" disabled></b-input>
          </b-field>

          <b-field horizontal label="Area" v-if=" area != '' ">
            <b-input placeholder="Choose Area" expanded required v-model="locateArea" disabled></b-input>
          </b-field>

          <b-field horizontal label="Street">
            <b-input placeholder="Street" expanded required v-model="street"></b-input>
          </b-field>
        </div>

        <!-- <formTwo/> -->
        <div>
          <div>
            <b-field horizontal label="Purpose" class="tds-multiple-button">
              <b-select placeholder="Choose Purpose" v-model="purpose" expanded required>
                <option value disabled>Choose Purpose</option>
                <option v-for="(option , index) in buttonNames.purpose" :key="index">{{option}}</option>
              </b-select>
            </b-field>
            <b-field horizontal label="Price">
              <b-input
                placeholder="Enter amount"
                expanded
                required
                type="number"
                v-model="price"
                min="0"
              ></b-input>
            </b-field>
            <b-field horizontal label="Duration Required" v-if="propertyIsSale()">
              <b-select placeholder="Choose Duration" expanded required v-model="duration">
                <option value disabled>Choose Duration</option>
                <option value="Per day" v-if="purpose === 'SHORT'">Per Day</option>
                <option value="1 month">1 month</option>
                <option value="6 month">6 month</option>
                <option value="1 year">1 years</option>
                <option value="2 year">2 years</option>
                <option value="3 year">3 years</option>
                <option value="4 year">4 years</option>
                <option value="NONE">Doesn't Apply</option>
              </b-select>
            </b-field>
          </div>
        </div>

        <!-- <formThree/>  -->

        <div>
          <div>
            <b-field horizontal label="Use of Property" class="tds-multiple-button">
              <b-select
                placeholder="Choose Use of property"
                v-model="use_of_property"
                required
                expanded
              >
                <option value disabled>Use of Property</option>
                <option v-for="(use , index) in buttonNames.use" :key="index">{{use}}</option>
              </b-select>
            </b-field>

            <b-field horizontal label="Type of Property">
              <b-select
                placeholder="Choose Property Type"
                expanded
                required
                @input="chooseProperty()"
                v-model="type_of_property"
              >
                <option disabled value>Type of Property</option>
                <option value="FLAT OR APARTMENT">Flat or Apartment</option>
                <option value="HOUSE">House</option>
                <option value="LAND">Land</option>
                <option value="COMMERCIAL">Commercial property</option>
              </b-select>
            </b-field>

            <b-field horizontal label="Square Meters" v-if="type_of_property === 'LAND'">
              <b-input
                placeholder="Square Meters"
                expanded
                v-model="square_meters"
                type="number"
                required
              ></b-input>
            </b-field>

            <b-field
              horizontal
              label="Bedrooms"
              class="tds-multiple-button"
              v-if="propertyIsLand()"
            >
              <b-select v-model="bedrooms" expanded required>
                <option value disabled>Number of Bedrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10+</option>
              </b-select>
            </b-field>

            <b-field
              horizontal
              label="Bathrooms"
              class="tds-multiple-button"
              v-if="propertyIsLand()"
            >
              <b-select v-model="bathrooms" expanded required>
                <option value disabled>Number of Bathrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10+</option>
              </b-select>
            </b-field>

            <b-field horizontal label="Toilets" class="tds-multiple-button" v-if="propertyIsLand()">
              <b-select v-model="toilets" expanded required>
                <option value disabled>Number of Toilets</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10+</option>
              </b-select>
            </b-field>

            <b-field horizontal label="Description">
              <b-input
                type="textarea"
                placeholder="Enter Description"
                v-model="description"
                required
              ></b-input>
            </b-field>

            <b-field horizontal label="YouTube video_link Link">
              <b-input type="text" placeholder="Enter youtube video link url" v-model="video_link"></b-input>
            </b-field>
            <b-field horizontal v-if="video_link">
              <iframe
                width="700"
                height="400"
                :src="filterit(video_link)"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </b-field>

            <b-field horizontal label="Unpublish" >
                <b-checkbox v-model="unpublish">
                </b-checkbox>
            </b-field>

            <b-field horizontal label="Add Images">
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
            <div class="edit-image-grid">
              <div class="edit-image" v-for="(image, index ) in imageLink" :key="index">
                <div>
                  <button class="delete is-small" type="button" @click="deleteDropFile(index)"></button>
                  <div>
                    <figure>
                      <img :src="image" alt="Placeholder image" />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- end -->

        <div class="edit-image-grid">
          <div class="edit-image" v-for=" (image, index) in images" :key="index">
            <span class="delete tds-edit-danger" @click="deleteImage(index)"></span>
            <img :src="baseUrl+image.large_url" />
          </div>
        </div>

        <b-field align="center">
          <!-- Label left empty for spacing -->
          <button class="button tds-primary-button">SUBMIT</button>
        </b-field>
      </form>
    </div>
  </div>
</template>

<script>
import formData from '~/components/forms/formlocations.json'
import { async } from 'q'
console.log(formData)
export default {
  methods: {
    filterit(value) {
      return value.replace(
        'https://www.youtube.com/watch?v=',
        'https://www.youtube.com/embed/'
      )
    },
    changedPurpose() {
      this.duration = ''
    },
    propertyIsSale() {
      return (
        this.purpose !== 'SALE' &&
        this.purpose !== 'NEW'
      )
    },
    chooseProperty() {
      console.log('changed')
      this.bathrooms = ''
      this.bedrooms = ''
      this.toilets = ''
    },
    propertyIsLand() {
      return this.type_of_property != 'LAND'
    },
    change(e) {
      let payload = {
        images: this.dropFiles
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
    },
    hello() {
      console.log(
        this.title,
        this.state,
        this.locality,
        this.street,
        this.area,
        this.price,
        this.duration,
        this.purpose,
        this.use_of_property,
        this.bedrooms,
        this.bathrooms,
        this.toilets,
        this.description,
        this.video_link,
        this.type_of_property
      )
    },
    async getPostDetails() {
      let url = this.$route.params.permalink

      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const postDetail = await this.$axios.$get(url)
          this.title = postDetail.title
          this.state = postDetail.state
          this.locality = postDetail.lga
          this.street = postDetail.street
          this.locateArea = postDetail.area
          this.price = postDetail.price
          this.duration = postDetail.duration
          this.purpose = postDetail.purpose
          this.use_of_property = postDetail.use_of_property
          this.bedrooms = postDetail.bedrooms
          this.bathrooms = postDetail.bathrooms
          this.toilets = postDetail.toliets
          this.description = postDetail.description
          this.video_link = postDetail.video_link
          this.type_of_property = postDetail.type_of_property
          this.images = postDetail.images
          this.square_meters = postDetail.square_meters
          this.unpublish = postDetail.unpublished


        console.log(postDetail)
      } catch (e) {
        console.log(e)
      }
    },
    async deleteImage(index) {
      let del = confirm('Are you sure you want to DELETE this?')
      try {
        if (del === true) {
          this.$axios.setToken(this.storage.token, 'Bearer')
          let url = this.images[index].delete_url
          const deleteImage = await this.$axios.$delete(url)
          console.log(deleteImage)
        }

        this.images.splice(index, 1)
      } catch (e) {
        console.log(e)
      }
      console.log('You clicked')
    },
    deleteDropFile(index) {
      this.tags.splice(index, 1)
      this.imageLink.splice(index, 1)
      this.dropFiles.splice(index, 1)
    },
    async updatePost() {
      let postData = new FormData()
      let permalink
      let url = this.$route.params.permalink

      postData.append('post[title]', this.title)
      postData.append('post[price]', this.price)
      postData.append('post[unpublish]', this.unpublish)
      postData.append('post[description]', this.description)
      postData.append('post[street]', this.street)
      postData.append('post[lga]', this.locality)
      postData.append('post[area]', this.locateArea)
      postData.append('post[state]', this.state)
      postData.append('post[purpose]', this.purpose)
      postData.append('post[use_of_property]', this.use_of_property)
      postData.append('post[type_of_property]', this.type_of_property)
      postData.append('post[bedrooms]', this.bedrooms)
      postData.append('post[bathrooms]', this.bathrooms)
      postData.append('post[toliets]', this.toilets)
      postData.append('post[video_link]', this.video_link)
      postData.append('post[duration]', this.duration)
      postData.append('post[square_meters]', this.square_meters)

      Array.from(this.dropFiles).forEach(f => {
        postData.append('images[]', f, f.name)
        console.log(f)
      })

      this.$store.commit('spinner/spin', true)
      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const newPost = await this.$axios.$patch('posts/' + url, postData)
        permalink = newPost.permalink
        // console.log(newPost)

        let payload = {
          msg: 'Updated successfully',
          isActive: true
        }

        this.$store.commit('notify/success', payload)
        this.$store.dispatch('notify/selfReset')

        this.$store.dispatch('spinner/stopSpinning')
        this.$router.push('/properties/' + permalink)
      } catch (e) {
        let payload = {
          msg: e.response.data,
          isActive: true
        }

        console.log(e.response.data)
        this.$store.commit('notify/failed', payload)
        this.$store.dispatch('notify/selfReset')
      }
    }
  },
  components: {},
  data() {
    return {
      baseUrl: process.env.API_URL,
      images: [],
      states: formData,
      title: '',
      state: 'Lag',
      locality: '',
      street: '',
      area: [],
      locateArea: '',
      currentIndex: 0,
      price: '',
      duration: '',
      purpose: [],
      unpublish:false,
      buttonNames: {
        purpose: ['SALE', 'RENT', 'SHORT', 'NEW', 'INSTALLMENT'],
        use: ['Commercial', 'Residential', 'Mixed Use']
      },
      purpose: [],
      use_of_property: '',
      bedrooms: '',
      bathrooms: '',
      toilets: '',
      description: '',
      video_link: '',
      type_of_property: '',
      counter: null,
      dropFiles: [],
      imageLink: [],
      tags: [],
      square_meters: ''
    }
  },
  computed: {
    form() {
      return this.$store.state.postproperty.counter
    }
  },
  filters: {
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  created() {
    this.getPostDetails()
  }
}
</script>

<style>

.tds-post-property-form .b-checkbox.checkbox input[type=checkbox]:checked + .check {
    background-color: #4a4a4a ;
    border-color: #4a4a4a;
}
.edit-image-grid {
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: center;
  align-items: center;
  grid-gap: 15px;
}
.edit-image-grid .edit-image {
  max-width: 250px;
}
.tds-edit-danger {
  background: red;
}
@media screen and (max-width: 500px) {
  .tds-multiple-button .field-body .field {
    width: 100%;
  }
}
@media (min-width: 901px) and (max-width: 1200px) {
  .edit-image-grid {
    display: flex;
    flex-wrap: wrap;
  }
  .edit-image-grid .edit-image {
    max-width: 250px;
    margin: 10px;
  }
}
@media screen and (max-width: 900px) {
  .edit-image-grid {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px;
  }
}
</style>
