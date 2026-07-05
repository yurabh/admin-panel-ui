import {reactive, computed} from 'vue'
import {useAuthStore} from '@/stores/auth'

export function useForgotPassword() {
    const authStore = useAuthStore()

    const credentials = reactive({
        email: '',
    })

    async function handleFormSubmit(): Promise<void> {
        try {
            await authStore.forgotPassword({email: credentials.email})
        } catch {
        }
    }

    return {
        credentials: credentials,
        handleFormSubmit,
        isLoading: computed(() => authStore.isLoading),
        error: computed(() => authStore.error),
    }
}
