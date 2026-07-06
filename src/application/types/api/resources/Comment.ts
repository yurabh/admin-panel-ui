export interface CommentUser {
    id: number
    name: string
    email: string
}

export interface CommentPost {
    id: number
    title: string
}

export interface Comment {
    id: number
    user_id: number
    post_id: number
    content: string
    created_at: string
    updated_at: string
    user?: CommentUser
    post?: CommentPost
}

export enum BackendEndpoint {
    Comments = '/api/admin/comments',
    Comment = '/api/admin/comments',
}

export interface StoreCommentRequest {
    post_id: number | null
    content: string
}

export type UpdateCommentRequest = StoreCommentRequest