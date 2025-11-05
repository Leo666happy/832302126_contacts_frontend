<template>
  <div class="contact-card">
    <div class="avatar">
      <!-- 关键修改：拼接后端域名 -->
      <img
        v-if="contact.avatar"
        :src="`http://localhost:8000${contact.avatar}`"
        alt="头像"
        @error="handleImgError"
      >
      <span v-else>{{ contact.name[0] || '?' }}</span>  <!-- 兼容空名称的情况 -->
    </div>
    <div class="info">
      <h3>{{ contact.name }}</h3>
      <p>电话：{{ contact.phone }}</p>
      <p v-if="contact.email">邮箱：{{ contact.email }}</p>
      <p>分类：{{ contact.category }}</p>
    </div>
    <div class="actions">
      <button @click="$emit('edit', contact.id)">编辑</button>
      <button @click="$emit('delete', contact.id)" class="delete-btn">删除</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// 定义接收的联系人属性
const props = defineProps({
  contact: {
    type: Object,
    required: true,
    // 增加属性验证，确保数据格式正确
    validator: (value) => {
      return (
        'id' in value &&
        'name' in value &&
        'phone' in value &&
        'category' in value
      )
    }
  }
})

// 头像加载失败时的处理（可选，提升用户体验）
const handleImgError = (e) => {
  // 加载失败时显示默认文字头像
  e.target.style.display = 'none'
  const parent = e.target.parentElement
  parent.querySelector('span').style.display = 'flex'
}
</script>

<style scoped>
.contact-card {
  border: 1px solid #eee;
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: box-shadow 0.3s ease;  /* 新增：鼠标悬停效果 */
}

.contact-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  /* 新增：悬浮阴影 */
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #42b983;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  overflow: hidden;  /* 确保图片不超出圆形 */
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

/* 隐藏备用文字（仅图片加载失败时显示） */
.avatar span {
  display: none;
}

.avatar:has(img:not([src])) span,
.avatar:has(img[src=""]) span {
  display: flex;  /* 图片路径为空时显示文字 */
}

.info {
  flex: 1;  /* 让信息区域占满剩余空间 */
}

.info h3 {
  margin: 0 0 8px 0;
  color: #333;
}

.info p {
  margin: 4px 0;
  color: #666;
  font-size: 14px;
}

.actions {
  margin-left: auto;
  display: flex;
  gap: 8px;
}

.actions button {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.actions button:hover {
  background-color: #f5f5f5;
}

.delete-btn {
  background: #ff4444;
  color: white;
  border: none;
}

.delete-btn:hover {
  background: #ff6666;  /* 删除按钮悬浮加深 */
}
</style>
