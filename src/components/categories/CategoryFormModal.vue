<template>
  <AppModal :title="isEditing ? 'Edit category' : 'New category'" @close="emit('close')">
    <form @submit.prevent="emit('submit')">
      <FormRow>
        <AppInput
            v-model="form.name"
            label="Name"
            required
            @blur="emit('nameBlur')"
        />
      </FormRow>

      <FormRow>
        <AppInput
            v-model="form.slug"
            label="Slug"
            required
        />
      </FormRow>

      <ErrorMessage :message="error"/>

      <div class="modal-actions">
        <button type="button" class="cancel-btn" @click="emit('close')">Cancel</button>
        <AppButton
            :label="isEditing ? 'Save changes' : 'Create category'"
            loading-label="Saving..."
            :loading="isSaving"
            type="submit"
        />
      </div>
    </form>
  </AppModal>
</template>

<script setup lang="ts">
import type {StoreCategoryRequest} from '@/application/types/api/resources/Category'
import AppModal from '@/components/ui/AppModal.vue'
import FormRow from '@/components/form/FormRow.vue'
import AppInput from '@/components/form/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'

interface Props {
  form: StoreCategoryRequest
  isEditing: boolean
  isSaving: boolean
  error: string | null
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
  (e: 'nameBlur'): void
}>()
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