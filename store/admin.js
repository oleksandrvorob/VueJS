export const state = () => ({
  modalshown:false,
  hideNavBar: false,
  showMessage:false,
  admin: {},
  subDetails: {}

})

export const mutations = {
  closemodal(state, payload){
    state.modalshown = payload
  },
  removeNavbar(state, payload){
    state.hideNavBar = payload
  },
  OpenMessage(state, payload){
    state.showMessage = payload
  },

  setAdmin(state, payload){
    state.admin = payload
  },

  sub(state, payload) {
    state.subDetails = payload
  }

}

export const actions = {
  async setAdminDetails({state, commit}, {token}){
    console.log(token)
    // debugger
    await this.$axios.setToken(token,'Bearer');
    try {
      let result = await this.$axios.$get('admin') 
      commit('setAdmin', result)
      // state.admin = result
    } catch (error) {
      console.log(error)
    }

  }
}