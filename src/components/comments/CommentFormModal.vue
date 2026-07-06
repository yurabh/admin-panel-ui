<template>
  <AppModal :title="isEditing ? 'Edit comment' : 'New comment'" @close="emit('close')">
    <form @submit.prevent="emit('submit')">
      <FormRow>
        <AppSelect v-model="postIdAsString" label="Post">
          <option value="" disabled>Select a post</option>
          <option v-for="post in posts" :key="post.id" :value="String(post.id)">
            {{ post.title }}
          </option>
        </AppSelect>
      </FormRow>

      <FormRow>
        <AppTextarea v-model="form.content" label="Content" required/>
      </FormRow>

      <ErrorMessage :message="error"/>

      <div class="modal-actions">
        <button type="button" class="cancel-btn" @click="emit('close')">Cancel</button>
        <AppButton
            :label="isEditing ? 'Save changes' : 'Create comment'"
            loading-label="Saving..."
            :loading="isSaving"
            type="submit"
        />
      </div>
    </form>
  </AppModal>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import type {Post} from '@/application/types/api/resources/Post'
import type {StoreCommentRequest} from '@/application/types/api/resources/Comment'
import AppModal from '@/components/ui/AppModal.vue'
import FormRow from '@/components/form/FormRow.vue'
import AppSelect from '@/components/form/AppSelect.vue'
import AppTextarea from '@/components/form/AppTextarea.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'

interface Props {
  form: StoreCommentRequest
  posts: Post[]
  isEditing: boolean
  isSaving: boolean
  error: string | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
}>()

const postIdAsString = computed<string>({
  get: () => props.form.post_id ? String(props.form.post_id) : '',
  set: (value: string) => {
    props.form.post_id = value ? Number(value) : null
  },
})
</script>

<style scoped>
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 1.5rem;
}

.cancel-btn {
  padding: 0.625rem 1rem;
  background: none;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  color: #374151;
  cursor: pointer;
  font-size: 0.9rem;
}

.cancel-btn:hover {
  background-color: #f9fafb;
}
</style>