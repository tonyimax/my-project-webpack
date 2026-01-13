import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 通用GET请求方法
export function getRequest (url, params = {}) {
  return new Promise((resolve, reject) => {
    service.get(url, { params })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 通用POST请求方法
export function postRequest (url, data = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 用户相关API
export const userApi = {
  // 获取用户列表
  getUsers () {
    return getRequest('/users')
  },

  // 获取单个用户
  getUserById (id) {
    return getRequest(`/users/${id}`)
  },

  // 创建用户
  createUser (userData) {
    return postRequest('/users', userData)
  },

  // 更新用户
  updateUser (id, userData) {
    return postRequest(`/users/${id}`, userData)
  }
}

// 文章相关API
export const postApi = {
  // 获取文章列表
  getPosts () {
    return getRequest('/posts')
  },

  // 创建文章
  createPost (postData) {
    return postRequest('/posts', postData)
  }
}
