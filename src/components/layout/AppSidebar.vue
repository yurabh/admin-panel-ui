<template>
  <aside class="sidebar">
    <div class="sidebar-logo">Admin Panel</div>
    <SidebarNav :items="navItems"/>
    <UserMenu :name="authStore.user?.name" @logout="handleLogout"/>
  </aside>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/auth'
import SidebarNav from './SidebarNav.vue'
import UserMenu from './UserMenu.vue'

const authStore = useAuthStore()
const router = useRouter()

const navItems = [
  {name: 'dashboard', label: 'Dashboard'},
  {name: 'posts', label: 'Posts'},
  {name: 'categories', label: 'Categories'},
  {name: 'tags', label: 'Tags'},
  {name: 'comments', label: 'Comments'},
  {name: 'users', label: 'Users'},
  // {name: 'billing', label: 'Billing'},
]

function handleLogout(): void {
  authStore.logout()
  router.push({name: 'login'})
}
</script>

<style scoped>
.sidebar {
  width: 240px;
  flex-shrink: 0;
  background-color: #111827;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
}

.sidebar-logo {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  padding: 0 1.5rem;
  margin-bottom: 1.5rem;
}
</style>