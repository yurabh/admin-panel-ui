<template>
  <div class="status-card">
    <div class="status-header">
      <h3>Current subscription</h3>
      <span v-if="badge" class="badge-inline" :class="badge.className">
        {{ badge.label }}
      </span>
    </div>

    <div v-if="!billing || !billing.is_active" class="muted">
      You don't have an active subscription.
    </div>

    <div v-else class="status-body">
      <div v-if="billing.on_trial" class="status-row">
        <span class="label">Status:</span>
        <span>On trial</span>
      </div>

      <div v-if="billing.is_past_due" class="status-row">
        <span class="label">Warning:</span>
        <span class="past-due">Payment past due</span>
      </div>

      <div v-if="billing.ends_at" class="status-row">
        <span class="label">Access until:</span>
        <span>{{ formatDate(billing.ends_at) }}</span>
      </div>

      <div class="status-row">
        <span class="label">Payment method:</span>
        <span>{{ billing.card_display }}</span>
      </div>
    </div>

    <div v-if="billing?.is_active" class="status-actions">
      <AppButton
          label="Manage payment"
          size="small"
          type="button"
          :loading="isActionLoading"
          @click="emit('portal')"
      />
      <AppButton
          v-if="!billing.ends_at"
          label="Cancel subscription"
          size="small"
          type="button"
          class="cancel-btn"
          :loading="isActionLoading"
          @click="emit('cancel')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import type {BillingInfo, BillingCard} from '@/application/types/api/resources/Billing'
import AppButton from '@/components/ui/AppButton.vue'

interface Props {
  info: BillingInfo | null
  isActionLoading: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'portal'): void
}>()

const billing = computed<BillingCard | null>(() => props.info?.billing ?? null)

const badge = computed(() => {
  if (!billing.value) return null
  if (billing.value.is_past_due) return {label: 'Past due', className: 'past-due'}
  if (billing.value.on_trial) return {label: 'Trial', className: 'trial'}
  if (billing.value.ends_at) return {label: 'Cancelled', className: 'cancelled'}
  if (billing.value.is_active) return {label: 'Active', className: 'active'}
  return null
})

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString()
}
</script>

<style scoped>
.status-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.status-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
}

.status-header h3 {
  margin: 0;
  font-size: 1.05rem;
  color: #111827;
}

.badge-inline {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-inline.active {
  background-color: #dcfce7;
  color: #166534;
}

.badge-inline.trial {
  background-color: #dbeafe;
  color: #1e40af;
}

.badge-inline.cancelled {
  background-color: #fee2e2;
  color: #991b1b;
}

.badge-inline.past-due {
  background-color: #fef3c7;
  color: #92400e;
}

.status-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 1rem;
}

.status-row {
  display: flex;
  gap: 12px;
  font-size: 0.9rem;
}

.label {
  color: #6b7280;
  min-width: 140px;
}

.past-due {
  color: #991b1b;
  font-weight: 500;
}

.muted {
  color: #6b7280;
  font-size: 0.9rem;
}

.status-actions {
  display: flex;
  gap: 8px;
  margin-top: 0.5rem;
}

.status-actions .app-btn {
  width: auto;
  padding: 0.5rem 1rem;
}

.cancel-btn {
  background-color: #ef4444 !important;
}

.cancel-btn:hover:not(:disabled) {
  background-color: #dc2626 !important;
}
</style>