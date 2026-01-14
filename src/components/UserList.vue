<template>
  <div class="user-list">
    <h3>用户列表-{{title}}-{{likes}}-{{isPublished}}-{{commentIds}}-{{author}}</h3>
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">加载失败: {{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="user in users" :key="user.id" class="user-item">
          <span>{{ user.name }}</span> -
          <span>{{ user.email }}</span>
          <button @click="showUserDetails(user.id)" class="btn btn-sm">查看详情</button>
        </li>
      </ul>
;
      <div v-if="selectedUser" class="user-details" v-bind:style="{color: color}" >
        <h4>用户详情</h4>
        <p><strong>姓名:</strong> {{ selectedUser.name }}</p>
        <p><strong>邮箱:</strong> {{ selectedUser.email }}</p>
        <p><strong>电话:</strong> {{ selectedUser.phone }}</p>
        <p><strong>公司:</strong> {{ selectedUser.company.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { userApi } from '../api/api'

export default {
  name: 'UserList',
  data () {
    return {
      users: [],
      selectedUser: null,
      loading: false,
      error: null
    }
  },
  props: {
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    color: {
      type: String,
      default: '#3a86ff'
    }
  },
  mounted () {
    this.fetchUsers()
  },
  methods: {
    // GET请求示例
    async fetchUsers () {
      this.loading = true
      this.error = null

      try {
        // 使用封装好的API方法
        this.users = await userApi.getUsers()
        console.log('获取用户列表成功:', this.users)
      } catch (err) {
        this.error = err.message
        console.error('获取用户列表失败:', err)
      } finally {
        this.loading = false
      }
    },

    // 获取单个用户详情
    async showUserDetails (userId) {
      try {
        this.selectedUser = await userApi.getUserById(userId)
        console.log('获取用户详情成功:', this.selectedUser)
      } catch (err) {
        console.error('获取用户详情失败:', err)
        alert('获取用户详情失败: ' + err.message)
      }
    }
  }
}
</script>

<style scoped>
.user-list {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  background-color: #f9f9f9;
}

.user-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-item:last-child {
  border-bottom: none;
}

.user-details {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
}

.loading {
  color: #666;
  font-style: italic;
}

.error {
  color: #d32f2f;
}

.btn {
  padding: 6px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #3aa876;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 0.9em;
}
</style>
