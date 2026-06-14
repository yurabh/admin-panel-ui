import {createRouter, createWebHistory} from 'vue-router'
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
            component: () => import('@/pages/auth/LoginPage.vue'),
            meta: {requiresAuth: false},
        },
    ]
})

router.beforeEach(authMiddleware)

export default router
