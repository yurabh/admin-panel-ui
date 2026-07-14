<template>
  <div class="success-page">
    <div class="success-card">
      <div v-if="isProcessing">
        <h1>Processing payment...</h1>
        <p>Please wait while we confirm your subscription.</p>
      </div>

      <div v-else-if="error">
        <h1>Payment issue</h1>
        <ErrorMessage :message="error"/>
        <AppButton label="Back to billing" type="button" @click="goBack"/>
      </div>

      <div v-else>
        <h1>Payment successful!</h1>
        <p>Your subscription is active. Welcome aboard.</p>
        <AppButton label="Go to dashboard" type="button" @click="goDashboard"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useApiClient} from '@/composables/useApiClients'
import AppButton from '@/components/ui/AppButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'

const route = useRoute()
const router = useRouter()
const apiClient = useApiClient()

const isProcessing = ref<boolean>(true)
const error = ref<string | null>(null)

onMounted(async () => {
  const sessionId = route.query.session_id as string | undefined

  if (!sessionId) {
    error.value = 'Missing session ID'
    isProcessing.value = false
    return
  }

  try {
    await apiClient.get(`/api/subscription/success?session_id=${encodeURIComponent(sessionId)}`)
  } catch (err: any) {
    error.value = err.data?.message || err.message || 'Could not verify payment'
  } finally {
    isProcessing.value = false
  }
})

function goDashboard(): void {
  router.push({name: 'dashboard'})
}

function goBack(): void {
  router.push({name: 'billing'})
}
</script>

<style scoped>
.success-page {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2.5rem;
  max-width: 480px;
  text-align: center;
}

.success-card h1 {
  margin: 0 0 0.75rem;
  font-size: 1.5rem;
  color: #111827;
}

.success-card p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.app-btn {
  max-width: 240px;
  margin: 0 auto;
}
</style>