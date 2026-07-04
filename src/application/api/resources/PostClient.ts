import type StandardClient from '@/application/api/StandardClient'
import {
    BackendEndpoint,
    type Post,
    type StorePostRequest,
    type UpdatePostRequest
} from '@/application/types/api/resources/Post'

export default class PostClient {
    constructor(private readonly apiClient: StandardClient) {
    }

    index(): Promise<Post[]> {
        return this.apiClient.get<Post[]>(BackendEndpoint.Posts)
    }

    store(data: StorePostRequest): Promise<Post> {
        return this.apiClient.post<Post, StorePostRequest>(BackendEndpoint.Post, data)
    }

    update(id: number, data: UpdatePostRequest): Promise<Post> {
        return this.apiClient.put<Post, UpdatePostRequest>(`/api/admin/posts/${id}`, data)
    }

    destroy(id: number): Promise<void> {
        return this.apiClient.delete<void>(`/api/admin/posts/${id}`)
    }
}