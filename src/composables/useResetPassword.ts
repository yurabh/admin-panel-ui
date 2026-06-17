import {reactive} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useAuthStore} from '@/stores/auth'

export function useResetPassword() {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()

    const credentials = reactive({
        token: route.query.token as string || '',
        email: route.query.email as string || '',
        password: '',
        password_confirmation: '',
    })

    async function handleFormSubmit(): Promise<void> {
        try {
            await authStore.resetPassword({
                token: credentials.token,
                email: credentials.email,
                password: credentials.password,
                password_confirmation: credentials.password_confirmation,
            })
            await router.push({name: 'login'})
        } catch {
        }
    }

    return {
        credentials: credentials,
        handleFormSubmit,
        isLoading: authStore.isLoading,
        error: authStore.error,
    }
}