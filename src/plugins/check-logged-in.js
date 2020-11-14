import store from '@/store/index'

const checkLoggedIn = () => {
  if (store.state.currentUser) {
    console.log('ユーザーいるよ')
  } else {
    console.log('ユーザーいないよ！！')
    this.$router.push('/signin')
  }
}

export default checkLoggedIn
