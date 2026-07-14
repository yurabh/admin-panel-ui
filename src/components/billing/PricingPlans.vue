<template>
  <div class="pricing-section">
    <h3 class="section-title">Choose a plan</h3>
    <div class="pricing-grid">
      <PricingCard
          v-for="plan in plans"
          :key="plan.id"
          :plan="plan"
          :is-action-loading="isActionLoading"
          :disabled="disabled"
          :show-trial="showTrial"
          @subscribe="(id) => emit('subscribe', id)"
          @trial="(id) => emit('trial', id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type {PricingPlan} from '@/application/types/api/resources/Billing'
import PricingCard from './PricingCard.vue'

interface Props {
  plans: PricingPlan[]
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
.pricing-section {
  margin-bottom: 1.5rem;
}

.section-title {
  margin: 0 0 1rem;
  font-size: 1.05rem;
  color: #111827;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}
</style>