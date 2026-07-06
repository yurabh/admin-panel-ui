import type StandardClient from '@/application/api/StandardClient'
import {
    BackendEndpoint,
    type Category,
    type StoreCategoryRequest,
    type UpdateCategoryRequest
} from '@/application/types/api/resources/Category'

export default class CategoryClient {
    constructor(private readonly apiClient: StandardClient) {
    }

    index(): Promise<Category[]> {
        return this.apiClient.get<Category[]>(BackendEndpoint.Categories)
    }

    store(data: StoreCategoryRequest): Promise<Category> {
        return this.apiClient.post<Category, StoreCategoryRequest>(BackendEndpoint.Category, data)
    }

    update(id: number, data: UpdateCategoryRequest): Promise<Category> {
        return this.apiClient.put<Category, UpdateCategoryRequest>(`/api/admin/categories/${id}`, data)
    }

    destroy(id: number): Promise<void> {
        return this.apiClient.delete<void>(`/api/admin/categories/${id}`)
    }
}