// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

// 全局配置axios
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    console.log('请求拦截:', config.url)
    // 可以在这里添加token等
    // config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    console.log('响应拦截:', response.status)
    return response
  },
  error => {
    console.error('响应错误:', error.message)
    return Promise.reject(error)
  }
)

// 将axios挂载到Vue原型上，方便组件内使用
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
