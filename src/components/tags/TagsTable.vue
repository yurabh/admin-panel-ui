<template>
  <table class="tags-table">
    <thead>
    <tr>
      <th>Name</th>
      <th>Slug</th>
      <th>Active</th>
      <th>Created</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <TagsTableRow
        v-for="tag in tags"
        :key="tag.id"
        :tag="tag"
        @edit="emit('edit', tag)"
        @delete="emit('delete', tag)"
    />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type {Tag} from '@/application/types/api/resources/Tag'
import TagsTableRow from '@/components/tags/TagsTableRow.vue'

interface Props {
  tags: Tag[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'edit', tag: Tag): void
  (e: 'delete', tag: Tag): void
}>()
</script>

<style scoped>
.tags-table {
  width: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  border-collapse: collapse;
  overflow: hidden;
}

.tags-table th {
  text-align: left;
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}
</style>
