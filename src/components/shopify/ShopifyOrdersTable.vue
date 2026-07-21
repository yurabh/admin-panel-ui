<template>
  <div class="orders-section">
    <EmptyState v-if="orders.length === 0">
      No orders yet.
    </EmptyState>

    <table v-else class="shopify-table">
      <thead>
      <tr>
        <th>Order #</th>
        <th>Customer</th>
        <th>Status</th>
        <th>Total</th>
        <th>Shipping</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>{{ order.order_number || '—' }}</td>
        <td>{{ customerName(order) }}</td>
        <td>
          <span class="order-status" :class="statusClass(order.financial_status)">
            {{ order.financial_status || 'unknown' }}
          </span>
        </td>
        <td>{{ formatAmount(order.total_price, order.currency) }}</td>
        <td class="muted">{{ shippingLocation(order) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type {ShopifyOrder} from '@/application/types/api/resources/Shopify'
import EmptyState from '@/components/ui/EmptyState.vue'

interface Props {
  orders: ShopifyOrder[]
}

defineProps<Props>()

function customerName(order: ShopifyOrder): string {
  const name = `${order.customer_first_name ?? ''} ${order.customer_last_name ?? ''}`.trim()
  return name || '—'
}

function shippingLocation(order: ShopifyOrder): string {
  if (!order.shipping_city && !order.shipping_country) return '—'
  return [order.shipping_city, order.shipping_country].filter(Boolean).join(', ')
}

function formatAmount(total: string | null, currency: string | null): string {
  if (!total) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency?.toUpperCase() || 'USD',
  }).format(Number(total))
}

function statusClass(status: string | null): string {
  const s = (status ?? '').toLowerCase()
  if (s === 'paid') return 'paid'
  if (s === 'pending' || s === 'authorized') return 'pending'
  return 'failed'
}
</script>

<style scoped>
.shopify-table {
  width: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  border-collapse: collapse;
  overflow: hidden;
}

.shopify-table th {
  text-align: left;
  font-size: 0.8rem;
  font-weight: 500;
  color: #6b7280;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.shopify-table td {
  padding: 0.875rem 1rem;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.9rem;
  color: #111827;
  vertical-align: middle;
}

.shopify-table tr:last-child td {
  border-bottom: none;
}

.muted {
  color: #6b7280;
}

.order-status {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.order-status.paid {
  background-color: #dcfce7;
  color: #166534;
}

.order-status.pending {
  background-color: #fef3c7;
  color: #92400e;
}

.order-status.failed {
  background-color: #fee2e2;
  color: #991b1b;
}
</style>
