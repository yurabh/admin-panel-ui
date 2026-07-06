<template>
  <AppModal :title="isEditing ? 'Edit user' : 'New user'" @close="emit('close')">
    <form @submit.prevent="emit('submit')">
      <FormRow>
        <AppInput
            v-model="form.name"
            label="Name"
            required
        />
      </FormRow>

      <FormRow>
        <AppInput
            v-model="form.email"
            label="Email"
            type="email"
            required
        />
      </FormRow>

      <FormRow>
        <AppSelect v-model="form.role" label="Role">
          <option v-for="role in USER_ROLES" :key="role" :value="role">
            {{ role.charAt(0).toUpperCase() + role.slice(1) }}
          </option>
        </AppSelect>
      </FormRow>

      <FormRow>
        <PasswordInput
            v-model="passwordValue"
            :label="isEditing ? 'New password (leave empty to keep current)' : 'Password'"
            :required="!isEditing"
        />
      </FormRow>

      <FormRow>
        <PasswordInput
            v-model="passwordConfirmationValue"
            label="Confirm password"
            :required="!isEditing"
        />
      </FormRow>

      <ErrorMessage :message="error"/>

      <div class="modal-actions">
        <button type="button" class="cancel-btn" @click="emit('close')">Cancel</button>
        <AppButton
            :label="isEditing ? 'Save changes' : 'Create user'"
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
import {type StoreUserRequest, USER_ROLES} from '@/application/types/api/resources/User'
import AppModal from '@/components/ui/AppModal.vue'
import FormRow from '@/components/form/FormRow.vue'
import AppInput from '@/components/form/AppInput.vue'
import AppSelect from '@/components/form/AppSelect.vue'
import PasswordInput from '@/components/form/PasswordInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'

interface Props {
  form: StoreUserRequest
  isEditing: boolean
  isSaving: boolean
  error: string | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
}>()

const passwordValue = computed<string>({
  get: () => props.form.password || '',
  set: (value: string) => {
    props.form.password = value
  },
})

const passwordConfirmationValue = computed<string>({
  get: () => props.form.password_confirmation || '',
  set: (value: string) => {
    props.form.password_confirmation = value
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