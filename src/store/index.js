import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signedIn: '',
    weightsDatas: [],
    weights: [],
    dates: [],
    comments: []
  },
  mutations: {
    fetchSignedIn(state) {
      state.signedIn = !!localStorage.signedIn
    },
    setWeightsDatas(state, weightsDatas) {
      state.weightsDatas = weightsDatas
      state.weights = weightsDatas.map(item => item.weight)
      state.dates = weightsDatas.map(item => item.date)
      state.comments = weightsDatas.map(item => item.comment)
    }
  },
  actions: {
    doFetchSignedIn({ commit }) {
      commit('fetchSignedIn')
    },
    getWeightsDatas({ commit }) {
      axios.get('http://localhost:3000/weights').then(response => {
        commit('setWeightsDatas', response.data)
      })
    }
  },
  modules: {}
})
