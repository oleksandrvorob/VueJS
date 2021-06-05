<template>
  <div class="advertise-payment">
    <div class="tds-grid">
      <div class="responsive-payment">
        <div class="tds-title-tab">Pick A Plan</div>

        <div class="tds-payment-holder">
          <div class="tds-tab-title-tile">
            Plan:
            <div class="select">
              <select v-model="plan" @change="changePlan">
                <option disabled value>Select Option</option>
                <option value="BASIC">Basic</option>
                <option value="CLASSIC">Classic</option>
                <option value="PRO">Pro</option>
                <option value="CUSTOM">Custom</option>
              </select>
            </div>
          </div>

          <div class="tds-tab-title-tile">
            Duration:
            <div class="select">
              <select v-model="duration">
                <option disabled value>Select Option</option> 
                <option v-for="n in 12" :key="n" :value="n">{{n}} {{n === 1? 'Month' : 'Months'}} </option>
                <option></option>
              </select>
            </div>
          </div>
          <div v-if="currentPlan === plan" >
            <div class="tds-tab-title-tile">
              Additional Boost (₦550/Boost):
              <div class="select">
                <select v-model="additionalBoost">
                  <option disabled value>0</option>
                  <option v-for="n in 12" :key="n">{{n}}</option>
                  <option></option>
                </select>
              </div>
            </div>
            <div class="tds-tab-title-tile">
              Additional Priority Listing (₦500/Boost)
              <div class="select">
                <select v-model="additionalList">
                  <option disabled value>0</option>
                  <option v-for="n in 12" :key="n">{{n}}</option>
                  <option></option>
                </select>
              </div>
            </div>
          </div>
          
        </div>

        <div class="tds-payment-holder">
          <div class="tds-tab-title-tile">
            Payment Method
            <div class="select">
              <select v-model="paymentMethod">
                <option selected value="Paystack">Paystack</option>
              </select>
            </div>
            <!-- </div> -->
          </div>
        </div>
      </div>
      <div class="responsive-payment">
        <div class="tds-title-tab">Plan Details</div>
        <div class="tds-payment-holder">
          <table class="table is-fullwidth">
            <tbody>
              <tr>
                <td>Plan</td>
                <td class="is-title">
                  {{plan.charAt(0).toLocaleUpperCase() + plan.slice(1, plan.length)}}
                </td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>
                  <b>{{duration}} {{duration === 1? 'Month' : 'Months'}}</b>
                </td>
              </tr>

              <tr>
                <td>Regular Listing</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>Priority Listings</td>
                <td>{{priority}}</td>
              </tr>
               <tr>
                <td>Priority Boosts</td>
                <td>{{boost}}</td>
              </tr>
              <tr>
                <td>
                  <hr>
                </td>
                <td>
                  <hr>
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{{ price | currency }}</td>
              </tr>
              <!-- <tr>
                <td>Addons</td>
                <td>₦2,500</td>
              </tr> -->

              <tr v-if="duration >= 3 && duration <= 5">
                <td>Discount</td>
                <td>5%</td>
              </tr>

              <tr v-if="duration >= 6 && duration <= 11">
                <td>Discount</td>
                <td>10%</td>
              </tr>
              <tr v-if="duration >= 12">
                <td>Discount</td>
                <td>15%</td>
              </tr>

              <tr>
                <td>
                  <hr>
                </td>
                <td>
                  <hr>
                </td>
              </tr>
              <tr>
                <td>
                  <b>TOTAL</b>
                </td>
                <td>
                  <b>{{ totalAmount | currency}}</b>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="tds-payment">
            <paystack
              :amount="totalAmount*100"
              :email="email"
              :paystackkey="paystackKey"
              :reference="reference"
              :callback="callback"
              :close="close"
              :embed="false">
            <span class="button tds-primary-button" style="display:none" ref="paystack" >
            Make Payment
            </span>

          </paystack>
            <span class="button tds-primary-button" @click="transaction" v-if="this.$route.query.plan !='FREE'">
              Make Payment
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// all values of the form are logged to the console
import paystack from 'vue-paystack';

export default {
  props: ['subactive'],
  components: { paystack },
  data() {
    return {
      advertise: [],
      plan: '',
      duration: 1,
      paymentMethod: 'Paystack',
      additionalBoost: '',
      additionalList:'',
      price:'',
      priority: '',
      boost: '',
      // Paystack
      currentPlan:'',
      paystackKey: 'pk_live_7d935fc7df0c78afc094bb0b85861f83e0e9a1fe', //paystack public key
      email: '', // Customer email
      amount: 0,// in kobo
      reference: ''
    }
  },
  methods: {
    callback(response){
      let payload = {
        token: this.storage.token,
        reference: response.reference,
        actionLink: 'subscribe',
      }
      this.$store.dispatch('transaction/verifyPayment', payload)
    },
    close(){
      console.log("Payment closed")
    },
    changePlan() {

      let plan = this.plan
      this.advertise.forEach((e, index) => {
        if (e.plan === plan) {
          this.subActive = index
          this.price = this.advertise[index].price
          this.priority = this.advertise[index].priority
          this.boost = this.advertise[index].boost
          let payload = index
          this.$store.commit('propertyads/selectedPlan', payload)
        }
      })

      this.$router.push({ path: '/promote-property/pricings', query: {plan: plan} })
    },

    initiatePayment(){
      this.$refs.paystack.click()
      console.log('clicked me')
    },
    async transaction() {
      
      let f = {
        amount: this.totalAmount, 
	      transaction_for: this.plan,
	      duration: this.duration
      }

      try {
        this.$axios.setToken(this.storage.token, 'Bearer')
        const transaction = await this.$axios.post('/transactions', { transaction: f })
        this.email = transaction.data.email
        this.amount = transaction.data.amount
        this.reference = transaction.data.ref_no
        this.initiatePayment()
      } catch (e) {
        console.log(e)
      }
    
    },
    loggedDetails() {
      if(this.price !='' && this.duration != '' && this.paymentMethod != ''){
        
        let load = {
          isActive:true,
          msg: 'completed'
        }
        this.$store.commit('notify/success', load);
        this.$store.dispatch('notify/selfReset')
      }else{
        let load = {
          isActive:true,
          msg: 'incomplete fields'
        }
        this.$store.commit('notify/failed', load);
        this.$store.dispatch('notify/selfReset')
      }
    }
  },
  mounted(){
    this.plan = this.$route.query.plan
    console.log(this.plan)
    let plan = this.$route.query.plan
    // this.currentPlan = this.$store.state.propertyads.currentPlan
    
      this.advertise.forEach((e, index) => {
        if (e.plan === plan) {
          this.subActive = index
          this.price = this.advertise[index].price
          this.priority = this.advertise[index].priority
          this.boost = this.advertise[index].boost
          let payload = index
          this.$store.commit('propertyads/selectedPlan', payload)
        }
      }) 
      
  },
  created() {
    this.advertise = this.$store.state.propertyads.advertise;
    this.currentPlan = this.$store.state.propertyads.currentSub
  },
  computed:{
    totalAmount(){
      if(this.duration >= 3 && this.duration <= 5){
        return (this.price * this.duration ) - ((this.price * this.duration) * 5/100)
      }
      else if(this.duration >= 6 && this.duration < 12){
        return (this.price * this.duration ) - ((this.price * this.duration) * 10/100)
      }
      else if( this.duration >= 12){
        return (this.price * this.duration ) - ((this.price * this.duration) * 15/100)
      }
      else{
        return this.price * this.duration
      } 
    }
  }
}
</script>

<style>
</style>
