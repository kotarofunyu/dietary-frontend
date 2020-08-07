import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {
  securedAxiosInstance,
  plainAxiosInstance
} from '../javascript/axios/axios.js'

Vue.config.productionTip = false
Vue.use(axios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

new Vue({
  router,
  store,

  render: (h) => h(App)
}).$mount('#app')
