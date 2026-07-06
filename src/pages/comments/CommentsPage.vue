<template>
  <div>
    <PageHeader title="Comments" subtitle="Manage user comments on posts.">
      <template #action>
        <AppButton label="New comment"
                   size="medium"
                   type="button"
                   @click="openCreateModal"/>
      </template>
    </PageHeader>

    <ErrorMessage :message="listError"/>

    <EmptyState v-if="isLoading && comments.length === 0">
      Loading comments...
    </EmptyState>

    <EmptyState v-else-if="comments.length === 0">
      No comments yet.
    </EmptyState>

    <CommentsTable
        v-else
        :comments="comments"
        @edit="openEditModal"
        @delete="handleDelete"
    />

    <CommentFormModal
        v-if="isModalOpen"
        :form="form"
        :posts="posts"
        :is-editing="isEditing"
        :is-saving="isSaving"
        :error="formError"
        @close="closeModal"
        @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import {useComments} from '@/composables/useComments'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import CommentsTable from '@/components/comments/CommentsTable.vue'
import CommentFormModal from '@/components/comments/CommentFormModal.vue'

const {
  comments,
  posts,
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
} = useComments()
</script>