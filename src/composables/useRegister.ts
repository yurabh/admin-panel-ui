import {reactive} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/auth'

export function useRegister() {
    const router = useRouter()
    const authStore = useAuthStore()

    const credentials = reactive({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    async function handleFormSubmit(): Promise<void> {
        try {
            await authStore.register({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                password_confirmation: credentials.password_confirmation,
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