export const state = () => ({
  post: {}
})

export const mutations = {

    post(state, payload) {
      state.post = payload
    }
    
  }