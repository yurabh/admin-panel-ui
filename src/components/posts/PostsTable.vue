<template>
  <table class="posts-table">
    <thead>
    <tr>
      <th>Title</th>
      <th>Category</th>
      <th>Status</th>
      <th>Created</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <PostsTableRow
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @edit="emit('edit', post)"
        @delete="emit('delete', post)"
    />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Post } from '@/application/types/api/resources/Post'
import PostsTableRow from './PostsTableRow.vue'

interface Props {
  posts: Post[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'edit', post: Post): void
  (e: 'delete', post: Post): void
}>()
</script>

<style scoped>
.posts-table {
  width: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  border-collapse: collapse;
  overflow: hidden;
}

.posts-table th {
  text-align: left;
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}
</style>