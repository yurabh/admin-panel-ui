import {onMounted, ref} from 'vue'
import {useApiClient} from '@/composables/useApiClients'
import {useResource} from '@/composables/useResource'
import CommentClient from '@/application/api/resources/CommentClient.ts'
import PostClient from '@/application/api/resources/PostClient.ts'
import type {Comment, StoreCommentRequest} from '@/application/types/api/resources/Comment'
import type {Post} from '@/application/types/api/resources/Post'

export function useComments() {
    const apiClient = useApiClient()
    const commentClient = new CommentClient(apiClient)
    const postClient = new PostClient(apiClient)

    const posts = ref<Post[]>([])

    const resource = useResource<Comment, StoreCommentRequest>({
        client: commentClient,
        resourceLabel: 'comment',
        resourceLabelPlural: 'comments',
        initialForm: {
            post_id: null,
            content: '',
        },
        mapItemToForm: (item, form) => {
            form.post_id = item.post_id
            form.content = item.content
        },
        getItemLabel: (item) => `#${item.id}`,
    })

    async function fetchPosts(): Promise<void> {
        try {
            const res = await postClient.index() as any
            posts.value = res.data || res
        } catch {
        }
    }

    onMounted(fetchPosts)

    return {
        ...resource,
        comments: resource.items,
        posts,
    }
}