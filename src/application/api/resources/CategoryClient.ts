import type StandardClient from '@/application/api/StandardClient'
import {BackendEndpoint, type Category} from '@/application/types/api/resources/Category'

export default class CategoryClient {
    constructor(private readonly apiClient: StandardClient) {
    }

    index(): Promise<Category[]> {
        return this.apiClient.get<Category[]>(BackendEndpoint.Categories)
    }
}