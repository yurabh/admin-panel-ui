import {computed, onMounted, reactive, ref} from 'vue'
import {useApiClient} from '@/composables/useApiClients'
import PostClient from '@/application/api/resources/PostClient.ts'
import CategoryClient from '@/application/api/resources/CategoryClient.ts'
import type {Post, StorePostRequest} from '@/application/types/api/resources/Post'
import type {Category} from '@/application/types/api/resources/Category'

export function usePosts() {
    const apiClient = useApiClient()
    const postClient = new PostClient(apiClient)
    const categoryClient = new CategoryClient(apiClient)

    const posts = ref<Post[]>([])
    const categories = ref<Category[]>([])
    const isLoading = ref<boolean>(false)
    const listError = ref<string | null>(null)

    const isModalOpen = ref<boolean>(false)
    const editingPost = ref<Post | null>(null)
    const formError = ref<string | null>(null)
    const isSaving = ref<boolean>(false)

    const form = reactive<StorePostRequest>({
        title: '',
        slug: '',
        content: '',
        category_id: null,
        is_published: false,
    })

    const isEditing = computed<boolean>(() => editingPost.value !== null)

    async function fetchPosts(): Promise<void> {
        isLoading.value = true
        listError.value = null
        try {
            const res = await postClient.index() as any
            posts.value = res.data || res
        } catch (err: any) {
            listError.value = handlePostError(err,
                'You are not authorized to view posts. Administrator privileges required.',
                'Failed to load posts')
        } finally {
            isLoading.value = false
        }
    }

    async function fetchCategories(): Promise<void> {
        try {
            const res = await categoryClient.index() as any
            categories.value = res.data || res
        } catch {
        }
    }

    function resetForm(): void {
        form.title = ''
        form.slug = ''
        form.content = ''
        form.category_id = null
        form.is_published = false
        formError.value = null
    }

    function openCreateModal(): void {
        resetForm()
        editingPost.value = null
        isModalOpen.value = true
    }

    function openEditModal(post: Post): void {
        editingPost.value = post
        form.title = post.title
        form.slug = post.slug
        form.content = post.content
        form.category_id = post.category_id
        form.is_published = post.is_published
        formError.value = null
        isModalOpen.value = true
    }

    function closeModal(): void {
        isModalOpen.value = false
        editingPost.value = null
    }

    function generateSlug(): void {
        form.slug = form.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
    }

    async function handleSubmit(): Promise<void> {
        isSaving.value = true
        formError.value = null
        try {
            if (isEditing.value && editingPost.value) {
                const updated = await postClient.update(editingPost.value.id, {...form})
                const index = posts.value.findIndex(p => p.id === updated.id)
                if (index !== -1) posts.value[index] = updated
            } else {
                const created = await postClient.store({...form})
                posts.value.unshift(created)
            }
            closeModal()
        } catch (err: any) {
            formError.value = handlePostError(err,
                'You cannot create or modify posts because you do not have administrator privileges.',
                'Something went wrong')
        } finally {
            isSaving.value = false
        }
    }

    async function handleDelete(post: Post): Promise<void> {
        if (!confirm(`Delete post "${post.title}"?`)) return
        try {
            await postClient.destroy(post.id)
            posts.value = posts.value.filter(p => p.id !== post.id)
        } catch (err: any) {
            listError.value = err.data?.message || err.message || 'Failed to delete post'
        }
    }

    onMounted(() => {
        fetchPosts()
        fetchCategories()
    })

    return {
        posts,
        categories,
        isLoading,
        listError,
        isModalOpen,
        isEditing,
        form,
        formError,
        isSaving,
        openCreateModal,
        openEditModal,
        closeModal,
        generateSlug,
        handleSubmit,
        handleDelete,
    }
}

function handlePostError(err: any, forbiddenMessage: string, fallbackMessage: string): string {
    const isForbidden = err.status === 403 ||
        err.response?.status === 403 ||
        err.data?.message === 'Forbidden' ||
        err.message?.includes('403')

    if (isForbidden) {
        return forbiddenMessage
    }

    return err.data?.message || err.message || fallbackMessage
}