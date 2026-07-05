<template>
  <div class="sidebar-footer">
    <div class="user-info">
      <div class="user-avatar">{{ initial }}</div>
      <span class="user-name">{{ name }}</span>
    </div>
    <button class="logout-btn" @click="emit('logout')">Log out</button>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'

interface Props {
  name?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'logout'): void
}>()

const initial = computed<string>(() => {
  return props.name?.charAt(0).toUpperCase() || '?'
})
</script>

<style scoped>
.sidebar-footer {
  padding: 1rem 1.5rem 0;
  border-top: 1px solid #1f2937;
  margin-top: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.75rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #2563eb;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 600;
  flex-shrink: 0;
}

.user-name {
  color: white;
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.logout-btn {
  width: 100%;
  padding: 0.5rem;
  background: none;
  border: 1px solid #374151;
  border-radius: 6px;
  color: #9ca3af;
  cursor: pointer;
  font-size: 0.85rem;
  transition: border-color 0.15s, color 0.15s;
}

.logout-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
}
</style>