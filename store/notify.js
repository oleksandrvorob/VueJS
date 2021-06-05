export const state = () => ({
  notificationType: '',
  isActive: false,
  msg: ''
})

export const mutations = {

  success(state, payload) {
    state.notificationType ='is-success'
    state.msg = payload.msg
    state.isActive = payload.isActive
  },
  failed(state, payload) {
    state.notificationType = 'is-danger'
    state.msg = payload.msg
    state.isActive = payload.isActive
  },
  warning(state, payload){
    state.notificationType = 'is-warning'
    state.msg = payload.msg
    state.isActive = payload.isActive
  },
  reset(state) {
    state.notificationType = ''
    state.msg = ''
    state.isActive = false
  }
}

export const actions = {

  selfReset(context){
    setTimeout(() => {
      context.commit('reset')
    }, 3000) 
  }, 

  uploaded({commit}){
    let load = {
      msg: 'Your post was successfully uploaded',
      isActive: true
    }
    commit('success', load)
  },

  uploadFailed({commit}){
    let load = {
      msg: 'Something went wrong please try again.',
      isActive: true
    }
    commit('failed', load)
  },

  paymentVerified({commit}){
    let load  = {
      msg: "Payment Verified",
      isActive: true
    }
    commit('success', load)
  },

  paymentFailed({commit}){
    let load = {
      msg: "We could not verify your payment.",
      isActive: true
    }
    commit('failed', load)
  }

}