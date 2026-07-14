<template>
  <div>
    <PageHeader title="Billing" subtitle="Manage your subscription and invoices."/>

    <EmptyState v-if="isLoading">
      Loading billing data...
    </EmptyState>

    <template v-else>
      <ErrorMessage :message="error"/>
      <SuccessMessage :message="successMessage"/>

      <SubscriptionStatus
          :info="info"
          :is-action-loading="isActionLoading"
          @cancel="cancel"
          @portal="openPortal"
      />

      <PricingPlans
          v-if="!info?.billing?.is_active"
          :plans="PRICING_PLANS"
          :is-action-loading="isActionLoading"
          :disabled="isActionLoading"
          :show-trial="true"
          @subscribe="subscribe"
          @trial="startTrial"
      />

      <InvoicesTable
          :invoices="invoices"
          @download="downloadInvoice"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import {useBilling} from '@/composables/useBilling'
import {PRICING_PLANS} from '@/application/types/api/resources/Billing'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import SuccessMessage from '@/components/ui/SuccessMessage.vue'
import SubscriptionStatus from '@/components/billing/SubscriptionStatus.vue'
import PricingPlans from '@/components/billing/PricingPlans.vue'
import InvoicesTable from '@/components/billing/InvoicesTable.vue'

const {
  info,
  invoices,
  isLoading,
  isActionLoading,
  error,
  successMessage,
  subscribe,
  startTrial,
  cancel,
  openPortal,
  downloadInvoice,
} = useBilling()
</script>