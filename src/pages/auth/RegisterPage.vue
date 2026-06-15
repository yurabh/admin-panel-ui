<template>
  <AuthFormWrapper @submit="handleFormSubmit">

    <template #header>
      Already have an account?
      <RouterLink class="accent-link" :to="{ name: 'login' }">
        Sign in
      </RouterLink>
    </template>

    <FormRow>
      <AppInput
          v-model="credentials.name"
          label="Name"
          type="text"
          size="large"
          placeholder="John Doe"
          required
      />
    </FormRow>

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
          label="Password"
          size="large"
          placeholder="••••••••"
          required
      />
    </FormRow>

    <FormRow>
      <PasswordInput
          v-model="credentials.password_confirmation"
          label="Confirm password"
          size="large"
          placeholder="••••••••"
          required
      />
    </FormRow>

    <ErrorMessage :message="error"/>

    <template #footer>
      <AppButton
          label="Register"
          loading-label="Creating account..."
          :loading="isLoading"
          size="large"
          type="submit"
      />
    </template>

  </AuthFormWrapper>
</template>

<script setup lang="ts">
import {useRegister} from '@/composables/useRegister'
import AuthFormWrapper from '@/components/AuthFormWrapper.vue'
import AppInput from '@/components/form/AppInput.vue'
import PasswordInput from '@/components/form/PasswordInput.vue'
import FormRow from '@/components/form/FormRow.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'

const {credentials, handleFormSubmit, isLoading, error} = useRegister()
</script>

<style scoped>
.accent-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.accent-link:hover {
  text-decoration: underline;
}
</style>