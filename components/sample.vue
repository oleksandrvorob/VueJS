<template>
  <div class="post-property">
    <div class="form-1 tds-post-property-form">
      <no-ssr>
        <form @submit.prevent="next" validate>
          <b-field horizontal label="Title">
            <b-input placeholder="Enter Title" expanded v-model="title" required></b-input>
          </b-field>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">State</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control is-expanded">
                  <span class="select is-fullwidth">
                    <select @change="hello" required>
                      <option selected disabled>Select state</option>
                      <option
                        v-for="(states, index) in states"
                        :value="states.state"
                        :key="index"
                      >{{states.state | capitalize}}</option>
                    </select>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <b-field horizontal label="Locality">
            <b-select
              placeholder="Choose Locality"
              expanded
              required
              v-model="locality"
              @input="onchange"
            >
              <option value disabled>Choose Locality</option>
              <option
                v-for="(lga , index) in states[currentIndex].area"
                :key="index"
              >{{lga | capitalize}}</option>
            </b-select>
          </b-field>

          <b-field
            horizontal
            label="Area"
            v-if="area.length != 0 && locality != '' && state != '' "
          >
            <b-select
              placeholder="Choose area"
              expanded
              required
              v-model="locateArea"
              @input="onchange"
            >
              <option value disabled>Choose Locality</option>
              <option v-for="(area , index) in area" :key="index">{{area}}</option>
            </b-select>
          </b-field>

          <b-field horizontal label="Street">
            <b-input
              placeholder="Street"
              expanded
              required
              v-model="street"
              v-on:onChange="hello($event)"
            ></b-input>
          </b-field>

          <!-- FORM TWO  -->
          <b-field horizontal label="Purpose" class="tds-multiple-button">
            <span v-for="(option , index) in buttonNames.purpose" :key="index">
              <p>
                <label class="button" :class="{ tdsblack : isChecked(option)}">
                  <input
                    type="radio"
                    :value="option"
                    v-model="purpose"
                    @change="changedPurpose"
                    checked
                    required
                  >
                  {{option}}
                </label>
              </p>
            </span>
          </b-field>

          <b-field horizontal label="Price">
            <b-input placeholder="Enter amount" expanded required type="number" v-model="price"></b-input>
          </b-field>

          <b-field horizontal label="Duration Required" v-if="propertyIsSale()">
            <b-select placeholder="Choose Duration" expanded required v-model="duration">
              <option value disabled>Choose Duration</option>
              <option value="1 month">1 month</option>
              <option value="6 month">6 month</option>
              <option value="1 year">1 years</option>
              <option value="2 year">2 years</option>
              <option value="3 year">3 years</option>
              <option value="4 year">4 years</option>
              <option value="NONE">Doesn't Apply</option>
            </b-select>
          </b-field>

          <b-field horizontal label="Use of Property" class="tds-multiple-button">
            <p>
              <span v-for="(use , index) in buttonNames.use" :key="index">
                <label
                  :class="{ tdsblack : use_of_property === use }"
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
              <option value="COMMERCIAL">Commercial property</option>
            </b-select>
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

          <div class="edit-image-grid">
            <div class="edit-image">
              <span class="delete tds-edit-danger"></span>
              <img
                src="https://i2-prod.bristolpost.co.uk/incoming/article1321112.ece/ALTERNATES/s615/Tiverton-outside.jpg"
              >
            </div>
            <div class="edit-image">
              <span class="delete tds-edit-danger"></span>
              <img
                src="https://photos-a.propertyimages.ie/media/2/9/5/3813592/d9a73c5a-f365-43eb-9656-1094c4b2ecc7_l.jpg"
              >
            </div>
            <div class="edit-image">
              <span class="delete tds-edit-danger"></span>
              <img
                src="https://photos-a.propertyimages.ie/media/2/9/5/3813592/d9a73c5a-f365-43eb-9656-1094c4b2ecc7_l.jpg"
              >
            </div>
            <div class="edit-image">
              <span class="delete tds-edit-danger"></span>
              <img
                src="https://photos-a.propertyimages.ie/media/2/9/5/3813592/d9a73c5a-f365-43eb-9656-1094c4b2ecc7_l.jpg"
              >
            </div>
            <div class="edit-image">
              <span class="delete tds-edit-danger"></span>
              <img
                src="https://cdn.vox-cdn.com/thumbor/FVQtX33GLn68_1SzCXtookTISs0=/0x0:1270x712/1200x800/filters:focal(534x255:736x457)/cdn.vox-cdn.com/uploads/chorus_image/image/62829088/sims1.0.jpg"
              >
            </div>
            <div class="edit-image">
              <span class="delete tds-edit-danger"></span>
              <img
                src="https://cdn.vox-cdn.com/thumbor/FVQtX33GLn68_1SzCXtookTISs0=/0x0:1270x712/1200x800/filters:focal(534x255:736x457)/cdn.vox-cdn.com/uploads/chorus_image/image/62829088/sims1.0.jpg"
              >
            </div>
          </div>
          <b-field align="center">
            <!-- Label left empty for spacing -->
            <p class="tds-form-button-holder">
              <button class="button tds-primary-button" @click="next">SUBMIT</button>
            </p>
          </b-field>
        </form>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import formData from '~/components/forms/formlocations.json'
