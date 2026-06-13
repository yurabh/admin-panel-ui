import type {FetchOptions} from 'ofetch'

export type ClientOptions = FetchOptions

export type RequestBody = Record<string, any> | string | unknown | undefined
export type RequestParams = Record<string, any> | undefined

export enum HttpMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE'
}

export enum HttpResponseCode {
    Unauthorized = 401,
    UnprocessableContent = 422,
    InternalServerError = 500,
}

export enum RequestState {
    Pending = 'pending',
    Fulfilled = 'fulfilled',
    Failed = 'failed',
}