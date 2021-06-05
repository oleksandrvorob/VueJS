export const state = () => ({
  data: false,
  counter: 0,
  form: {
    formOne: null,
    formTwo: null,
    formThree: null,
    formFour: null
  },

  // THESE VALUES REFERS TO THE COMPONENTS VALUES IN THE POSTPROPERTY COMPONENT
  showForm: [
    'formOne',
    'formTwo',
    'formThree',
    'formFour'
  ],
  post: {
    street: '',
    lga: '',
    state: '',
    area: '',
    title: '',
    purpose: '',
    use_of_property: '',
    type_of_property: '',
    square_meters: '',
    bedrooms: 0,
    bathrooms: 0,
    toilets: 0,
    description: '',
    video_link: '',
    price: 0,
    duration: '',
  }
})

export const mutations = {
  secOne(state, payload) {
    state.post.street = payload.street,
      state.post.lga = payload.lga,
      state.post.state = payload.state,
      state.post.area = payload.area
  },

  secTwo(state, payload) {
    state.post.price = payload.price,
      state.post.duration = payload.duration
    state.post.purpose = payload.purpose
  },
  secThree(state, payload) {
    state.post.title = payload.title,
      state.post.use_of_property = payload.use_of_property
    state.post.type_of_property = payload.type_of_property
    state.post.bedrooms = payload.bedrooms
    state.post.bathrooms = payload.bathrooms
    state.post.toilets = payload.toilets
    state.post.description = payload.description
    state.post.video_link = payload.video_link
    state.post.square_meters = payload.square_meters
  },

  secFour(state, payload) {
    state.post.images = payload
  },



















  completeData(state) {
    state.data = true
  },
  incompleteData(state) {
    state.data = false
  },
  formOneData(state, payload) {
    state.form.formOne = payload
  },
  formTwoData(state, payload) {
    state.form.formTwo = payload
  },
  formThreeData(state, payload) {
    state.form.formThree = payload
  },
  formFourData(state, payload) {
    state.form.formFour = payload
  },
  nextcount(state) {
    state.counter += 1
  },
  prevcount(state) {
    state.counter -= 1
  },
  resetCount(state) {
    state.counter = 0
  }
}
export const actions = {
  selfReset(context) {
    setTimeout(() => {
      context.commit('resetCount')
    }, 2000)
  },



  async newPost({ state, dispatch, commit }, payload) {
    let postData = new FormData();
    let permalink;

    postData.append('post[title]', state.post.title);
    postData.append('post[price]', state.post.price)
    postData.append('post[description]', state.post.description);
    postData.append('post[street]', state.post.street);
    postData.append('post[lga]', state.post.lga);
    postData.append('post[area]', state.post.area);
    postData.append('post[state]', state.post.state);
    postData.append('post[purpose]', state.post.purpose);
    postData.append('post[use_of_property]', state.post.use_of_property);
    postData.append('post[type_of_property]', state.post.type_of_property);
    postData.append('post[bedrooms]', state.post.bedrooms);
    postData.append('post[bathrooms]', state.post.bathrooms);
    postData.append('post[toliets]', state.post.toilets);
    postData.append('post[video_link]', state.post.video_link);
    postData.append('post[duration]', state.post.duration);
    postData.append('post[square_meters]', state.post.square_meters);


    Array.from(payload.images).forEach((f) => {
      postData.append('images[]', f, f.name)
      console.log(f)
    })

    try {
      this.$axios.setToken(payload.token, 'Bearer')
      const newPost = await this.$axios.$post('posts', postData)
      dispatch('spinner/stopSpinning', null, { root: true })
      permalink = newPost.permalink
      console.log(newPost)

      dispatch('notify/uploaded', null, { root: true })
      dispatch('notify/selfReset', null, { root: true })

      $nuxt.$router.push('/properties/' + permalink)
      console.log(newPost)
    } catch (e) {
      if (e.message === 'Network Error') {
        let payload = {
          msg: "Your internet is slow or you're not connected",
          isActive: true
        }
        commit('notify/failed', payload, { root: true })
        dispatch('notify/selfReset', null, { root: true })
        dispatch('spinner/stopSpinning', null, { root: true })
      } else {
        dispatch('spinner/stopSpinning', null, { root: true })
        dispatch('notify/uploadFailed', null, { root: true })
        dispatch('notify/selfReset', null, { root: true })
      }
    }

  }
}

// this helps keep the form component alive
// export const getters ={
//   component(state){
//     return state.showForm[state.counter]
//   },
// }