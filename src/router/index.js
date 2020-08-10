import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Record from '../views/Record.vue'
import CreateView from '../views/CreateView.vue'
import User from '../views/User.vue'
import Signin from '../components/Signin.vue'

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
    component: Record
  },
  {
    path: '/create',
    name: 'CreateView',
    component: CreateView
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/signin',
    name: 'Singin',
    component: Signin
  }
]

const router = new VueRouter({
  routes
})

export default router
