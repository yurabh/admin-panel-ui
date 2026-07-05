<template>
  <AuthFormWrapper @submit="handleFormSubmit">

    <template #header>
      Welcome back. Don't have an account?
      <RouterLink class="accent-link" :to="{ name: 'register' }">
        Register now
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
      >
        <template #error>
          <div>Email is required</div>
        </template>
      </AppInput>
    </FormRow>

    <FormRow>
      <PasswordInput
          v-model="credentials.password"
          label="Password"
          size="large"
          placeholder="••••••••"
          required
      >
        <template #error>
          <div>Password is required</div>
        </template>
      </PasswordInput>
    </FormRow>

    <p class="forgot-password">
      <RouterLink :to="{ name: 'forgot-password' }">
        Forgot password?
      </RouterLink>
    </p>

    <ErrorMessage :message="error"/>

    <template #footer>
      <AppButton
          label="Sign in"
          loading-label="Checking..."
          :loading="isLoading"
          size="large"
          type="submit"
      />
    </template>
  </AuthFormWrapper>
</template>

<script setup lang="ts">
import {useLogin} from '@/composables/useLogin'
import AuthFormWrapper from '@/components/AuthFormWrapper.vue'
import AppInput from '@/components/form/AppInput.vue'
import PasswordInput from '@/components/form/PasswordInput.vue'
import FormRow from '@/components/form/FormRow.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import {onMounted} from "vue";
import {useAuthStore} from "@/stores/auth.ts";

const authStore = useAuthStore()

const {credentials, handleFormSubmit, isLoading, error} = useLogin()

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

.forgot-password {
  text-align: right;
  margin-bottom: 0.5rem;
}

.forgot-password a {
  font-size: 0.875rem;
  color: #2563eb;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}
</style>
