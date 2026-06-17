export enum Store {
    AuthToken = 'auth_token_key'
}

export enum BackendEndpoint {
    Login = '/api/login',
    Registration = '/api/register',
    ForgotPassword = '/api/forgot/password',
    ResetPassword = '/api/password/reset',
}

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    access_token: string
    token_type: string
    user: {
        id: number
        name: string
        email: string
        role: string
    }
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
    password_confirmation: string
    role?: string | null
}

export interface ForgotPasswordRequest {
    email: string
}

export interface ResetPasswordRequest {
    token: string
    email: string
    password: string
    password_confirmation: string
}