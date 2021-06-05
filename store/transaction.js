export const actions = {

  async verifyPayment({dispatch}, payload){
    try {
       this.$axios.setToken(payload.token, 'Bearer')
       const verifyPayment = await this.$axios.$get(`/${payload.actionLink}/${payload.reference}`)
        dispatch('notify/paymentVerified', null, { root: true })
        dispatch('notify/selfReset', null, { root: true })
        $nuxt.$router.push('/my-subscription/')
       console.log(verifyPayment)
    }catch(e){
      dispatch('notify/paymentFailed', null, { root: true })
       dispatch('notify/selfReset', null, { root: true })
      console.log(e)
    }
  }

}