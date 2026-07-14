export enum BackendEndpoint {
    Subscribe = '/api/subscribe',
    SubscriptionCancel = '/api/subscription/cancel',
    SubscriptionPortal = '/api/subscription/portal',
    SubscriptionStartTrial = '/api/subscription/start-trial',
    BillingInfo = '/api/billing/info',
    BillingInvoices = '/api/billing/invoices',
    BillingInvoiceDownload = '/api/billing/invoices/download',
}

export interface CheckoutRequest {
    price_id: string
}

export interface CheckoutResponse {
    url: string
}

export interface PortalResponse {
    url: string
}

export interface CancelResponse {
    status: string
    data: {
        status: string
        ends_at: string | null
        message: string
    }
}

export interface TrialResponse {
    status: string
    message: string
}

export interface BillingCard {
    is_active: boolean
    is_past_due: boolean
    on_trial: boolean
    ends_at: string | null
    card_brand: string
    card_last_four: string | null
    card_display: string
}

export interface BillingInfo {
    id: number
    name: string
    email: string
    billing: BillingCard
}

export interface Invoice {
    id: string
    number: string | null
    total: number
    currency: string
    status: string
    date: string
    hosted_invoice_url: string | null
}

export interface PricingPlan {
    id: string
    name: string
    description: string
    price: string
    price_id: string
    features: string[]
    is_popular?: boolean
}

export const PRICING_PLANS: PricingPlan[] = [
    {
        id: 'basic',
        name: 'Basic',
        description: 'For hobby projects',
        price: '$1/mo',
        price_id: 'price_1TI47gDY7sR3maRKIOw3iWi0',
        features: ['Up to 10 posts', 'Basic analytics', 'Email support'],
    },
    {
        id: 'pro',
        name: 'Pro',
        description: 'For growing blogs',
        price: '$29/mo',
        price_id: 'price_1TI47gDY7sR3maRKIOw3iWi0',
        features: ['Unlimited posts', 'Advanced analytics', 'Priority support', 'Custom domain'],
        is_popular: true,
    },
]