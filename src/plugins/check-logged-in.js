import store from '@/store/index'
import router from '@/router/index.js'

const checkLoggedIn = function() {
  // const checkLoggedIn = () => {
  console.log(store.state.currentUser)
  console.log(this)
  if (store.state.currentUser) {
    console.log('ユーザーいるよ')
  } else {
    console.log('ユーザーいないよ！！')
    // $router.push('/signin')
  }
}

export default checkLoggedIn
