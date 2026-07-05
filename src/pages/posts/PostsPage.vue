<template>
  <div>
    <PageHeader title="Posts" subtitle="Manage your blog articles.">
      <template #action>
        <AppButton label="New post"
                   size="medium"
                   type="button"
                   @click="openCreateModal"/>
      </template>
    </PageHeader>

    <ErrorMessage :message="listError"/>

    <EmptyState v-if="isLoading && posts.length === 0">
      Loading posts...
    </EmptyState>

    <EmptyState v-else-if="posts.length === 0">
      No posts yet. Create your first one.
    </EmptyState>

    <PostsTable
        v-else
        :posts="posts"
        @edit="openEditModal"
        @delete="handleDelete"
    />

    <PostFormModal
        v-if="isModalOpen"
        :form="form"
        :categories="categories"
        :is-editing="isEditing"
        :is-saving="isSaving"
        :error="formError"
        @close="closeModal"
        @submit="handleSubmit"
        @title-blur="generateSlug"
    />
  </div>
</template>

<script setup lang="ts">
import {usePosts} from '@/composables/usePosts'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import PostsTable from '@/components/posts/PostsTable.vue'
import PostFormModal from '@/components/posts/PostFormModal.vue'

const {
  posts,
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
} = usePosts()
</script>