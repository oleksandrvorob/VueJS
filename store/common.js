export const state = () => ({
  topSpaces:{
    marginTop: 136,
    paddingTop: 50
  },
  isIndex: true,
  isTransparent: false,
  hasSticky: false,
  fullYear: new Date().getFullYear(),
  baseUrl: process.env.API_URL
})

export const mutations = {

  updateSpace(state, payload){
    state.topSpaces.marginTop = payload.marginTop;
    state.topSpaces.paddingTop = payload.paddingTop;
  }
,
  updateIsIndex(state, payload){
    state.isIndex = payload;
  },

  updateIsTransparent(state, payload){
    state.isTransparent = payload;
  },

  updateSticky(state, payload) {
    state.hasSticky = payload;
  },


}
