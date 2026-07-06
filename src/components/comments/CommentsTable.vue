<template>
  <table class="comments-table">
    <thead>
    <tr>
      <th>Author</th>
      <th>Post</th>
      <th>Content</th>
      <th>Created</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <CommentsTableRow
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @edit="emit('edit', comment)"
        @delete="emit('delete', comment)"
    />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type {Comment} from '@/application/types/api/resources/Comment'
import CommentsTableRow from './CommentsTableRow.vue'

interface Props {
  comments: Comment[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'edit', comment: Comment): void
  (e: 'delete', comment: Comment): void
}>()
</script>

<style scoped>
.comments-table {
  width: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  border-collapse: collapse;
  overflow: hidden;
}

.comments-table th {
  text-align: left;
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}
</style>