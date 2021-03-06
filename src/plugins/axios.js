import axios from 'axios'
import store from '../store/index.js'

const baseAxios = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    Authorization: store.state.authToken
  }
})

axios.interceptors.request.use(hoge => {
  console.log(hoge.url)
  return hoge
})

export default baseAxios
