export const state = () => ({
  searchResults: [],
  links: {}
})

export const mutations = {
  setSearchResults(state, payload){
    state.searchResults = payload
  },

  setLinks(state, payload){
    state.links = payload
  }
}

export const actions = {
  async searchQuery( {commit}, state, payload ) {
    try {
      const searchResult = await this.$axios.$get(payload)
      commit('setSearchResults', searchResult.data)
      console.log(state.searchResults)
    } catch (e) {
      console.log(e)
    }
  }
}