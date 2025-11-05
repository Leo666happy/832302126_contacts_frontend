import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getContactList,
  addContact,
  updateContact,
  deleteContact
} from '../api/contact'

export const useContactStore = defineStore('contact', () => {
  const contacts = ref([]) // 联系人列表缓存

  // 加载联系人列表
  const loadContacts = async () => {
    const data = await getContactList()
    contacts.value = data
  }

  // 添加联系人
  const addNewContact = async (formData) => {
    const newContact = await addContact(formData)
    contacts.value.push(newContact)
  }

  // 编辑联系人
  const editContact = async (id, formData) => {
    const updatedContact = await updateContact(id, formData)
    const index = contacts.value.findIndex(c => c.id === id)
    if (index !== -1) {
      contacts.value[index] = updatedContact
    }
  }

  // 删除联系人
  const removeContact = async (id) => {
    await deleteContact(id)
    contacts.value = contacts.value.filter(c => c.id !== id)
  }

  return {
    contacts,
    loadContacts,
    addNewContact,
    editContact,
    removeContact
  }
})
