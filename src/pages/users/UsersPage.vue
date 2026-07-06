<template>
  <div>
    <PageHeader title="Users" subtitle="Manage system users.">
      <template #action>
        <AppButton label="New user"
                   size="medium"
                   type="button"
                   @click="openCreateModal"/>
      </template>
    </PageHeader>

    <ErrorMessage :message="listError"/>

    <EmptyState v-if="isLoading && users.length === 0">
      Loading users...
    </EmptyState>

    <EmptyState v-else-if="users.length === 0">
      No users yet. Create your first one.
    </EmptyState>

    <UsersTable
        v-else
        :users="users"
        @edit="openEditModal"
        @delete="handleDelete"
    />

    <UserFormModal
        v-if="isModalOpen"
        :form="form"
        :is-editing="isEditing"
        :is-saving="isSaving"
        :error="formError"
        @close="closeModal"
        @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import {useUsers} from '@/composables/useUsers'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import UsersTable from '@/components/users/UsersTable.vue'
import UserFormModal from '@/components/users/UserFormModal.vue'

const {
  users,
  isLoading,
  listError,
  isModalOpen,
  isEditing,
  form,
  formError,
  isSaving,
  openCreateModal,
  openEditModal,
  closeModal,
  handleSubmit,
  handleDelete,
} = useUsers()
</script>