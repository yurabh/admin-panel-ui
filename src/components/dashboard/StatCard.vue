<template>
  <RouterLink :to="to" class="stat-card">
    <span class="stat-label">{{ label }}</span>
    <span class="stat-value">{{ value }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
import type {RouteLocationRaw} from 'vue-router'

interface Props {
  label: string
  value: string | number
  to: RouteLocationRaw
}

defineProps<Props>()
</script>

<style scoped>
.stat-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1.25rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.stat-card:hover {
  border-color: #2563eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.stat-label {
  font-size: 0.85rem;
  color: #6b7280;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 600;
  color: #111827;
}
</style>