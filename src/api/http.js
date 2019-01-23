import axios from 'axios'
import { Message } from 'element-ui'

// let baseUrl = 'http://192.168.0.105:1120/'

let baseUrl = 'http://10.10.10.70:1120/'

let prodUrl = 'http://pande.xin:1120/'

let env = process.env.NODE_ENV

if (env === 'production') {
  baseUrl = prodUrl
}

// 创建 axios 实例
// 这里 export  的原因是方便组件外使用 axios
const Axios = axios.create({
  baseURL: baseUrl,
  timeout: 600 * 1000 // 60s请求超时设置
})

// http request 拦截器
Axios.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem('access-user')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
Axios.interceptors.response.use(
  res => {
    return res
  },
  err => {
    if (err.response) {
      if (err.response.status === 401) {
        // Message({
        //   message: '未授权或授权过期，请尝试重新登陆！',
        //   type: "error"
        // });
        sessionStorage.removeItem('access-user')
        sessionStorage.clear()
      }
      return Promise.resolve(err.response.data)
    } else {
      Message({
        message: err.message,
        type: 'error'
      })
      return Promise.reject(err)
    }
  })

export default {
  getBaseUrl() {
    return baseUrl
  },

  get(url, params) {
    return Axios.get(url, { params: params })
  },

  post(url, data) {
    return Axios.post(url, data)
  },

  put(url, data) {
    return Axios.put(url, data)
  },

  delete(url, params) {
    return Axios.delete(url, { params: params })
  }
}
