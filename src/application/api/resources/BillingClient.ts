import type StandardClient from '@/application/api/StandardClient'
import {
    BackendEndpoint,
    type BillingInfo,
    type CancelResponse,
    type CheckoutRequest,
    type CheckoutResponse,
    type Invoice,
    type PortalResponse,
    type TrialResponse,
} from '@/application/types/api/resources/Billing'

export default class BillingClient {
    constructor(private readonly apiClient: StandardClient) {
    }

    info(): Promise<BillingInfo> {
        return this.apiClient.get<BillingInfo>(BackendEndpoint.BillingInfo)
    }

    invoices(): Promise<Invoice[]> {
        return this.apiClient.get<Invoice[]>(BackendEndpoint.BillingInvoices)
    }

    subscribe(data: CheckoutRequest): Promise<CheckoutResponse> {
        return this.apiClient.post<CheckoutResponse, CheckoutRequest>(BackendEndpoint.Subscribe, data)
    }

    startTrial(data: CheckoutRequest): Promise<TrialResponse> {
        return this.apiClient.post<TrialResponse, CheckoutRequest>(BackendEndpoint.SubscriptionStartTrial, data)
    }

    cancel(): Promise<CancelResponse> {
        return this.apiClient.post<CancelResponse>(BackendEndpoint.SubscriptionCancel)
    }

    portal(): Promise<PortalResponse> {
        return this.apiClient.get<PortalResponse>(BackendEndpoint.SubscriptionPortal)
    }

    downloadInvoice(invoiceId: string): Promise<Blob> {
        return this.apiClient.get<Blob, { invoice_id: string }>(
            BackendEndpoint.BillingInvoiceDownload,
            {invoice_id: invoiceId},
            {responseType: 'blob'} as any
        )
    }
}