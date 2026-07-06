<template>
  <tr>
    <td class="author-cell">{{ comment.user?.name || '—' }}</td>
    <td class="muted">{{ comment.post?.title || '—' }}</td>
    <td class="content-cell">{{ truncatedContent }}</td>
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
import type {Comment} from '@/application/types/api/resources/Comment'
import AppButton from '@/components/ui/AppButton.vue'

interface Props {
  comment: Comment
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
}>()

const CONTENT_LIMIT = 80

const truncatedContent = computed<string>(() => {
  if (props.comment.content.length <= CONTENT_LIMIT) {
    return props.comment.content
  }
  return props.comment.content.slice(0, CONTENT_LIMIT) + '...'
})

const formattedDate = computed<string>(() => {
  return new Date(props.comment.created_at).toLocaleDateString()
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

.author-cell {
  font-weight: 500;
}

.content-cell {
  max-width: 320px;
  color: #374151;
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