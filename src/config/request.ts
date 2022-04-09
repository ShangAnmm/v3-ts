// 请求拦截
import axios from 'axios'

// 创建实例

const instance = axios.create({
  baseURL: 'http://apis.imooc.com/api/',
  timeout: 60000
})
// 编写请求拦截器   (发送请求之前运行)
instance.interceptors.request.use(config => {
  config.params = { ...config, icode: 'C6A6C4086133360B' }
  // config.headers['Content-Type'] = 'application/json';
  // config.headers['auth-identity'] = localStorageUtils.getIdentity();
  // config.headers['auth-token'] = localStorageUtils.getToken();
  return config
},
error => {
  Promise.reject(error)
}
)
// 响应拦截器
instance.interceptors.response.use(
  response => {
    const data = response.data
    const code = data.code
    switch (code) {
      case 200:
        // setTimeout(() => {
        // }, 500)
        return response.data
      case 503:
        // 503登录异常 自动退出
        // break
        return response.data
      default:
        return response.data
    }
  }
)

axios.get('/column').then(res => {
  console.log(res)
})
export default instance
