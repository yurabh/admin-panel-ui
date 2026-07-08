export interface Tag {
    id: number
    name: string
    slug: string
    description: string | null
    is_active: boolean
    created_at?: string
    updated_at?: string
}

export enum BackendEndpoint {
    Tags = '/api/admin/tags',
    Tag = '/api/admin/tags',
}

export interface StoreTagRequest {
    name: string
    slug: string
    description: string | null
    is_active: boolean
}

export type UpdateTagRequest = StoreTagRequest
