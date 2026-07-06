import {useApiClient} from '@/composables/useApiClients'
import {useResource} from '@/composables/useResource'
import UserClient from '@/application/api/resources/UserClient.ts'
import type {User, StoreUserRequest} from '@/application/types/api/resources/User'

export function useUsers() {
    const apiClient = useApiClient()
    const client = new UserClient(apiClient)

    const resource = useResource<User, StoreUserRequest>({
        client,
        resourceLabel: 'user',
        resourceLabelPlural: 'users',
        initialForm: {
            name: '',
            email: '',
            role: 'user',
            password: '',
            password_confirmation: '',
        },
        mapItemToForm: (item, form) => {
            form.name = item.name
            form.email = item.email
            form.role = item.role
            form.password = ''
            form.password_confirmation = ''
        },
        getItemLabel: (item) => item.name,
    })

    return {
        ...resource,
        users: resource.items,
    }
}