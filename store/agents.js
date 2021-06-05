export const state = () => ({
  show : true,
  Agents: [],
  currentAgentPosts: [],
  links: {}
})

  

export const mutations = {
  Closespinnner(state, payload){
    state.show = payload
  },
  AgentsPosts(state, payload){
    state.currentAgentPosts = payload
  },

  deletePost(state, payload) {
    state.currentAgentPosts.splice(payload, 1);
  },

  postLinks(state, payload){
    state.links = payload
  }
}

export const actions = {
    async getAgentPosts({commit}, payload) {
      var purpose

      switch (payload.tab) {
        case 0:
          purpose = "SALE"
          console.log(purpose)
          break
        case 1:
          purpose = "RENT"
          console.log(purpose)
          break
        case 2:
          purpose = "SHORT"
          console.log(purpose)
          break
        case 3:
          purpose = "NEW"
          console.log(purpose)
          break
        case 4:
          purpose = "INSTALLMENT"
          console.log(purpose)
          break
        default:
          purpose = "SALE"
          console.log(purpose)
      }

      try {
        const posts = await this.$axios.$get(`agents/${payload.username}/purpose?q=${purpose}&page=${payload.page}`)
        // state.currentAgentPosts = posts.data
        console.log(posts.links, payload.page)
        commit('AgentsPosts', posts.posts)
        commit('postLinks', posts.links)
        commit('Closespinnner' , false)

      } catch (e) {
        console.log(e)
      }
    }
}