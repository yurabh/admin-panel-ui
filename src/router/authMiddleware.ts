import type {RouteLocationNormalized} from 'vue-router';
import {useAuthStore} from '@/stores/auth';

export default function guestMiddleware(to: RouteLocationNormalized) {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return {name: 'login'}
    }

    if (!to.meta.requiresAuth && authStore.isAuthenticated && to.name === 'login') {
        return {name: 'dashboard'}
    }
    return true
}
