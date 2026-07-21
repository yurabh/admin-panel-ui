import type StandardClient from '@/application/api/StandardClient'
import type {ShopifyProduct, ShopifyOrder} from '@/application/types/api/resources/Shopify'

export default class ShopifyClient {
    constructor(private readonly apiClient: StandardClient) {
    }

    getProducts(): Promise<ShopifyProduct[]> {
        return this.apiClient.get<ShopifyProduct[]>('/api/admin/shopify/products')
    }

    getOrders(): Promise<ShopifyOrder[]> {
        return this.apiClient.get<ShopifyOrder[]>('/api/admin/shopify/orders')
    }

    sync(): Promise<{ products_synced: number; orders_synced: number }> {
        return this.apiClient.post<{
            products_synced: number;
            orders_synced: number
        }, {}>('/api/admin/shopify/sync', {})
    }
}
