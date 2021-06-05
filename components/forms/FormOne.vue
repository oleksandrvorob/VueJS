<template>
  <div class="form-1 tds-post-property-form">
    <no-ssr>
      <form @submit.prevent validate>
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
            <option value disabled>Choose Area</option>
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

        <b-field horizontal>
          <!-- Label left empty for spacing -->
          <p>
            <button class="button tds-primary-button" @click="next">PROCEED</button>
          </p>
        </b-field>
      </form>
    </no-ssr>
  </div>
</template>

<script>
import formData from './formlocations.json'
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
      currentIndex: 0
      // locality: ''
    }
  },
  // props:['form1', 'next'],
  methods: {
    hello(event) {
      this.state = event.target.value
      let index = event.target.selectedIndex - 1
      this.currentIndex = index

      this.locality ='';
      this.area = []
    },
    next() {
      let payload = {
        state: this.state,
        lga: this.locality,
        street: this.street,
        area: this.locateArea
      }
      if (this.state === '' || this.lga === '' || this.street === '' || this.locality === '') {
        if (this.state === '') {
          let mgs = 'state is empty'
          this.error(mgs)
        } else if (this.lga === '') {
          let mgs = 'LGA is empty'
          this.error(mgs)
        } else if(this.locality === ''){
          let mgs = 'Locality is empty'
          this.error(mgs)
        }
        else {
          let mgs = 'Street is empty'
          this.error(mgs)
        }
      }else if(this.area.length > 0 && this.locateArea === ''){
        let mgs = 'Area is empty'
        this.error(mgs)
      } else {
        this.$store.commit('postproperty/nextcount')
        this.$store.commit('postproperty/secOne', payload)
      }
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
    error(mgs) {
      let payload = {
        msg: mgs,
        isActive: true
      }
      this.$store.commit('notify/failed', payload)

      this.$store.dispatch('notify/selfReset')
    },
    reset() {
      this.$store.commit('notify/reset')
      console.log('Closed')
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
  }
}
</script>

<style>
</style>
