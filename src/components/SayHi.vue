<script>
import { postApi, userApi } from '@/api/api'
import UserList from '@component/UserList.vue'
import CommonHi from '@/mixin/common_hi.js'

export default {
  name: 'SayHi',
  mixins: [CommonHi],
  components: {
    UserList
  },
  mounted () {
    alert(this.hi('from SayHi'))
  },
  data () {
    return {
      message: 'Hello Vue2,这个是来自变量的消息!',
      posts: [],
      createdUser: null,
      updatedUser: null,
      userId: 1,
      directUser: null,
      requestStatus: '',
      firstName: '张',
      lastName: '三',
      price: 100,
      quantity: 2
    }
  },
  watch: {
    message: function (value) {
      alert('watch:' + value)
    }
  },
  computed: {
    reverseMessage: function () {
      return this.message.split('').reverse().join('')
    },
    // 最简单的计算属性（只读）
    fullName () {
      return this.firstName + ' ' + this.lastName
    },

    // 带 getter 和 setter 的计算属性
    totalPrice: {
      get () {
        return this.price * this.quantity
      },
      set (newValue) {
        // 当修改 totalPrice 时，自动更新 quantity
        this.quantity = Math.floor(newValue / this.price)
      }
    }
  },
  methods: {
    reverseMessage_method: function () {
      return this.message.split('').reverse().join('')
    },
    // 使用封装的API方法进行GET请求
    async getPosts () {
      try {
        this.requestStatus = '正在获取文章...'
        this.posts = await postApi.getPosts()
        console.log('获取文章成功:', this.posts)
        this.requestStatus = '获取文章成功!'
      } catch (error) {
        console.error('获取文章失败:', error)
        this.requestStatus = '获取文章失败: ' + error.message
        alert('获取文章失败: ' + error.message)
      }
    },

    // 使用封装的API方法进行POST请求
    async createUser () {
      const newUser = {
        name: '张三',
        email: 'zhangsan@example.com',
        phone: '123-456-7890'
      }

      try {
        this.requestStatus = '正在创建用户...'
        // 注意：jsonplaceholder 的 /users 端点只模拟创建，不会真正保存
        this.createdUser = await userApi.createUser(newUser)
        console.log('创建用户成功:', this.createdUser)
        this.requestStatus = '创建用户成功!'
        alert(`用户创建成功! ID: ${this.createdUser.id}`)
      } catch (error) {
        console.error('创建用户失败:', error)
        this.requestStatus = '创建用户失败: ' + error.message
        alert('创建用户失败: ' + error.message)
      }
    },

    // 更新用户
    async updateUser () {
      const userUpdate = {
        name: '李四 (已更新)',
        email: 'lisi-updated@example.com'
      }

      try {
        this.requestStatus = '正在更新用户...'
        // 更新ID为1的用户
        this.updatedUser = await userApi.updateUser(1, userUpdate)
        console.log('更新用户成功:', this.updatedUser)
        this.requestStatus = '更新用户成功!'
        alert('用户更新成功!')
      } catch (error) {
        console.error('更新用户失败:', error)
        this.requestStatus = '更新用户失败: ' + error.message
        alert('更新用户失败: ' + error.message)
      }
    },

    // 直接使用this.$http (挂载到Vue原型上的axios)
    async getUserDirectly () {
      if (!this.userId || this.userId < 1) {
        alert('请输入有效的用户ID')
        return
      }

      try {
        this.requestStatus = '正在直接获取用户...'
        // 直接使用this.$http
        const response = await this.$http.get(`/users/${this.userId}`)
        this.directUser = response.data
        console.log('直接获取用户成功:', this.directUser)
        this.requestStatus = '直接获取用户成功!'
      } catch (error) {
        console.error('直接获取用户失败:', error)
        this.requestStatus = '直接获取用户失败: ' + error.message
        alert('直接获取用户失败: ' + error.message)
      }
    },

    // 模拟错误请求
    async getWithError () {
      try {
        // 请求一个不存在的端点
        await this.$http.get('/nonexistent-endpoint')
      } catch (error) {
        console.error('模拟错误请求:', error)
        alert(`请求错误: ${error.message}`)
      }
    }
  }
}
</script>

<template>
  <div class="hello" >
    原始值: {{message}}<br>
    计算后的值(会缓存): {{reverseMessage}}<br>
    普通函数(没有缓存): {{reverseMessage_method()}}

    <div>
      通过计算的属性:
      <p>全名: {{ fullName }}</p>
      <p>总价: {{ totalPrice }} 元</p>
      <button @click="totalPrice = 300">修改总价为300</button>
    </div>
    <h1>Vue2 HTTP 请求示例</h1>

    <div class="actions">
      <button @click="getPosts" class="btn btn-primary">获取文章(GET)</button>
      <button @click="createUser" class="btn btn-success">创建用户(POST)</button>
      <button @click="updateUser" class="btn btn-warning">更新用户(POST)</button>
      <button @click="getWithError" class="btn btn-danger">模拟错误请求</button>
    </div>

    <div class="results">
      <!-- GET请求结果 -->
      <div v-if="posts.length > 0" class="result-section">
        <h3>文章列表 (GET请求结果)</h3>
        <div class="scrollable-list">
          <div v-for="post in posts.slice(0, 5)" :key="post.id" class="result-item">
            <strong>{{ post.title }}</strong>
            <p>{{ post.body.substring(0, 50) }}...</p>
          </div>
        </div>
        <p v-if="posts.length > 5">... 只显示前5条，共{{ posts.length }}条</p>
      </div>

      <!-- POST请求结果 -->
      <div v-if="createdUser" class="result-section">
        <h3>创建的用户 (POST请求结果)</h3>
        <div class="result-item">
          <p><strong>ID:</strong> {{ createdUser.id }}</p>
          <p><strong>姓名:</strong> {{ createdUser.name }}</p>
          <p><strong>邮箱:</strong> {{ createdUser.email }}</p>
        </div>
      </div>

      <!-- 直接使用axios示例 -->
      <div class="result-section">
        <h3>直接使用$http示例</h3>
        <input v-model="userId" type="number" placeholder="输入用户ID (1-10)" min="1" max="10" />
        <button @click="getUserDirectly" class="btn btn-info">直接获取用户</button>
        <div v-if="directUser" class="result-item">
          <p><strong>姓名:</strong> {{ directUser.name }}</p>
          <p><strong>用户名:</strong> {{ directUser.username }}</p>
        </div>
      </div>
    </div>

    <!-- 用户列表组件 -->
    <UserList class="new-class"  color="green" title="nice" likes=999999 isPublished=false commentIds="[106, 52, 84, 138]" author="{'name': 'metrox', 'sex': 'male'}" />
  </div>
</template>

<style scoped>
.new-class {
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
}

.hello {
  color: red;
  font-size: 32px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
  border-bottom: 2px solid #42b983;
  padding-bottom: 15px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-success {
  background-color: #42b983;
  color: white;
}

.btn-warning {
  background-color: #e67e22;
  color: white;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
  margin-left: 10px;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.results {
  margin-bottom: 40px;
}

.result-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.result-section h3 {
  margin-bottom: 15px;
  color: #2c3e50;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.result-item {
  padding: 15px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 6px;
  border-left: 4px solid #42b983;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.scrollable-list {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 200px;
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
