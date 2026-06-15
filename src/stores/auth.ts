import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {useStorage} from '@vueuse/core'

import {type RegisterRequest, Store} from '@/application/types/api/resources/Auth.ts'
import type {LoginRequest, LoginResponse} from '@/application/types/api/resources/Auth.ts'
import {useApiClient} from "@/composables/useApiClients.ts";
import Auth from "@/application/api/resources/Auth.ts";

export const useAuthStore = defineStore('auth', () => {
    const apiClient = useApiClient()
    const authClient = new Auth(apiClient)

    const authToken = useStorage<string | undefined>(Store.AuthToken, undefined)
    const user = useStorage<LoginResponse['user'] | null>('user', null)
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)
    const isAuthenticated = computed<boolean>(() => !!authToken.value)

    async function login(credentials: LoginRequest): Promise<void> {
        isLoading.value = true
        error.value = null
        try {
            const data = await authClient.login(credentials)
            authToken.value = data.access_token
            user.value = data.user
        } catch (err: any) {
            error.value = err.data?.message || err.message || 'Auth filed'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    async function register(credentials: RegisterRequest): Promise<void> {
        isLoading.value = true
        error.value = null
        try {
            const data = await authClient.register(credentials)
            authToken.value = data.access_token
            user.value = data.user
        } catch (err: any) {
            error.value = err.data?.message || err.message || 'Registration failed'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    function logout(): void {
        authToken.value = undefined
        user.value = null
    }

    return {token: authToken, user, isLoading, error, isAuthenticated, login, logout, register}
})