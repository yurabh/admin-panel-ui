import {reactive} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/auth'

export function useLogin() {
    const router = useRouter()
    const authStore = useAuthStore()

    const credentials = reactive({
        email: '',
        password: '',
    })

    async function handleFormSubmit(): Promise<void> {
        try {
            await authStore.login({
                email: credentials.email,
                password: credentials.password,
            })
            await router.push({name: 'dashboard'})
        } catch {
        }
    }

    return {
        credentials,
        handleFormSubmit,
        isLoading: authStore.isLoading,
        error: authStore.error,
    }
}
