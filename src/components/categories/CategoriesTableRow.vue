<template>
  <tr>
    <td class="name-cell">{{ category.name }}</td>
    <td class="muted">{{ category.slug }}</td>
    <td class="muted">{{ formattedDate }}</td>
    <td class="actions-cell">
      <AppButton
          label="Edit"
          size="small"
          type="button"
          class="table-btn edit-btn"
          @click="emit('edit')"
      />
      <AppButton
          label="Delete"
          size="small"
          type="button"
          class="table-btn delete-btn"
          @click="emit('delete')"
      />
    </td>
  </tr>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import type {Category} from '@/application/types/api/resources/Category'
import AppButton from '@/components/ui/AppButton.vue'

interface Props {
  category: Category
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
}>()

const formattedDate = computed<string>(() => {
  return props.category.created_at
      ? new Date(props.category.created_at).toLocaleDateString()
      : '—'
})
</script>

<style scoped>
td {
  padding: 0.875rem 1rem;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.9rem;
  color: #111827;
  vertical-align: middle;
}

tr:last-child td {
  border-bottom: none;
}

.name-cell {
  font-weight: 500;
}

.muted {
  color: #6b7280;
}

.actions-cell {
  display: flex;
  gap: 8px;
  white-space: nowrap;
  justify-content: flex-end;
}

.table-btn {
  width: auto;
  min-width: 70px;
  padding: 0.4rem 0.75rem;
}

.delete-btn {
  background-color: #ef4444;
}

.delete-btn:hover:not(:disabled) {
  background-color: #dc2626;
}
</style>