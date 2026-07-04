export interface Category {
    id: number
    name: string
    slug: string
}

export enum BackendEndpoint {
    Posts = '/api/admin/posts',
    Post = '/api/admin/posts',
}

export interface PostUser {
    id: number
    name: string
    email: string
}

export interface Post {
    id: number
    user_id: number
    category_id: number | null
    title: string
    slug: string
    content: string
    is_published: boolean
    published_at: string | null
    created_at: string
    updated_at: string
    category?: Category | null
    user?: PostUser
}

export interface StorePostRequest {
    title: string
    slug: string
    content: string
    category_id?: number | null
    is_published?: boolean
    published_at?: string | null
}

export type UpdatePostRequest = StorePostRequest