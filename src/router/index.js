import { createRouter, createWebHistory } from 'vue-router'
import ContactList from '../views/ContactList.vue'
import ContactEdit from '../views/ContactEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/contacts' },
    { path: '/contacts', name: 'ContactList', component: ContactList },
    { path: '/contacts/add', name: 'AddContact', component: ContactEdit },
    { path: '/contacts/:id/edit', name: 'EditContact', component: ContactEdit }
  ]
})

export default router
