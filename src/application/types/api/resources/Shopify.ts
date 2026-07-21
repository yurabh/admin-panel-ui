export interface ShopifyProduct {
    id: number
    shopify_id: number
    title: string
    vendor: string | null
    product_type: string | null
    status: string | null
    image_url: string | null
    price: string | null
    inventory_quantity: number | null
    shopify_created_at: string | null
}

export interface ShopifyOrder {
    id: number
    shopify_id: number
    order_number: string | null
    email: string | null
    financial_status: string | null
    fulfillment_status: string | null
    total_price: string | null
    currency: string | null
    customer_first_name: string | null
    customer_last_name: string | null
    shipping_country: string | null
    shipping_city: string | null
    line_items: Array<{
        title: string
        quantity: number
        price: string
    }>
    shopify_created_at: string | null
}
