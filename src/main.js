import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import axios from './plugins/axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  vuetify,
  // checkLoggedIn,
  render: h => h(App)
}).$mount('#app')
