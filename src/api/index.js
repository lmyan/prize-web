import api from './api'

// 将 Axios 实例添加到Vue的原型对象上
export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$api', { value: api })
  }

}
