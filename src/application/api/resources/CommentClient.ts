import type StandardClient from '@/application/api/StandardClient'
import {
    BackendEndpoint,
    type Comment,
    type StoreCommentRequest,
    type UpdateCommentRequest,
} from '@/application/types/api/resources/Comment'

export default class CommentClient {
    constructor(private readonly apiClient: StandardClient) {
    }

    index(): Promise<Comment[]> {
        return this.apiClient.get<Comment[]>(BackendEndpoint.Comments)
    }

    store(data: StoreCommentRequest): Promise<Comment> {
        return this.apiClient.post<Comment, StoreCommentRequest>(BackendEndpoint.Comment, data)
    }

    update(id: number, data: UpdateCommentRequest): Promise<Comment> {
        return this.apiClient.put<Comment, UpdateCommentRequest>(`/api/admin/comments/${id}`, data)
    }

    destroy(id: number): Promise<void> {
        return this.apiClient.delete<void>(`/api/admin/comments/${id}`)
    }
}