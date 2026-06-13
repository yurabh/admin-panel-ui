import type StandardClient from "@/application/api/StandardClient.ts";
import {BackendEndpoint, type LoginRequest, type LoginResponse} from "@/application/types/api/resources/Auth.ts";

export default class Auth {
    constructor(private readonly apiClient: StandardClient) {
    }

    login(credentials: LoginRequest): Promise<LoginResponse> {
        return this.apiClient.post<LoginResponse, LoginRequest>(BackendEndpoint.Login, credentials)
    }
}