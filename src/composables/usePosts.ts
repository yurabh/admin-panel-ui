import {onMounted, ref} from 'vue'
import {useApiClient} from '@/composables/useApiClients'
import {useResource} from '@/composables/useResource'
import PostClient from '@/application/api/resources/PostClient.ts'
import CategoryClient from '@/application/api/resources/CategoryClient.ts'
import type {Post, StorePostRequest} from '@/application/types/api/resources/Post'
import type {Category} from '@/application/types/api/resources/Category'
import {slugify} from '@/utils/slugify'

export function usePosts() {
    const apiClient = useApiClient()
    const postClient = new PostClient(apiClient)
    const categoryClient = new CategoryClient(apiClient)

    const categories = ref<Category[]>([])

    const resource = useResource<Post, StorePostRequest>({
        client: postClient,
        resourceLabel: 'post',
        resourceLabelPlural: 'posts',
        initialForm: {
            title: '',
            slug: '',
            content: '',
            category_id: null,
            is_published: false,
        },
        mapItemToForm: (item, form) => {
            form.title = item.title
            form.slug = item.slug
            form.content = item.content
            form.category_id = item.category_id
            form.is_published = item.is_published
        },
        getItemLabel: (item) => item.title,
    })

    async function fetchCategories(): Promise<void> {
        try {
            const res = await categoryClient.index() as any
            categories.value = res.data || res
        } catch {
        }
    }

    function generateSlug(): void {
        resource.form.slug = slugify(resource.form.title)
    }

    onMounted(fetchCategories)

    return {
        ...resource,
        posts: resource.items,
        categories,
        generateSlug,
    }
}