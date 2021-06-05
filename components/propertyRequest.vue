<template>
    <div>
      <header class="tds-titles" align="center">
        <b>Property</b> Request
        <hr>
      </header>
      <div class="property-request-form">
        <form @submit.prevent="next" validate class="tds-special-form">
          <b-field horizontal label="Purpose">
            <div class="block">
              <span>
                <b-radio class="is-black" v-model="purpose"  native-value="Buy" required>Buy</b-radio>
                <b-radio v-model="purpose"  native-value="Rent">Rent</b-radio>
                <b-radio v-model="purpose"  native-value="Shortlet">Shortlet</b-radio>
                <b-radio v-model="purpose"  native-value="New Development" required>New Developments</b-radio>
                <b-radio v-model="purpose"  native-value="Pay in Installment">Pay in Installments</b-radio>
              </span>
            </div>
          </b-field>
          <b-field horizontal label="Budget">
            <b-input placeholder="500000" expanded required type="number" v-model="budget"></b-input>
          </b-field>

          <b-field horizontal label="Type of Property" >
          <b-select placeholder="Choose Property Type" expanded required @input="chooseProperty()" v-model="type_of_property">
            <option value  disabled> select type of property</option>
            <option value="FLAT OR APARTMENT">Flat or Apartment</option>
            <option value="HOUSE">House</option>
            <option value="LAND">Land</option>
            <option value="COMMERCIAL">Commercial Property</option>
          </b-select>
        </b-field>

          <b-field horizontal label="No of Bedrooms" v-if="propertyIsLand()" >
            <b-input placeholder="3" expanded required type="number" v-model="bedrooms"></b-input>
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
          <b-select placeholder="Choose Locality" expanded required v-model="locality" @input="onchange">
            <option value disabled>Choose Locality</option>
            <option
              v-for="(lga , index) in states[currentIndex].area"
              :key="index"
            >{{lga | capitalize}}</option>
          </b-select>
        </b-field>

        <b-field horizontal label="Area" v-if="area.length != 0 && locality != '' && state != '' ">
          <b-select
            placeholder="Choose area"
            expanded
            required
            v-model="locateArea"
            @input="onchange"
          >
            <option value disabled>Choose LGA</option>
            <option v-for="(area , index) in area" :key="index">{{area}}</option>
          </b-select>
        </b-field>

        <b-field horizontal label="Description" >
          <b-input type="textarea" placeholder="Enter Description" v-model="description" required></b-input>
        </b-field>


          <b-field horizontal>
            <!-- Label left empty for spacing -->
            <p>
              <button class="button tds-primary-button">POST REQUEST</button>
            </p>
          </b-field>
        </form>
      </div>
    </div>
</template>



<script>
import formData from '~/components/forms/formlocations.json'
console.log(formData)
export default {
  data() {
    return {
      budget: '',
      bedrooms: '',
      states: formData,
      state: '',
      LGA: '',
      currentIndex: 0,
      description: '',
      purpose: '',
      locality: '',
      locateArea: '',
      area: [],
      type_of_property:'',
      description:''
    }
  },
  methods: {
    hello(event) {
      this.state = event.target.value
      let index = event.target.selectedIndex - 1
      this.currentIndex = index
    },
     chooseProperty(){
      this.bedrooms = ''
    },
    propertyIsLand() {
      return this.type_of_property != 'LAND'
      this.bedrooms = ''
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
    next() {
      if (this.state == ''|| this.budget == '' || this.locality == '' || this.purpose == '' || this.type_of_property == '' || this.description == '') {
        if(this.state == ''){
          console.log(mgs)
          let mgs = 'state cannot be left blank'
          this.error(mgs)
        }else if(this.purpose == ''){
          let mgs = 'purpose cannot be left blank'
          this.error(mgs)
        }else if(this.type_of_property == ''){
          let mgs = 'type of property cannot be left blank'
          this.error(mgs)
        }
      }else{
          console.log('completed')
        let load = {
            isActive: true,
            msg: 'completed'
        }
        this.$store.commit('notify/success', load)
        this.$store.dispatch('notify/selfReset')
        // this.$router.push({path:'/'})
        this.postRequest()
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

    async postRequest(){

      let f = {
        purpose: this.purpose,
        budget: this.budget,
        type_of_property: this.type_of_property,
        state: this.state,
        lga: this.locality,
        area: this.locateArea,
        description: this.description,
        bedrooms: this.bedrooms
      }
      try {
        let link = ''
        this.$axios.setToken(this.storage.token, 'Bearer')
        const postData = await this.$axios.$post('post_requests', { post_request:f }).then( data => 
          link = data.permalink
          
        )
        this.$router.push({ path: '/p/requests', query: { url: link, modal: true } })
        console.log(f)
      }catch (e){
        console.log(e)
      }
      
    }
  },
  filters: {
    capitalize(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style>
.b-radio.radio input[type=radio] + .check{
    width: 1em;
    height: 1em;
}
</style>
