import {computed, onMounted, reactive, ref, type Ref} from 'vue'

export interface ResourceClient<TItem, TStoreRequest> {
    index(): Promise<any>

    store(data: TStoreRequest): Promise<TItem>

    update(id: number, data: TStoreRequest): Promise<TItem>

    destroy(id: number): Promise<void>
}

export interface UseResourceOptions<TItem extends { id: number }, TStoreRequest extends object> {
    client: ResourceClient<TItem, TStoreRequest>
    initialForm: TStoreRequest
    mapItemToForm: (item: TItem, form: TStoreRequest) => void
    getItemLabel: (item: TItem) => string
    resourceLabel: string
    resourceLabelPlural: string
    autoFetch?: boolean
}

export function useResource<TItem extends { id: number }, TStoreRequest extends object>(
    options: UseResourceOptions<TItem, TStoreRequest>
) {
    const {
        client,
        initialForm,
        mapItemToForm,
        getItemLabel,
        resourceLabel,
        resourceLabelPlural,
        autoFetch = true,
    } = options

    const initialFormSnapshot = {...initialForm}

    const items = ref([]) as Ref<TItem[]>
    const isLoading = ref<boolean>(false)
    const listError = ref<string | null>(null)

    const isModalOpen = ref<boolean>(false)
    const editingItem = ref(null) as Ref<TItem | null>
    const formError = ref<string | null>(null)
    const isSaving = ref<boolean>(false)

    const form = reactive({...initialForm}) as TStoreRequest

    const isEditing = computed<boolean>(() => editingItem.value !== null)

    async function fetchItems(): Promise<void> {
        isLoading.value = true
        listError.value = null
        try {
            const res = await client.index() as any
            items.value = res.data || res
        } catch (err: any) {
            listError.value = handleResourceError(err,
                `You are not authorized to view ${resourceLabelPlural}. Administrator privileges required.`,
                `Failed to load ${resourceLabelPlural}`)
        } finally {
            isLoading.value = false
        }
    }

    function resetForm(): void {
        Object.assign(form, initialFormSnapshot)
        formError.value = null
    }

    function openCreateModal(): void {
        resetForm()
        editingItem.value = null
        isModalOpen.value = true
    }

    function openEditModal(item: TItem): void {
        editingItem.value = item
        mapItemToForm(item, form)
        formError.value = null
        isModalOpen.value = true
    }

    function closeModal(): void {
        isModalOpen.value = false
        editingItem.value = null
    }

    async function handleSubmit(): Promise<void> {
        isSaving.value = true
        formError.value = null
        try {
            if (isEditing.value && editingItem.value) {
                const updated = await client.update(editingItem.value.id, {...form})
                const index = items.value.findIndex(i => i.id === updated.id)
                if (index !== -1) items.value[index] = updated
            } else {
                const created = await client.store({...form})
                items.value.unshift(created)
            }
            closeModal()
        } catch (err: any) {
            formError.value = handleResourceError(err,
                `You cannot create or modify ${resourceLabelPlural} because you do not have administrator privileges.`,
                'Something went wrong')
        } finally {
            isSaving.value = false
        }
    }

    async function handleDelete(item: TItem): Promise<void> {
        if (!confirm(`Delete ${resourceLabel} "${getItemLabel(item)}"?`)) return
        try {
            await client.destroy(item.id)
            items.value = items.value.filter(i => i.id !== item.id)
        } catch (err: any) {
            listError.value = err.data?.message || err.message || `Failed to delete ${resourceLabel}`
        }
    }

    if (autoFetch) {
        onMounted(fetchItems)
    }

    return {
        items,
        isLoading,
        listError,
        isModalOpen,
        isEditing,
        editingItem,
        form,
        formError,
        isSaving,
        fetchItems,
        openCreateModal,
        openEditModal,
        closeModal,
        handleSubmit,
        handleDelete,
    }
}

function handleResourceError(err: any, forbiddenMessage: string, fallbackMessage: string): string {
    const isForbidden = err.status === 403 ||
        err.response?.status === 403 ||
        err.data?.message === 'Forbidden' ||
        err.message?.includes('403')

    if (isForbidden) {
        return forbiddenMessage
    }

    return err.data?.message || err.message || fallbackMessage
}