import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signedIn: '',
    weightsDatas: [],
    weights: [],
    dates: [],
    comments: [],
    currentUser: null,
    authToken: ''
  },
  plugins: [
    createPersistedState({
      key: 'loggedIn',
      path: ['currentUser'],
      storage: window.sessionStorage
    })
  ],
  mutations: {
    fetchSignedIn(state) {
      state.signedIn = !!localStorage.signedIn
    },
    setWeightsDatas(state, weightsDatas) {
      state.weightsDatas = weightsDatas
      state.weights = weightsDatas.map(item => item.weight)
      state.dates = weightsDatas.map(item => item.date)
      state.comments = weightsDatas.map(item => item.comment)
    },
    setUser(state, payload) {
      state.currentUser = payload
    },
    setAuthToken(state, authToken) {
      state.authToken = authToken
    }
  },
  actions: {
    doFetchSignedIn({ commit }) {
      commit('fetchSignedIn')
    },
    getWeightsDatas({ commit }) {
      axios
        .get('http://localhost:3000/weights', {
          headers: { Authorization: this.state.authToken }
        })
        .then(response => {
          commit('setWeightsDatas', response.data)
        })
    },
    getAuthToken(authToken) {
      commit('setAuthToken', authToken)
    }
  },
  modules: {}
})
