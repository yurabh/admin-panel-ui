import {ref, onMounted} from 'vue'
import ShopifyClient from '@/application/api/resources/ShopifyClient'
import {useApiClient} from '@/composables/useApiClients'
import type {ShopifyProduct, ShopifyOrder} from '@/application/types/api/resources/Shopify'

export function useShopify() {
    const apiClient = useApiClient()
    const client = new ShopifyClient(apiClient)

    const products = ref<ShopifyProduct[]>([])
    const orders = ref<ShopifyOrder[]>([])
    const isLoading = ref(false)
    const isSyncing = ref(false)
    const error = ref<string | null>(null)

    async function fetchProducts() {
        isLoading.value = true
        try {
            products.value = await client.getProducts()
        } catch (e) {
            error.value = 'Failed to load products'
        } finally {
            isLoading.value = false
        }
    }

    async function fetchOrders() {
        isLoading.value = true
        try {
            orders.value = await client.getOrders()
        } catch (e) {
            error.value = 'Failed to load orders'
        } finally {
            isLoading.value = false
        }
    }

    async function syncNow() {
        isSyncing.value = true
        try {
            await client.sync()
            await fetchProducts()
            await fetchOrders()
        } catch (e) {
            error.value = 'Sync failed'
        } finally {
            isSyncing.value = false
        }
    }

    onMounted(() => {
        fetchProducts()
        fetchOrders()
    })

    return {products, orders, isLoading, isSyncing, error, syncNow, fetchProducts, fetchOrders}
}
