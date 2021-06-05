<template>
  <div>
    <div class="form-3 tds-post-property-form">
      <form @submit.prevent>
        <b-field horizontal label="Title">
          <b-input placeholder="Enter Title e.g. 3 bedroom house" expanded v-model="title" required></b-input>
        </b-field>

        <b-field horizontal label="Use of Property" class="tds-multiple-button">
          <p>
            <span v-for="(use , index) in buttonNames.use" :key="index">
              <label
                :class="{ tdsblack : use_of_property.includes(use)}"
                class="button tds-margin-checkbox"
              >
                <input type="radio" :value="use" v-model="use_of_property">
                {{use}}
              </label>
            </span>
          </p>
        </b-field>

        <b-field horizontal label="Type of Property">
          <b-select
            placeholder="Choose Property Type"
            expanded
            required
            @input="chooseProperty()"
            v-model="type_of_property"
          >
            <option value="FLAT OR APARTMENT">Flat or Apartment</option>
            <option value="HOUSE">House</option>
            <option value="LAND">Land</option>
            <option value="COMMERCIAL">Commercial Property</option>
          </b-select>
        </b-field>
        <b-field horizontal label="Total Square Meters" v-if="type_of_property === 'LAND'">
          <b-input
            placeholder="3058"
            expanded
            v-model="square_meters"
            type="number"
            required
          ></b-input>
        </b-field>

        <b-field horizontal label="Bedrooms" class="tds-multiple-button" v-if="propertyIsLand()">
          <span v-for="n in 9" :key="n" value="n">
            <label :class="{ tdsblack : (n == bedrooms) }" class="button tds-padded-button">
              <input type="radio" :value="n" v-model="bedrooms">
              {{n}}
            </label>
          </span>
          <span value="10">
            <label :class="{ tdsblack : (10 == bedrooms) }" class="button tds-padded-button">
              <input type="radio" value="10" v-model="bedrooms"> 10+
            </label>
          </span>
        </b-field>
        <b-field horizontal label="Bathrooms" class="tds-multiple-button" v-if="propertyIsLand()">
          <span v-for="n in 9" :key="n" value="n">
            <label :class="{ tdsblack : (n == bathrooms) }" class="button tds-padded-button">
              <input type="radio" :value="n" v-model="bathrooms">
              {{n}}
            </label>
          </span>
          <span value="10">
            <label :class="{ tdsblack : (10 == bathrooms) }" class="button tds-padded-button">
              <input type="radio" value="10" v-model="bathrooms"> 10+
            </label>
          </span>
        </b-field>
        <b-field horizontal label="Toilets" class="tds-multiple-button" v-if="propertyIsLand()">
          <span v-for="n in 9" :key="n" value="n">
            <label :class="{ tdsblack : (n == toilets) }" class="button tds-padded-button">
              <input type="radio" :value="n" v-model="toilets">
              {{n}}
            </label>
          </span>
          <span value="10">
            <label :class="{ tdsblack : (10 == toilets) }" class="button tds-padded-button">
              <input type="radio" value="10" v-model="toilets"> 10+
            </label>
          </span>
        </b-field>

        <b-field horizontal label="Description">
          <b-input type="textarea" placeholder="Enter Description" v-model="description" required></b-input>
        </b-field>
        <b-field horizontal label="YouTube Link">
          <b-input type="text" placeholder="Enter youtube video link url" v-model="video_link"></b-input>
        </b-field>
        <b-field horizontal v-if="video_link">
          <iframe
            width="400"
            height="400"
            :src="filterit(video_link)"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </b-field>

        <b-field horizontal>
          <!-- Label left empty for spacing -->
          <p class="tds-form-button-holder">
            <span class="button tds-primary-button tds-is-secondary" @click="back">GO BACK</span>

            <button class="button tds-primary-button" @click="next">PROCEED</button>
          </p>
        </b-field>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      use_of_property: '',
      bedrooms: '',
      bathrooms: '',
      toilets: '',
      description: '',
      video_link: '',
      type_of_property: '',
      title: '',
      square_meter: '',
      buttonNames: {
        use: ['Commercial', 'Residential', 'Mixed Use']
      }
    }
  },
  methods: {
    chooseProperty() {
      console.log('changed')
      this.bathrooms = ''
      this.bedrooms = ''
      this.toilets = ''
      this.square_meters = ''
    },
    filterit(value){
      return value.replace ('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')
    },
    propertyIsLand() {
      return this.type_of_property != 'LAND'
    },
    next() {
      let payload = {
        use_of_property: this.use_of_property,
        type_of_property: this.type_of_property,
        bedrooms: this.bedrooms,
        bathrooms: this.bathrooms,
        toilets: this.toilets,
        description: this.description,
        video_link: this.video_link,
        choose: this.choose,
        title: this.title,
        square_meters: this.square_meters
      }
      if (this.type_of_property === 'COMMERCIAL') {
        if (
          this.purpose == [] ||
          this.use_of_property == [] ||
          this.description == '' ||
          this.type_of_property == '' ||
          this.title == ''
        ) {
          if (this.use_of_property == []) {
            let mgs = "Use of property can't be empty"
            this.error(mgs)
          } else if (this.description == '') {
            let mgs = "Description can't be empty"
            this.error(mgs)
          } else if (this.type_of_property == '') {
            let mgs = "Type of property can't be empty"
            this.error(mgs)
          } else {
            let mgs = "Title can't be empty"
            this.error(mgs)
          }
        } else {
          this.$store.commit('postproperty/nextcount')
          this.$store.commit('postproperty/secThree', payload)
        }
      }

      else if (this.type_of_property === 'LAND') {
        if (
          this.purpose == [] ||
          this.use_of_property == [] ||
          this.description == '' ||
          this.type_of_property == '' ||
          this.title == '' ||
          this.square_meters == ''
        ) {
          if (this.use_of_property == []) {
            let mgs = "Use of property can't be empty"
            this.error(mgs)
          } else if (this.description == '') {
            let mgs = "Description can't be empty"
            this.error(mgs)
          } else if (this.type_of_property == '') {
            let mgs = "Type of property can't be empty"
            this.error(mgs)
          } else {
            let mgs = "Title can't be empty"
            this.error(mgs)
          }
        } else {
          this.$store.commit('postproperty/nextcount')
          this.$store.commit('postproperty/secThree', payload)
        }
      } else {
        if (
          this.purpose == [] ||
          this.use_of_property == [] ||
          this.bedrooms == '' ||
          this.bathrooms == '' ||
          this.toilets == '' ||
          this.description == '' ||
          this.type_of_property == '' ||
          this.title == ''
        ) {
          if (this.use_of_property == []) {
            let mgs = "Use of property can't be empty"
            this.error(mgs)
          } else if (this.bedrooms == '') {
            let mgs = "Bedrooms can't be empty"
            this.error(mgs)
          } else if (this.bathrooms == '') {
            let mgs = "Bathrooms can't be empty"
            this.error(mgs)
          } else if (this.toilets == '') {
            let mgs = "toilets can't be empty"
            this.error(mgs)
          } else if (this.description == '') {
            let mgs = "Description can't be empty"
            this.error(mgs)
          } else if (this.type_of_property == '') {
            let mgs = "Type of property can't be empty"
            this.error(mgs)
          } else {
            let mgs = "Title can't be empty"
            this.error(mgs)
          }
        } else {
          this.$store.commit('postproperty/nextcount')
          this.$store.commit('postproperty/secThree', payload)
        }
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
    }
  }
}
</script>

<style>
</style>
