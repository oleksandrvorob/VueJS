export const state = () => ({
  isAutheticated:false,
  currentUser: {},
  isCurrentUser: false
})

export const mutations = {
  login(state){
    state.isAutheticated = true  
  // console.log(this._vm.storage.token)
  },

  logOut(state) {
    state.isAutheticated = false
  },

  checkValidity(state){
    let expTime = state.currentUser.exp
    // let expTime = 1552298382
    let currentTime = new Date()
    let unixTime = Math.floor(currentTime/1000)

    if (expTime >= unixTime) {
      state.isAutheticated = true
      console.log(true)
    }else{
      state.isAutheticated = false
      console.log(false)
    }
  },

  parseJwt(state,token) {
    if (token){
      let base64Url = token.split('.')[1]
      state.currentUser = JSON.parse(atob(base64Url))
    }
  },

  
  currentUserStatus(state, payload){
    state.isCurrentUser = payload
  }

}

export const getters = {
  getUser(state){
      if (!state.isAutheticated){
          return false
      }else{
          return true
      }
  }
}