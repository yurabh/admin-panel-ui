import {onMounted, ref} from 'vue'
import {useApiClient} from '@/composables/useApiClients'
import BillingClient from '@/application/api/resources/BillingClient.ts'
import type {BillingInfo, Invoice} from '@/application/types/api/resources/Billing'

export function useBilling() {
    const apiClient = useApiClient()
    const client = new BillingClient(apiClient)

    const info = ref<BillingInfo | null>(null)
    const invoices = ref<Invoice[]>([])

    const isLoading = ref<boolean>(false)
    const isActionLoading = ref<boolean>(false)
    const error = ref<string | null>(null)
    const successMessage = ref<string | null>(null)

    async function fetchAll(): Promise<void> {
        isLoading.value = true
        error.value = null
        try {
            const [infoRes, invoicesRes] = await Promise.all([
                client.info().catch(() => null),
                client.invoices().catch(() => [] as Invoice[]),
            ])
            info.value = (infoRes as any)?.data ?? (infoRes as any)
            const rawInvoices = (invoicesRes as any)?.data ?? invoicesRes
            invoices.value = Array.isArray(rawInvoices) ? rawInvoices : []
        } catch (err: any) {
            error.value = extractError(err, 'Failed to load billing data')
        } finally {
            isLoading.value = false
        }
    }

    async function subscribe(priceId: string): Promise<void> {
        isActionLoading.value = true
        error.value = null
        try {
            const res = await client.subscribe({price_id: priceId}) as any
            const url = res.url || res.data?.url
            if (url) {
                window.location.href = url
            }
        } catch (err: any) {
            error.value = extractError(err, 'Could not start checkout')
        } finally {
            isActionLoading.value = false
        }
    }

    async function startTrial(priceId: string): Promise<void> {
        isActionLoading.value = true
        error.value = null
        successMessage.value = null
        try {
            const res = await client.startTrial({price_id: priceId}) as any
            successMessage.value = res.message || res.data?.message || 'Trial started'
            await fetchAll()
        } catch (err: any) {
            error.value = extractError(err, 'Could not start trial')
        } finally {
            isActionLoading.value = false
        }
    }

    async function cancel(): Promise<void> {
        if (!confirm('Cancel your subscription? Access remains until the end of the billing period.')) return
        isActionLoading.value = true
        error.value = null
        successMessage.value = null
        try {
            const res = await client.cancel() as any
            successMessage.value = res.data?.message || 'Subscription cancelled'
            await fetchAll()
        } catch (err: any) {
            error.value = extractError(err, 'Could not cancel subscription')
        } finally {
            isActionLoading.value = false
        }
    }

    async function openPortal(): Promise<void> {
        isActionLoading.value = true
        error.value = null
        try {
            const res = await client.portal() as any
            const url = res.url || res.data?.url
            if (url) {
                window.location.href = url
            }
        } catch (err: any) {
            error.value = extractError(err, 'Could not open billing portal')
        } finally {
            isActionLoading.value = false
        }
    }

    async function downloadInvoice(invoiceId: string): Promise<void> {
        error.value = null
        try {
            const blob = await client.downloadInvoice(invoiceId)
            console.log('Downloaded blob:', {size: blob.size, type: blob.type})
            const pdfBlob = new Blob([blob], {type: 'application/pdf'})
            const url = window.URL.createObjectURL(pdfBlob)
            const link = document.createElement('a')
            link.href = url
            link.download = `invoice-${invoiceId}.pdf`
            link.rel = 'noopener'
            document.body.appendChild(link)
            link.click()
            setTimeout(() => {
                document.body.removeChild(link)
                window.URL.revokeObjectURL(url)
            }, 100)
        } catch (err: any) {
            error.value = extractError(err, 'Could not download invoice')
        }
    }

    function clearMessages(): void {
        error.value = null
        successMessage.value = null
    }

    onMounted(fetchAll)

    return {
        info,
        invoices,
        isLoading,
        isActionLoading,
        error,
        successMessage,
        fetchAll,
        subscribe,
        startTrial,
        cancel,
        openPortal,
        downloadInvoice,
        clearMessages,
    }
}

function extractError(err: any, fallback: string): string {
    return err.data?.message || err.response?.data?.message || err.message || fallback
}