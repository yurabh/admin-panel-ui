import type StandardClient from '@/application/api/StandardClient'
import {
    BackendEndpoint,
    type Tag,
    type StoreTagRequest,
    type UpdateTagRequest
} from '@/application/types/api/resources/Tag'

export default class TagClient {
    constructor(private readonly apiClient: StandardClient) {
    }

    index(): Promise<Tag[]> {
        return this.apiClient.get<Tag[]>(BackendEndpoint.Tags)
    }

    store(data: StoreTagRequest): Promise<Tag> {
        return this.apiClient.post<Tag, StoreTagRequest>(BackendEndpoint.Tag, data)
    }

    update(id: number, data: UpdateTagRequest): Promise<Tag> {
        return this.apiClient.put<Tag, UpdateTagRequest>(`/api/admin/tags/${id}`, data)
    }

    destroy(id: number): Promise<void> {
        return this.apiClient.delete<void>(`/api/admin/tags/${id}`)
    }
}
