export const state = () => ({
  currentSub:'classic',
  currentPlan: 0,
  advertise: [{
      title: 'Free',
      price: '00',
      plan: 'FREE'
    },
    {
      title: 'Basic',
      price: 2000,
      plan: 'BASIC',
      priority: 5,
      boost: 5
    },
    {
      title: 'Classic',
      price: 5000,
      plan: 'CLASSIC',
      priority: 15,
      boost: 10
    },
    {
      title: 'Pro',
      price: 12500,
      plan: 'PRO',
      priority: 40,
      boost: 20
    },
    {
      title: 'Customized',
      price: 20000,
      plan: 'CUSTOM',
      priority: 60,
      boost: 30
    }
  ]
})

export const mutations = {
  selectedPlan(state, payload) {
    state.currentPlan = payload
  }
}
