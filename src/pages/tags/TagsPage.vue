<template>
  <div>
    <PageHeader title="Tags" subtitle="Manage your blog tags.">
      <template #action>
        <AppButton label="New tag"
                   size="medium"
                   type="button"
                   @click="openCreateModal"/>
      </template>
    </PageHeader>

    <ErrorMessage :message="listError"/>

    <EmptyState v-if="isLoading && tags.length === 0">
      Loading tags...
    </EmptyState>

    <EmptyState v-else-if="tags.length === 0">
      No tags yet. Create your first one.
    </EmptyState>

    <TagsTable
        v-else
        :tags="tags"
        @edit="openEditModal"
        @delete="handleDelete"
    />

    <TagFormModal
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
import {useTags} from '@/composables/useTags'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import TagsTable from '@/components/tags/TagsTable.vue'
import TagFormModal from '@/components/tags/TagFormModal.vue'

const {
  tags,
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
} = useTags()
</script>
