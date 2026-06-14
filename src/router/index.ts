import {createRouter, createWebHistory} from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import authMiddleware from './authMiddleware'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            component: () => import('@/layouts/AuthLayout.vue'),
            meta: {requiresAuth: false},
            children: [
                {
                    path: '',
                    name: 'login',
                    component: () => import('@/pages/auth/LoginPage.vue'),
                },
            ],
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
