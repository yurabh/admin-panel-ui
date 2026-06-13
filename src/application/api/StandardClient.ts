import {useStorage} from '@vueuse/core'
import type {$Fetch, FetchOptions} from 'ofetch'
import {ofetch} from 'ofetch'
import type {ClientOptions, RequestBody, RequestParams} from '@/application/types/api/config'
import {HttpMethod} from '@/application/types/api/config'
import {Store} from '@/application/types/api/resources/Auth.ts'

export default class StandardClient {
    readonly #fetch: $Fetch
    readonly #options: ClientOptions = {}

    constructor(options: ClientOptions) {
        this.#options = Object.assign({}, this.#options, options)

        const authToken = useStorage<string | undefined>(Store.AuthToken, undefined)

        this.#fetch = ofetch.create({
            headers: {
                'accept': 'application/json',
            },
            credentials: 'include',
            onRequest({options}) {
                if (authToken.value !== undefined && authToken.value !== null) {
                    options.headers = new Headers(options.headers)
                    options.headers.set('request-mode', 'browser')
                    options.headers.set('Authorization', `Bearer ${authToken.value}`)
                }
            },
            ...(this.#options as FetchOptions),
        })
    }

    post<TResponse, TBody extends RequestBody = undefined, TParams extends RequestParams = undefined,
    >(url: string, body?: TBody, params?: TParams, options?: ClientOptions
    ): Promise<TResponse> {
        return this.#fetch(url, {
            ...(options as FetchOptions), method: HttpMethod.Post, query: params,
            ...(body !== undefined ? {body: body as FetchOptions['body']} : {})
        }) as Promise<TResponse>
    }

    get<TResponse, TParams extends RequestParams = undefined>(url: string, params?: TParams, options?: ClientOptions,
    ): Promise<TResponse> {
        return this.#fetch(url, {
            ...(options as FetchOptions),
            method: HttpMethod.Get,
            query: params
        }) as Promise<TResponse>
    }

    put<TResponse, TBody extends RequestBody = undefined>(url: string, body?: TBody, options?: ClientOptions
    ): Promise<TResponse> {
        return this.#fetch(url, {
            ...(options as FetchOptions), method: HttpMethod.Put,
            ...(body !== undefined ? {body: body as FetchOptions['body']} : {})
        }) as Promise<TResponse>
    }

    patch<TResponse, TBody extends RequestBody = undefined>(url: string, body?: TBody, options?: ClientOptions
    ): Promise<TResponse> {
        return this.#fetch(url, {
            ...(options as FetchOptions), method: HttpMethod.Patch,
            ...(body !== undefined ? {body: body as FetchOptions['body']} : {})
        }) as Promise<TResponse>
    }

    delete<TResponse, TParams extends RequestParams = undefined>(url: string, params?: TParams, options?: ClientOptions,
    ): Promise<TResponse> {
        return this.#fetch(url, {
            ...(options as FetchOptions), method: HttpMethod.Delete, query: params
        }) as Promise<TResponse>
    }
}
