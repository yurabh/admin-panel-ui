export interface User {
    id: number
    name: string
    email: string
    role: string
    created_at?: string
    updated_at?: string
}

export enum BackendEndpoint {
    Users = '/api/admin/users',
    User = '/api/admin/users',
}

export interface StoreUserRequest {
    name: string
    email: string
    role: string
    password?: string
    password_confirmation?: string
}

export type UpdateUserRequest = StoreUserRequest

export const USER_ROLES = ['admin', 'user'] as const
export type UserRole = typeof USER_ROLES[number]