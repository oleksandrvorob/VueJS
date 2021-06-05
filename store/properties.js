export const state = () => ({
  properties: [],
  singlePost: {}

})

export const mutations = {
  setPosts(state, payload) {
    state.properties = payload
  },
  setSingPost(state, payload) {
    state.singlePost = payload
  },
  updateSaved(state, payload){
    state.singlePost.saved = payload.saved
    if (payload.unsaveUrl) state.singlePost.unsave_url = payload.unsaveUrl

  }
}


export const actions = {

  async getPost({ commit }) {
    try {

      const postsData = await this.$axios.$get('posts')
      commit('setPosts', postsData.posts)
      console.log(postsData)
    }
    catch (e) {
      console.log(e.response.data.message)
    }
  },

  async saveProperty(store, payload) {
    try {

      this.$axios.setToken(payload.token);
      const response = await this.$axios.$post(payload.url, { marker: payload.backend });

      store.commit('updateSaved', {saved: true, unsaveUrl: response.unsave_url})

      let load = {
        isActive: true,
        msg: response.message
      }

      store.commit('notify/success', load, { root: true });
      store.dispatch('notify/selfReset',null, { root: true })

    }
    catch (e) {
      e.response.data.message ? e = e.response.data.message : e = "Unauthorized! Please sign in to continue."
      let load = {
        isActive: true,
        msg: e
      }

      store.commit('notify/failed', load, { root: true });
      store.dispatch('notify/selfReset',null, { root: true })

    }
  },
  async unsaveProperty(store, payload){
    try {

      this.$axios.setToken(payload.token);

      const response = await this.$axios.delete(payload.url);
      store.commit('updateSaved', { saved: false })

      let load = {
        isActive: true,
        msg: 'Removed from saved properties.'
      }

      store.commit('notify/warning', load, { root: true });
      store.dispatch('notify/selfReset',null, { root: true })
      
    } catch (e) {

      let load = {
        isActive: true,
        msg: 'e.response.data.message'
      }

      store.commit('notify/failed', load, { root: true });
      store.dispatch('notify/selfReset',null, { root: true })
      
    }
  }
}