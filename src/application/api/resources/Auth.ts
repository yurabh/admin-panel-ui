import type StandardClient from "@/application/api/StandardClient.ts";
import {
    BackendEndpoint, type ForgotPasswordRequest,
    type LoginRequest,
    type LoginResponse,
    type RegisterRequest, type ResetPasswordRequest
} from "@/application/types/api/resources/Auth.ts";

export default class Auth {
    constructor(private readonly apiClient: StandardClient) {
    }

    login(credentials: LoginRequest): Promise<LoginResponse> {
        return this.apiClient.post<LoginResponse, LoginRequest>(BackendEndpoint.Login, credentials)
    }

    register(credentials: RegisterRequest): Promise<LoginResponse> {
        return this.apiClient.post<LoginResponse, RegisterRequest>(BackendEndpoint.Registration, credentials)
    }

    forgotPassword(credentials: ForgotPasswordRequest): Promise<void> {
        return this.apiClient.post(BackendEndpoint.ForgotPassword, credentials)
    }

    resetPassword(credentials: ResetPasswordRequest): Promise<void> {
        return this.apiClient.post(BackendEndpoint.ResetPassword, credentials)
    }
}