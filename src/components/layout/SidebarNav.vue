<template>
  <nav class="sidebar-nav">
    <RouterLink v-for="item in items"
                :key="item.name"
                :to="{ name: item.name }"
                class="nav-link"
                active-class="active">
      {{ item.label }}
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
interface NavItem {
  name: string
  label: string
}

interface Props {
  items: NavItem[]
}

defineProps<Props>()
</script>

<style scoped>
.sidebar-nav {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 2px;
  padding: 0 0.75rem;
}

.nav-link {
  padding: 0.625rem 0.75rem;
  border-radius: 6px;
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.15s, color 0.15s;
}

.nav-link:hover {
  background-color: #1f2937;
  color: white;
}

.nav-link.active {
  background-color: #2563eb;
  color: white;
}
</style>