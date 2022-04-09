import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import router from './config/router'
// 引入路由
import store from './config/store'

import axios from 'axios'

// 引入bootstrap 样式
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'
// 请求拦截
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: 'C6A6C4086133360B' }
  store.commit('setLoding', true)
  return config
})
// 响应拦截
axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoding', false)
  }, 1000)
  return config
})

const app = createApp(App)

/** 使用路由 */
app.use(router)
/** 使用vuex */
app.use(store)

app.mount('#app')
