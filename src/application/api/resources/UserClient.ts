import type StandardClient from '@/application/api/StandardClient'
import {
    BackendEndpoint,
    type User,
    type StoreUserRequest,
    type UpdateUserRequest,
} from '@/application/types/api/resources/User'

export default class UserClient {
    constructor(private readonly apiClient: StandardClient) {
    }

    index(): Promise<User[]> {
        return this.apiClient.get<User[]>(BackendEndpoint.Users)
    }

    store(data: StoreUserRequest): Promise<User> {
        return this.apiClient.post<User, StoreUserRequest>(BackendEndpoint.User, data)
    }

    update(id: number, data: UpdateUserRequest): Promise<User> {
        return this.apiClient.put<User, UpdateUserRequest>(`/api/admin/users/${id}`, data)
    }

    destroy(id: number): Promise<void> {
        return this.apiClient.delete<void>(`/api/admin/users/${id}`)
    }
}