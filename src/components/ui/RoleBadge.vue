<template>
  <span class="role-badge" :class="isAdmin ? 'admin' : 'user'">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import {computed} from 'vue'

interface Props {
  role: string
}

const props = defineProps<Props>()

const isAdmin = computed<boolean>(() => props.role === 'admin')
const label = computed<string>(() => props.role.charAt(0).toUpperCase() + props.role.slice(1))
</script>

<style scoped>
.role-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.role-badge.admin {
  background-color: #dbeafe;
  color: #1e40af;
}

.role-badge.user {
  background-color: #f3f4f6;
  color: #6b7280;
}
</style>