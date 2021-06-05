export const state = () => ({
  small: [],
  large: [],
  medium: [],
  loaded: false
})


export const mutations ={
  smallBanners(state, payload){
    state.small = payload
  },

  largeBanners(state, payload) {
    state.large = payload
  },

  mediumBanners(state, payload) {
    state.medium = payload
  },

  isLoaded(state){
    state.loaded = true
  }
}



export const actions = {
  async getBanners({commit}, payload) {

    try {
      const banner = await this.$axios.$get(`/banner-promo?type=${payload}`)
      console.log(banner)
      if (banner) commit('isLoaded');

      if (payload == "SMALL"){
        commit('smallBanners', banner)
      } else if (payload == "MEDIUM") {
        commit('mediumBanners', banner)
      } else{
        commit('largeBanners', banner)
      }
    } catch (e) {
      console.log(e)
    }
  }
}