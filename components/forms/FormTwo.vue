<template>
  <div>
    <div class="form-2 tds-post-property-form">
      <form @submit.prevent validate>
        <b-field horizontal label="Purpose" class="tds-multiple-button">
          <span v-for="(option , index) in buttonNames.purpose" :key="index">
            <p>
              <label class="button" :class="{ tdsblack : isChecked(option.value)}">
                <input type="radio" :value="option.value" v-model="purpose" @change="changedPurpose" checked required>
                {{option.name}}
              </label>
            </p>
          </span>
        </b-field>
        <b-field horizontal label="Price">
          <b-input placeholder="Enter amount" expanded required type="number" v-model="price" min="0"></b-input>
        </b-field>
        <b-field horizontal label="Duration Required" v-if="propertyIsSale()">
          <b-select placeholder="Choose Duration" expanded required v-model="duration">
            <option value disabled>Choose Duration</option>
            <option value="1 day" v-if="purpose === 'SHORT'"> Per day </option>
            <option value="1 month">1 month</option>
            <option value="6 month">6 month</option>
            <option value="1 year">1 year</option>
            <option value="2 year">2 years</option>
            <option value="3 year">3 years</option>
            <option value="4 year">4 years</option>
            <option value="NONE">Doesn't Apply</option>
          </b-select>
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
      price: '',
      duration: '',
      purpose:[],
      buttonNames: {
        purpose: [
          {name:'SALE', value:'SALE'},
          {name:'RENT', value:'RENT'},
          {name:'SHORT LET', value:'SHORT'},
          {name:'NEW DEVELOPMENTS', value:'NEW'},
          {name:'PAY IN INSTALLMENTS', value:'INSTALLMENT'}
        ]
      }
    }
  },
  methods: {
    changedPurpose(){
      this.duration = ''
    },
    propertyIsSale(){
      return this.purpose != "SALE" && this.purpose  != "NEW"
    },
    isChecked(value) {
      if(this.purpose === value){
        return true
      }
    },
    next() {
      let payload = {
        price: this.price,
        duration: this.duration,
        purpose: this.purpose
      }
      if(this.purpose === "SALE" || this.purpose === "NEW"){
        if (this.price == '' || this.purpose == '') {
          if (this.purpose == '') {
            let mgs = 'purpose is empty '
            this.error(mgs)
          }
        } else {
          this.$store.commit('postproperty/nextcount')
          this.$store.commit('postproperty/secTwo', payload)
        }
      }else{
        if (this.price == '' || this.duration == ''|| this.purpose == '') {
          if (this.purpose == '') {
            let mgs = 'purpose is empty '
            this.error(mgs)
          }
        } else {
          this.$store.commit('postproperty/nextcount')
          this.$store.commit('postproperty/secTwo', payload)
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
.tds-is-secondary{
  background:white !important;
  color:black;
  border:1px solid black;
}
</style>
