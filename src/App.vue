<script setup></script>

<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <nav class="navbar">
      <h1>通讯录管理系统</h1>
      <div class="nav-links">
        <router-link to="/contacts">联系人列表</router-link>
        <router-link to="/contacts/add">添加联系人</router-link>
      </div>
    </nav>

    <!-- 路由出口 -->
    <router-view class="content" />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}
.nav-links {
  display: flex;
  gap: 20px;
}
.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}
.nav-links a.active {
  color: #42b983;
}
.content {
  margin-top: 30px;
}
.navbar h1 {
  text-align: center; /* 文字水平居中 */
  margin-left: 470px;
  margin-bottom: 5px;
  /* flex: 1; */
}
</style>