import { async } from 'q'
console.log(formData)
export default {
  data() {
    return {
      states: formData,
      state: '',
      locality: '',
      street: '',
      area: [],
      locateArea: '',
      currentIndex: 0,
      purpose: [],
      buttonNames: {
        purpose: ['SALE', 'RENT', 'SHORT', 'NEW', 'INSTALLMENT'],
        use: ['Commercial', 'Residential']
      },
      price: '',
      duration: '',
      use_of_property: [],
      bedrooms: '',
      bathrooms: '',
      type_of_property: '',
      toilets: '',
      description: '',
      images: []
    }
  },
  // props:['form1', 'next'],
  methods: {
    propertyIsLand() {
      return this.type_of_property != 'LAND'
    },
    chooseProperty() {
      console.log('changed')
      this.bathrooms = ''
      this.bedrooms = ''
      this.toilets = ''
    },
    isChecked(value) {
      return this.purpose.includes(value)
    },
    propertyIsSale() {
      return this.purpose != 'SALE' && this.purpose != 'NEW'
    },
    hello(event) {
      this.state = event.target.value
      let index = event.target.selectedIndex - 1
      this.currentIndex = index

      this.locality = ''
      this.area = []
    },
    onchange() {
      this.area = []
      console.log('hello')
      let stateArray = this.states[this.currentIndex].places
      if (stateArray.length === 0) {
        console.log(stateArray)
        console.log('empty')
        this.area = []
      } else {
        stateArray.forEach(element => {
          if (element[this.locality]) {
            this.area = element[this.locality]
            // console.log(element[this.locality])
          }
        })
      }
    },
    changedPurpose() {
      this.duration = ''
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
  next() {
    let payload = {
      use_of_property: this.use_of_property[0],
      type_of_property: this.type_of_property,
      bedrooms: this.bedrooms,
      bathrooms: this.bathrooms,
      toilets: this.toilets,
      description: this.description,
      video_link: this.video_link,
      choose: this.choose,
      title: this.title,
      images: this.images,
      state: this.state,
      lga: this.lga,
      street: this.street,
      price: this.price,
      duration: this.duration,
      purpose: this.purpose
    }
    if (this.type_of_property === 'LAND') {
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
    } else {
      if (
        this.purpose == [] ||
        this.use_of_property == [] ||
        this.bedrooms == '' ||
        this.bathrooms == '' ||
        this.toilets == '' ||
        this.description == '' ||
        this.type_of_property == '' ||
        this.title == '' ||
        this.state == '' ||
        this.lga == '' ||
        this.street == '' ||
        this.price == '' ||
        this.duration == '' ||
        this.purpose == ''
      ){
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
        } else if (this.state == '') {
          let mgs = 'state is empty'
          this.error(mgs)
        } else if (this.lga == '') {
          let mgs = 'Locality is not fixed'
          this.error(mgs)
        } 
        else if (this.purpose == '') {
          let mgs = 'purpose is empty '
          this.error(mgs)
        }else if (this.street == ''){
          let mgs = 'street is empty'
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
  }
}
</script>

<style>
.edit-image-grid {
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: center;
  align-items: center;
  grid-gap: 15px;
}
.edit-image-grid .edit-image {
  width: 250px;
}
.tds-edit-danger {
  background: red;
}
</style>
