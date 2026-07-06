import {useApiClient} from '@/composables/useApiClients'
import {useResource} from '@/composables/useResource'
import CategoryClient from '@/application/api/resources/CategoryClient.ts'
import type {Category, StoreCategoryRequest} from '@/application/types/api/resources/Category'
import {slugify} from '@/utils/slugify'

export function useCategories() {
    const apiClient = useApiClient()
    const client = new CategoryClient(apiClient)

    const resource = useResource<Category, StoreCategoryRequest>({
        client,
        resourceLabel: 'category',
        resourceLabelPlural: 'categories',
        initialForm: {
            name: '',
            slug: '',
        },
        mapItemToForm: (item, form) => {
            form.name = item.name
            form.slug = item.slug
        },
        getItemLabel: (item) => item.name,
    })

    function generateSlug(): void {
        resource.form.slug = slugify(resource.form.name)
    }

    return {
        ...resource,
        categories: resource.items,
        generateSlug,
    }
}