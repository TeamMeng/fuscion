<template>
  <div class="welcome">
    <h1>欢迎来到我们的应用！</h1>
    <p>请登录或注册以继续。</p>

    <!-- 跳转到登录页面 -->
    <router-link to="/login" class="button">登录</router-link>

    <!-- 跳转到注册页面 -->
    <router-link to="/register" class="button">注册</router-link>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
}
</script>

<style scoped>
.welcome {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  color: #42b983;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

.button {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #42b983;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #369f6e;
}
</style>
