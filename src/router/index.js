import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Record from '../views/Record.vue'
import EditView from '../views/Edit.vue'
import CreateView from '../views/CreateView.vue'
import User from '../views/User.vue'
import RecordDetailView from '../views/RecordDetailView.vue'
import Signup from '../views/SignUp.vue'
import Signin from '../views/SignIn.vue'

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
    path: '/record/:id/',
    name: 'RecordDetail',
    component: RecordDetailView
  },
  {
    path: '/record/:id/edit',
    name: 'edit',
    component: EditView
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

// router.beforeEach((to, from, next) => {
//   if (store.state.currentUser) {
//     next()
//   } else {
//     return page.path === '/signin'
//   }
// })

export default router
