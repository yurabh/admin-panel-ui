<template>
  <div>
    <PageHeader title="Categories" subtitle="Manage your blog categories.">
      <template #action>
        <AppButton label="New category"
                   size="medium"
                   type="button"
                   @click="openCreateModal"/>
      </template>
    </PageHeader>

    <ErrorMessage :message="listError"/>

    <EmptyState v-if="isLoading && categories.length === 0">
      Loading categories...
    </EmptyState>

    <EmptyState v-else-if="categories.length === 0">
      No categories yet. Create your first one.
    </EmptyState>

    <CategoriesTable
        v-else
        :categories="categories"
        @edit="openEditModal"
        @delete="handleDelete"
    />

    <CategoryFormModal
        v-if="isModalOpen"
        :form="form"
        :is-editing="isEditing"
        :is-saving="isSaving"
        :error="formError"
        @close="closeModal"
        @submit="handleSubmit"
        @name-blur="generateSlug"
    />
  </div>
</template>

<script setup lang="ts">
import {useCategories} from '@/composables/useCategories'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import CategoriesTable from '@/components/categories/CategoriesTable.vue'
import CategoryFormModal from '@/components/categories/CategoryFormModal.vue'

const {
  categories,
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
  generateSlug,
  handleSubmit,
  handleDelete,
} = useCategories()
</script>