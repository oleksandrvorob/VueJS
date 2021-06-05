<template>
    <paystack
        :amount="amount"
        :email="email"
        :paystackkey="paystackkey"
        :reference="reference"
        :callback="callback"
        :close="close"
        :embed="false"
    >
       <i class="fas fa-money-bill-alt"></i>
       Make Payment
    </paystack>
</template>

<script type="text/javascript">
import paystack from 'vue-paystack';
export default {
    components: {
        paystack
    },
    data(){
        return{
          paystackkey: "pk_live_7d935fc7df0c78afc094bb0b85861f83e0e9a1fe", //paystack public key
          email: "kebe@amaniart.net", // Customer email
          amount: 2000000,// in kobo
          reference: "5HMHOP29AJOF6L07972CB328F00PJK4K6A23A525"
        }
    },
    methods: {
      callback: function(response){
        console.log(response)
      },
      close: function(){
          console.log("Payment closed")
      }
    }
}
</script>