export enum Store {
    AuthToken = 'auth_token_key'
}

export enum BackendEndpoint {
    Login = '/api/login',
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
