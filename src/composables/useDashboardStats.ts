import {onMounted, ref} from 'vue'
import {useApiClient} from '@/composables/useApiClients'
import PostClient from '@/application/api/resources/PostClient.ts'
import CategoryClient from '@/application/api/resources/CategoryClient.ts'

export function useDashboardStats() {
    const apiClient = useApiClient()
    const postClient = new PostClient(apiClient)
    const categoryClient = new CategoryClient(apiClient)

    const postsCount = ref<number>(0)
    const categoriesCount = ref<number>(0)
    const isLoading = ref<boolean>(false)

    async function loadStats(): Promise<void> {
        isLoading.value = true
        try {
            const [posts, categories] = await Promise.all([
                postClient.index().catch(() => []),
                categoryClient.index().catch(() => []),
            ])
            postsCount.value = posts.length
            categoriesCount.value = categories.length
        } finally {
            isLoading.value = false
        }
    }

    onMounted(loadStats)

    return {
        postsCount,
        categoriesCount,
        isLoading,
    }
}
