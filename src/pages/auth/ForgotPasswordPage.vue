<template>
  <AuthFormWrapper @submit="handleFormSubmit">

    <template #header>
      Remember your password?
      <RouterLink class="accent-link" :to="{ name: 'login' }">
        Sign in
      </RouterLink>
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

    <ErrorMessage :message="error"/>

    <template #footer>
      <AppButton
          label="Send reset link"
          loading-label="Sending..."
          :loading="isLoading"
          size="large"
          type="submit"
      />
    </template>

  </AuthFormWrapper>
</template>

<script setup lang="ts">
import {useForgotPassword} from '@/composables/useForgotPassword'
import AuthFormWrapper from '@/components/AuthFormWrapper.vue'
import AppInput from '@/components/form/AppInput.vue'
import FormRow from '@/components/form/FormRow.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import {onMounted} from "vue";
import {useAuthStore} from "@/stores/auth.ts";

const authStore = useAuthStore()

const {credentials, handleFormSubmit, isLoading, error} = useForgotPassword()

onMounted(() => {
  authStore.clearError()
})
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