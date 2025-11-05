import request from '../utils/request'

// 获取联系人列表
export const getContactList = () => {
  return request.get('/contacts')
}

// 获取单个联系人
export const getContact = (id) => {
   return request.get(`/contacts/${id}`)
}

// 添加联系人
export const addContact = (data) => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('phone', data.phone)
  if (data.email) formData.append('email', data.email)
  formData.append('category', data.category)
  if (data.avatar) formData.append('avatar', data.avatar)
  return request.post('/contacts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 更新联系人
export const updateContact = (id, data) => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('phone', data.phone)
  if (data.email) formData.append('email', data.email)
  formData.append('category', data.category)

  // 只在头像为文件对象时才添加（新增判断）
  if (data.avatar && typeof data.avatar !== 'string') {
    formData.append('avatar', data.avatar)
  }

  return request.put(`/contacts/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 删除联系人
export const deleteContact = (id) => {
  return request.delete(`/contacts/${id}`)
}

// 搜索联系人
export const searchContacts = (keyword) => {
  return request.get(`/contacts/search?keyword=${keyword}`)
}
