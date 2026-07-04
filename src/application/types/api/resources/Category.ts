export interface Category {
    id: number
    name: string
    slug: string
}

export enum BackendEndpoint {
    Categories = '/api/admin/categories',
}

export interface CategoryRequest {
    name: string
    slug: string
}