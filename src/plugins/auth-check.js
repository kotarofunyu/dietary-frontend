import firebase from '@/plugins/firebase'
import axios from '@/plugins/axios'
import store from '@/store/index'

const authCheck = () => {
  firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      const { data } = await axios.get(`/users?uid=${user.uid}`)
      console.log('ログインしているユーザー:', data)
      store.commit('setUser', data)
    } else {
      store.commit('setUser', null)
    }
  })
}

export default authCheck
