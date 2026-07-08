<template>
  <AppModal :title="isEditing ? 'Edit tag' : 'New tag'" @close="emit('close')">
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

      <FormRow>
        <AppTextarea v-model="descriptionAsString" label="Description"/>
      </FormRow>

      <FormRow>
        <AppCheckbox v-model="form.is_active" label="Active"/>
      </FormRow>

      <ErrorMessage :message="error"/>

      <div class="modal-actions">
        <button type="button" class="cancel-btn" @click="emit('close')">Cancel</button>
        <AppButton
            :label="isEditing ? 'Save changes' : 'Create tag'"
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
import type {StoreTagRequest} from '@/application/types/api/resources/Tag'
import AppModal from '@/components/ui/AppModal.vue'
import FormRow from '@/components/form/FormRow.vue'
import AppInput from '@/components/form/AppInput.vue'
import AppTextarea from '@/components/form/AppTextarea.vue'
import AppCheckbox from '@/components/form/AppCheckbox.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'

interface Props {
  form: StoreTagRequest
  isEditing: boolean
  isSaving: boolean
  error: string | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
  (e: 'nameBlur'): void
}>()

const descriptionAsString = computed<string>({
  get: () => props.form.description ?? '',
  set: (value: string) => {
    props.form.description = value ? value : null
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
