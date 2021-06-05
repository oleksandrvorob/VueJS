export const state = () => ({
    modal: false,
    seeRequestModal:false,
    permalink: '',
    requestDetails: {},
    picture:false,
    filterModal: false,
    index: '',
    noscroll:false,
    listingModal:false,
    propertyBoosted:undefined,
    stats: {}
  })
  
  export const mutations = {
    closelistingModal(state, payload){
      state.noscroll = payload;
      state.listingModal = payload
    },
    clearBoostModal(state){
      state.propertyBoosted = undefined
    },
    propertyBoosted(state, modal){
      state.propertyBoosted = modal
    },
    toggleModal (state) {
      state.modal = !state.modal
    },
    toggleModalFilter(state){
      state.filterModal = !state.filterModal
    },
    seeRequest(state){
      state.seeRequestModal = !state.seeRequestModal
    },
    setPermalink(state, payload){
      state.permalink = payload
    },
    setRequestData(state, payload){
      state.requestDetails = payload
    },
    Zoomin(state){
      state.picture = !state.picture
    },

    setIndex(state, payload){
      state.index = payload
    },

    stats(state, payload){
      state.stats = payload
    }

  }

export const actions = {

  async getRequestDetails( {commit, state}, payload ) {
    try {
      this.$axios.setToken(payload.token, 'Bearer')
      const postRequests = await this.$axios.get(payload.url)
      commit('setRequestData', postRequests.data)
      console.log(state.requestDetails)
    } catch (e) {
      console.log(e)
    }
  }
}