import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    userType: 'user',
    bookdata: []
  },
  mutations: {
    addvalue (state, data) {
      state.bookdata = data
      // console.log('=======================', state.bookdata)
    }
  },
  getters: {

  },
  actions: {

  }
})

export default store
