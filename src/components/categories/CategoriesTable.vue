<template>
  <table class="categories-table">
    <thead>
    <tr>
      <th>Name</th>
      <th>Slug</th>
      <th>Created</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <CategoriesTableRow
        v-for="category in categories"
        :key="category.id"
        :category="category"
        @edit="emit('edit', category)"
        @delete="emit('delete', category)"
    />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type {Category} from '@/application/types/api/resources/Category'
import CategoriesTableRow from '@/components/categories/CategoriesTableRow.vue'

interface Props {
  categories: Category[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'edit', category: Category): void
  (e: 'delete', category: Category): void
}>()
</script>

<style scoped>
.categories-table {
  width: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  border-collapse: collapse;
  overflow: hidden;
}

.categories-table th {
  text-align: left;
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}
</style>