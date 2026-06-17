<template>
  <AuthFormWrapper @submit="handleFormSubmit">

    <template #header>
      Create new password
    </template>

    <FormRow>
      <AppInput
          v-model="credentials.email"
          label="Email"
          type="email"
          size="large"
          placeholder="your@email.com"
          required
      />
    </FormRow>

    <FormRow>
      <PasswordInput
          v-model="credentials.password"
          label="New password"
          size="large"
          placeholder="••••••••"
          required
      />
    </FormRow>

    <FormRow>
      <PasswordInput
          v-model="credentials.password_confirmation"
          label="Confirm new password"
          size="large"
          placeholder="••••••••"
          required
      />
    </FormRow>

    <ErrorMessage :message="error"/>

    <template #footer>
      <AppButton
          label="Reset password"
          loading-label="Resetting..."
          :loading="isLoading"
          size="large"
          type="submit"
      />
    </template>

  </AuthFormWrapper>
</template>

<script setup lang="ts">
import {useResetPassword} from '@/composables/useResetPassword'
import AuthFormWrapper from '@/components/AuthFormWrapper.vue'
import AppInput from '@/components/form/AppInput.vue'
import PasswordInput from '@/components/form/PasswordInput.vue'
import FormRow from '@/components/form/FormRow.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'

const {credentials, handleFormSubmit, isLoading, error} = useResetPassword()
</script>

<style scoped>
</style>