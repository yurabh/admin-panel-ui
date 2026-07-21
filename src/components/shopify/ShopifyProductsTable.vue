<template>
  <div class="products-section">
    <EmptyState v-if="products.length === 0">
      No products yet.
    </EmptyState>

    <table v-else class="shopify-table">
      <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Vendor</th>
        <th>Price</th>
        <th>Stock</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <td class="image-cell">
          <img v-if="product.image_url" :src="product.image_url" alt=""/>
        </td>
        <td>{{ product.title }}</td>
        <td class="muted">{{ product.vendor || '—' }}</td>
        <td>{{ formatPrice(product.price) }}</td>
        <td>{{ product.inventory_quantity ?? '—' }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type {ShopifyProduct} from '@/application/types/api/resources/Shopify'
import EmptyState from '@/components/ui/EmptyState.vue'

interface Props {
  products: ShopifyProduct[]
}

defineProps<Props>()

function formatPrice(price: string | null): string {
  if (!price) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(price))
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

.image-cell img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
}
</style>
