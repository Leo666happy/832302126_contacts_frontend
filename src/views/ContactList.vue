<template>
  <div class="contact-list">
    <div class="search-bar">
      <input
        type="text"
        v-model="searchKeyword"
        placeholder="搜索姓名或电话..."
      >
    </div>
    <div class="cards-container">
      <ContactCard
        v-for="contact in filteredContacts"
        :key="contact.id"
        :contact="contact"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
    <p v-if="filteredContacts.length === 0" class="empty-tip">
      暂无联系人数据
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useContactStore } from '../stores/contactStore'
import ContactCard from '../components/ContactCard.vue'

const contactStore = useContactStore()
const router = useRouter()
const searchKeyword = ref('')

// 页面加载时加载数据
onMounted(() => {
  contactStore.loadContacts()
})

// 筛选联系人
const filteredContacts = computed(() => {
  return contactStore.contacts.filter(contact =>
    contact.name.includes(searchKeyword.value) ||
    contact.phone.includes(searchKeyword.value)
  )
})

// 编辑联系人
const handleEdit = (id) => {
  router.push(`/contacts/${id}/edit`)
}

// 删除联系人
const handleDelete = async (id) => {
  if (confirm('确定要删除吗？')) {
    await contactStore.removeContact(id)
  }
}
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
}
.search-bar input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}
.empty-tip {
  text-align: center;
  color: #666;
  margin-top: 50px;
}
</style>
