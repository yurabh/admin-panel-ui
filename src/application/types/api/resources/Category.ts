export interface Category {
    id: number
    name: string
    slug: string
    created_at?: string
    updated_at?: string
}

export enum BackendEndpoint {
    Categories = '/api/admin/categories',
    Category = '/api/admin/categories',
}

export interface StoreCategoryRequest {
    name: string
    slug: string
}

export type UpdateCategoryRequest = StoreCategoryRequest