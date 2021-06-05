export const state = () => ({
  empty:null
})

export const mutations = {
  emptyFields(state, payload){
    state.empty = payload
  }
}

export const actions = {
  async postMessage({state, dispatch, commit }, payload) {
    commit('contact/emptyFields', true, {root: true})

    try {

      await this.$axios.post('contacts', payload)

      let load = {
        msg: "Message sent succesfully",
        isActive: true
      }
      commit('spinner/spin', false, {root: true})

      commit('notify/success', load, { root: true });
      dispatch('notify/selfReset', null, { root: true })

      


    } catch (error) {
      if(error.message === 'Network Error'){
        commit('contact/emptyFields', false, {root: true})

        let load = {
          msg: "Your internet is slow or you're not connected",
          isActive: true
        }
        commit('spinner/spin', false, {root: true})
        commit('notify/failed', load, { root: true });
        dispatch('notify/selfReset', null, { root: true })
        
      }else{
        state.empty = false

        let load = {
          msg: "Error sending message",
          isActive: true
        }

        commit('notify/failed', load, { root: true });
        dispatch('notify/selfReset', null, { root: true })
        commit('spinner/spin', false, {root: true})
      }

    }

  }
}