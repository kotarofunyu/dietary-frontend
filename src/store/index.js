import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signedIn: ''
  },
  mutations: {
    fetchSignedIn (state) {
      state.signedIn = !!localStorage.signedIn
    }
  },
  actions: {
    doFetchSignedIn ({ commit }) {
      commit('fetchSignedIn')
    }
  },
  modules: {}
})
