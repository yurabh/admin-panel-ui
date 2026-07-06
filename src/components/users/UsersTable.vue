<template>
  <table class="users-table">
    <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Created</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <UsersTableRow
        v-for="user in users"
        :key="user.id"
        :user="user"
        @edit="emit('edit', user)"
        @delete="emit('delete', user)"
    />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type {User} from '@/application/types/api/resources/User'
import UsersTableRow from './UsersTableRow.vue'

interface Props {
  users: User[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'edit', user: User): void
  (e: 'delete', user: User): void
}>()
</script>

<style scoped>
.users-table {
  width: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  border-collapse: collapse;
  overflow: hidden;
}

.users-table th {
  text-align: left;
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}
</style>