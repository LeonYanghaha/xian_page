import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    query_word: ''
  },
  mutations: {
    change_query_word (state, data) {
      state.query_word = data.kw
    },
    user_active (state) {
    }
  },
  actions: {

  }
})
