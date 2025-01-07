<template>
  <div class="register">
    <h2>注册</h2>
    <form @submit.prevent="register">
      <!-- 用户名 -->
      <div>
        <label for="username">用户名:</label>
        <input type="text" id="username" v-model="username" placeholder="请输入用户名" required />
        <span class="error" v-if="errors.username">{{ errors.username }}</span>
      </div>

      <!-- 邮箱 -->
      <div>
        <label for="email">邮箱:</label>
        <input type="email" id="email" v-model="email" placeholder="请输入邮箱" required />
        <span class="error" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <!-- 密码 -->
      <div>
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="password" placeholder="请输入密码" required />
        <span class="error" v-if="errors.password">{{ errors.password }}</span>
      </div>

      <!-- 确认密码 -->
      <div>
        <label for="confirmPassword">确认密码:</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="请再次输入密码"
          required
        />
        <span class="error" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
      </div>

      <!-- 提交按钮 -->
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? '注册中...' : '注册' }}
      </button>
    </form>

    <!-- 注册结果提示 -->
    <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">
      {{ message }}
    </p>

    <!-- 跳转到登录页面 -->
    <p>已有账号？<router-link to="/">立即登录</router-link></p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '', // 用户名
      email: '', // 邮箱
      password: '', // 密码
      confirmPassword: '', // 确认密码
      message: '', // 注册结果提示
      isSuccess: false, // 是否注册成功
      isLoading: false, // 是否正在加载
      errors: {
        username: '', // 用户名错误提示
        email: '', // 邮箱错误提示
        password: '', // 密码错误提示
        confirmPassword: '', // 确认密码错误提示
      },
    }
  },
  methods: {
    // 表单验证
    validateForm() {
      this.errors = { username: '', email: '', password: '', confirmPassword: '' } // 清空错误提示
      let isValid = true

      // 验证用户名
      if (!this.username) {
        this.errors.username = '用户名不能为空'
        isValid = false
      } else if (this.username.length < 3) {
        this.errors.username = '用户名至少需要3位'
        isValid = false
      }

      // 验证邮箱
      if (!this.email) {
        this.errors.email = '邮箱不能为空'
        isValid = false
      } else if (!this.email.includes('@')) {
        this.errors.email = '邮箱格式不正确'
        isValid = false
      }

      // 验证密码
      if (!this.password) {
        this.errors.password = '密码不能为空'
        isValid = false
      } else if (this.password.length < 6) {
        this.errors.password = '密码至少需要6位'
        isValid = false
      }

      // 验证确认密码
      if (!this.confirmPassword) {
        this.errors.confirmPassword = '请确认密码'
        isValid = false
      } else if (this.password !== this.confirmPassword) {
        this.errors.confirmPassword = '两次输入的密码不一致'
        isValid = false
      }

      return isValid
    },

    // 注册逻辑
    async register() {
      if (!this.validateForm()) return // 如果表单验证失败，直接返回

      this.isLoading = true // 开始加载

      try {
        // 发送注册请求到后端
        const response = await axios.post('http://localhost:3000/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        })

        // 根据后端返回的响应处理结果
        if (response.data.success) {
          this.isSuccess = true
          this.message = '注册成功！即将跳转到登录页面...'

          // 模拟跳转到登录页面
          setTimeout(() => {
            this.$router.push('/login')
          }, 2000)
        } else {
          this.isSuccess = false
          this.message = response.data.message || '注册失败，请重试！'
        }
      } catch (error) {
        // 处理请求错误
        this.isSuccess = false
        this.message = error.response?.data?.error || '注册失败，请检查网络连接！'
      } finally {
        this.isLoading = false // 结束加载
      }
    },
  },
}
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #369f6e;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
  display: block;
}

p {
  margin-top: 15px;
  text-align: center;
}

.success {
  color: green;
}

.error-message {
  color: red;
}

a {
  color: #42b983;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
