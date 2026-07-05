<template>
  <AppModal :title="isEditing ? 'Edit post' : 'New post'" @close="emit('close')">
    <form @submit.prevent="emit('submit')">
      <FormRow>
        <AppInput
            v-model="form.title"
            label="Title"
            required
            @blur="emit('titleBlur')"
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
        <AppSelect v-model="categoryIdAsString" label="Category">
          <option value="">No category</option>
          <option v-for="category in categories" :key="category.id" :value="String(category.id)">
            {{ category.name }}
          </option>
        </AppSelect>
      </FormRow>

      <FormRow>
        <AppTextarea v-model="form.content" label="Content" required/>
      </FormRow>

      <FormRow>
        <AppCheckbox v-model="isPublishedComputed" label="Published"/>
      </FormRow>

      <ErrorMessage :message="error"/>

      <div class="modal-actions">
        <button type="button" class="cancel-btn" @click="emit('close')">Cancel</button>
        <AppButton
            :label="isEditing ? 'Save changes' : 'Create post'"
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
import type {Category} from '@/application/types/api/resources/Category'
import type {StorePostRequest} from '@/application/types/api/resources/Post'
import AppModal from '@/components/ui/AppModal.vue'
import FormRow from '@/components/form/FormRow.vue'
import AppInput from '@/components/form/AppInput.vue'
import AppSelect from '@/components/form/AppSelect.vue'
import AppTextarea from '@/components/form/AppTextarea.vue'
import AppCheckbox from '@/components/form/AppCheckbox.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'

interface Props {
  form: StorePostRequest
  categories: Category[]
  isEditing: boolean
  isSaving: boolean
  error: string | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
  (e: 'titleBlur'): void
}>()

const isPublishedComputed = computed<boolean>({
  get: () => Boolean(props.form.is_published),
  set: (value: boolean) => {
    props.form.is_published = value
  },
})

const categoryIdAsString = computed<string>({
  get: () => props.form.category_id ? String(props.form.category_id) : '',
  set: (value: string) => {
    props.form.category_id = value ? Number(value) : null
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