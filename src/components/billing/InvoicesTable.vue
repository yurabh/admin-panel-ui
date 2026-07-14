<template>
  <div class="invoices-section">
    <h3 class="section-title">Invoices</h3>

    <EmptyState v-if="invoices.length === 0">
      No invoices yet.
    </EmptyState>

    <table v-else class="invoices-table">
      <thead>
      <tr>
        <th>Invoice</th>
        <th>Date</th>
        <th>Amount</th>
        <th>Status</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="invoice in invoices" :key="invoice.id">
        <td>{{ invoice.number || invoice.id }}</td>
        <td class="muted">{{ formatDate(invoice.date) }}</td>
        <td>{{ formatAmount(invoice.total, invoice.currency) }}</td>
        <td>
          <span class="invoice-status" :class="statusClass(invoice.status)">
            {{ invoice.status }}
          </span>
        </td>
        <td class="actions-cell">
          <AppButton
              label="Download"
              size="small"
              type="button"
              class="table-btn"
              @click="emit('download', invoice.id)"
          />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type {Invoice} from '@/application/types/api/resources/Billing'
import AppButton from '@/components/ui/AppButton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

interface Props {
  invoices: Invoice[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'download', invoiceId: string): void
}>()

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString()
}

function formatAmount(total: number, currency: string): string {
  const amount = total / 100
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency?.toUpperCase() || 'USD',
  }).format(amount)
}

function statusClass(status: string): string {
  const s = status.toLowerCase()
  if (s === 'paid') return 'paid'
  if (s === 'open' || s === 'draft') return 'pending'
  return 'failed'
}
</script>

<style scoped>
.section-title {
  margin: 0 0 1rem;
  font-size: 1.05rem;
  color: #111827;
}

.invoices-table {
  width: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  border-collapse: collapse;
  overflow: hidden;
}

.invoices-table th {
  text-align: left;
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.invoices-table td {
  padding: 0.875rem 1rem;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.9rem;
  color: #111827;
  vertical-align: middle;
}

.invoices-table tr:last-child td {
  border-bottom: none;
}

.muted {
  color: #6b7280;
}

.invoice-status {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.invoice-status.paid {
  background-color: #dcfce7;
  color: #166534;
}

.invoice-status.pending {
  background-color: #fef3c7;
  color: #92400e;
}

.invoice-status.failed {
  background-color: #fee2e2;
  color: #991b1b;
}

.actions-cell {
  text-align: right;
}

.table-btn {
  width: auto;
  min-width: 90px;
  padding: 0.4rem 0.75rem;
}
</style>