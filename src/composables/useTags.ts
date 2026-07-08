import {useApiClient} from '@/composables/useApiClients'
import {useResource} from '@/composables/useResource'
import TagClient from '@/application/api/resources/TagClient.ts'
import type {Tag, StoreTagRequest} from '@/application/types/api/resources/Tag'
import {slugify} from '@/utils/slugify'

export function useTags() {
    const apiClient = useApiClient()
    const client = new TagClient(apiClient)

    const resource = useResource<Tag, StoreTagRequest>({
        client,
        resourceLabel: 'tag',
        resourceLabelPlural: 'tags',
        initialForm: {
            name: '',
            slug: '',
            description: null,
            is_active: true,
        },
        mapItemToForm: (item, form) => {
            form.name = item.name
            form.slug = item.slug
            form.description = item.description
            form.is_active = item.is_active
        },
        getItemLabel: (item) => item.name,
    })

    function generateSlug(): void {
        resource.form.slug = slugify(resource.form.name)
    }

    return {
        ...resource,
        tags: resource.items,
        generateSlug,
    }
}
