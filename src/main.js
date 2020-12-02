import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import axios from 'axios'
import checkLoggedIn from './plugins/check-logged-in'

import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  checkLoggedIn,
  render: h => h(App)
}).$mount('#app')
