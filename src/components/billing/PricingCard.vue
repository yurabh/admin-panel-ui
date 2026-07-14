<template>
  <div class="pricing-card" :class="{popular: plan.is_popular}">
    <div v-if="plan.is_popular" class="popular-badge">Popular</div>

    <h3 class="plan-name">{{ plan.name }}</h3>
    <p class="plan-description">{{ plan.description }}</p>

    <div class="plan-price">{{ plan.price }}</div>

    <ul class="plan-features">
      <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
    </ul>

    <div class="plan-actions">
      <AppButton
          label="Subscribe"
          type="button"
          :loading="isActionLoading"
          :disabled="disabled"
          @click="emit('subscribe', plan.price_id)"
      />
      <AppButton
          v-if="showTrial"
          label="Start free trial"
          type="button"
          class="trial-btn"
          :loading="isActionLoading"
          :disabled="disabled"
          @click="emit('trial', plan.price_id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type {PricingPlan} from '@/application/types/api/resources/Billing'
import AppButton from '@/components/ui/AppButton.vue'

interface Props {
  plan: PricingPlan
  isActionLoading: boolean
  disabled: boolean
  showTrial: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'subscribe', priceId: string): void
  (e: 'trial', priceId: string): void
}>()
</script>

<style scoped>
.pricing-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.75rem;
  position: relative;
  display: flex;
  flex-direction: column;
}

.pricing-card.popular {
  border-color: #2563eb;
  box-shadow: 0 2px 12px rgba(37, 99, 235, 0.1);
}

.popular-badge {
  position: absolute;
  top: -10px;
  right: 20px;
  background: #2563eb;
  color: white;
  padding: 2px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.plan-name {
  margin: 0 0 4px;
  font-size: 1.25rem;
  color: #111827;
}

.plan-description {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0 0 1rem;
}

.plan-price {
  font-size: 1.75rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.25rem;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  flex: 1;
}

.plan-features li {
  padding: 6px 0;
  color: #374151;
  font-size: 0.9rem;
  border-bottom: 1px solid #f3f4f6;
}

.plan-features li:last-child {
  border-bottom: none;
}

.plan-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.trial-btn {
  background-color: transparent !important;
  color: #2563eb !important;
  border: 1px solid #2563eb !important;
}

.trial-btn:hover:not(:disabled) {
  background-color: #eff6ff !important;
}
</style>