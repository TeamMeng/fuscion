import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '@/components/Welcome.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

const routes = [
  { path: '/', component: Welcome }, // 欢迎页面
  { path: '/login', component: Login }, // 登录页面
  { path: '/register', component: Register }, // 注册页面
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
