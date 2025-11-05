<template>
  <div class="contact-edit">
    <h1>{{ isEdit ? '编辑联系人' : '添加联系人' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>姓名 *</label>
        <input
          type="text"
          v-model="formData.name"
          required
        >
      </div>

      <div class="form-group">
        <label>电话 *</label>
        <input
          type="tel"
          v-model="formData.phone"
          required
        >
      </div>

      <div class="form-group">
        <label>邮箱</label>
        <input
          type="email"
          v-model="formData.email"
        >
      </div>

      <div class="form-group">
        <label>分类 *</label>
        <select v-model="formData.category" required>
          <option value="家人">家人</option>
          <option value="同事">同事</option>
          <option value="朋友">朋友</option>
          <option value="其他">其他</option>
        </select>
      </div>

      <div class="form-group">
        <label>头像</label>
        <input
          type="file"
          accept="image/*"
          @change="handleAvatarChange"
        >
        <img
          v-if="previewUrl"
          :src="previewUrl"
          class="avatar-preview"
          alt="预览"
        >
      </div>

      <div class="form-actions">
        <button type="button" @click="$router.back()">取消</button>
        <button type="submit">保存</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContactStore } from '../stores/contactStore'
import { getContact } from '../api/contact'

const route = useRoute()
const router = useRouter()
const contactStore = useContactStore()
const contactId = route.params.id
const isEdit = !!contactId

// 表单数据
const formData = ref({
  name: '',
  phone: '',
  email: '',
  category: '朋友',
  avatar: null
})

// 新增：存储编辑时的原头像路径（后端返回的相对路径）
const originalAvatar = ref('');
// 头像预览
const previewUrl = ref('')
let objectUrl = null // 用于释放URL资源

// 处理头像上传预览（不变）
const handleAvatarChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    formData.value.avatar = file
    if (objectUrl) URL.revokeObjectURL(objectUrl)
    objectUrl = URL.createObjectURL(file)
    previewUrl.value = objectUrl
  }
}

// 加载编辑的联系人数据（修改后）
const loadContactData = async () => {
  if (isEdit) {
    const data = await getContact(Number(contactId))
    formData.value = {
      name: data.name,
      phone: data.phone,
      email: data.email || '',
      category: data.category,
      avatar: null
    }
    // 存储原头像路径（用于提交时保留）
    originalAvatar.value = data.avatar || '';
    // 拼接后端域名用于预览
    if (data.avatar) {
      previewUrl.value = `http://localhost:8000${data.avatar}`;
    }
  }
}

// 提交表单（修改后）
// const handleSubmit = async () => {
//   try {
//     const submitData = { ...formData.value };
//     // 编辑且未上传新头像：保留原头像
//     if (isEdit && !submitData.avatar) {
//       submitData.avatar = originalAvatar.value;
//     }

//     if (isEdit) {
//       await contactStore.editContact(Number(contactId), submitData);
//     } else {
//       await contactStore.addNewContact(submitData);
//     }
//     router.push('/contacts')
//   } catch (error) {
//     console.error('保存失败:', error)
//     alert('保存失败，请重试')
//   }
// }

const handleSubmit = async () => {
  try {
    const submitData = { ...formData.value };
    if (isEdit && !submitData.avatar) {
      submitData.avatar = originalAvatar.value;
    }

    if (isEdit) {
      await contactStore.editContact(Number(contactId), submitData);
    } else {
      await contactStore.addNewContact(submitData);
      // 新增：添加成功后重置表单
      formData.value = {
        name: '',
        phone: '',
        email: '',
        category: '朋友',
        avatar: null
      };
      previewUrl.value = '';
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        objectUrl = null;
      }
    }
    router.push('/contacts')
  } catch (error) {
    console.error('保存失败:', error)
    alert('保存失败，请重试')
  }
}
// 组件卸载时释放URL资源（不变）
onUnmounted(() => {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl)
  }
})

onMounted(() => {
  if (isEdit) {
    loadContactData()
  }
})
</script>

<style scoped>
/* 样式部分不变，仅修复必填项标记的注释 */
.contact-edit {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

.form-group input,
.form-group select {
  width: 100%;
  max-width: 400px;
  height: 42px;
  padding: 0 12px;
  margin: 0 auto;
  display: block;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

/* 头像上传区域 */
.form-group input[type="file"] {
  padding: 10px;
  border: 1px dashed #ddd;
  background-color: #fff;
  cursor: pointer;
}

.avatar-preview {
  margin: 10px auto 0;
  display: block;
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

button {
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

button[type="button"] {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #555;
}

button[type="button"]:hover {
  background-color: #f0f0f0;
}

button[type="submit"] {
  background-color: #42b983;
  color: white;
  border: none;
}

button[type="submit"]:hover {
  background-color: #359e6d;
}

/* 必填项标记样式 */
/* .form-group label::after {
  content: '*';
  color: #ff4d4f;
  margin-left: 4px;
} */

/* .form-group:nth-child(3) label::after,
.form-group:nth-child(5) label::after {
  content: '';  */
  /* 移除邮箱和头像的必填标记 */
/* } */
</style>
