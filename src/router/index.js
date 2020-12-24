import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Record from '../views/Record.vue'
import Signup from '../views/SignUp.vue'
import Signin from '../views/SignIn.vue'
import firebase from '../plugins/firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/record',
    name: 'Record',
    component: Record,
    meta: { requiresAuth: true }
  },
  {
    path: '/signin',
    name: 'Singin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(recode => recode.meta.requiresAuth)
  if (requiresAuth && !(await firebase.getCurrentUser())) {
    next({ path: '/signin', query: { redirect: to.full_path } })
  } else {
    next()
  }
})

export default router
