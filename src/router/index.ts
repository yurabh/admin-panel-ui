import {createRouter, createWebHistory} from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import authMiddleware from './authMiddleware'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginPage,
            meta: {requiresAuth: false}
        },
        {
            path: '/forgot-password',
            name: 'forgot-password',
            component: LoginPage
        }
    ]
})

router.beforeEach(authMiddleware)

export default router
