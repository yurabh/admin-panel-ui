<template>
  <div>
    <PageHeader title="Shopify Integration">
      <template #action>
        <AppButton
            label="Sync now"
            type="button"
            :loading="isSyncing"
            @click="syncNow"
        />
      </template>
    </PageHeader>

    <ErrorMessage :message="error"/>

    <div class="shopify-tabs">
      <button
          :class="{ active: activeTab === 'products' }"
          @click="activeTab = 'products'"
      >
        Products ({{ products.length }})
      </button>
      <button
          :class="{ active: activeTab === 'orders' }"
          @click="activeTab = 'orders'"
      >
        Orders ({{ orders.length }})
      </button>
    </div>

    <div v-if="isLoading" class="loading-text">Loading...</div>

    <ShopifyProductsTable v-else-if="activeTab === 'products'" :products="products"/>
    <ShopifyOrdersTable v-else :orders="orders"/>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useShopify} from '@/composables/useShopify'
import PageHeader from '@/components/ui/PageHeader.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ErrorMessage from '@/components/ui/ErrorMessage.vue'
import ShopifyProductsTable from '@/components/shopify/ShopifyProductsTable.vue'
import ShopifyOrdersTable from '@/components/shopify/ShopifyOrdersTable.vue'

const activeTab = ref<'products' | 'orders'>('products')
const {products, orders, isLoading, isSyncing, error, syncNow} = useShopify()
</script>

<style scoped>
.shopify-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.shopify-tabs button {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-weight: 500;
  color: #6b7280;
  font-size: 0.9rem;
}

.shopify-tabs button.active {
  border-bottom-color: #2563eb;
  color: #2563eb;
}

.loading-text {
  color: #6b7280;
  padding: 2rem 0;
  text-align: center;
}
</style>
