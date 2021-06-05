export const state = () => ({
  isActive: false
})

export const mutations = {

  spin(state, payload) {
    state.isActive = payload
  }
}

export const actions = {

  stopSpinning({commit}) {
    commit('spin', false)
  },

}