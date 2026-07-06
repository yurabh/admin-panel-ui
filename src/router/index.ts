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
            path: '/register',
            component: () => import('@/layouts/AuthLayout.vue'),
            meta: {requiresAuth: false},
            children: [
                {
                    path: '',
                    name: 'register',
                    component: () => import('@/pages/auth/RegisterPage.vue'),
                },
            ],
        },
        {
            path: '/forgot-password',
            component: () => import('@/layouts/AuthLayout.vue'),
            meta: {requiresAuth: false},
            children: [
                {
                    path: '',
                    name: 'forgot-password',
                    component: () => import('@/pages/auth/ForgotPasswordPage.vue'),
                },
            ],
        },
        {
            path: '/reset-password',
            component: () => import('@/layouts/AuthLayout.vue'),
            meta: {requiresAuth: false},
            children: [
                {
                    path: '',
                    name: 'reset-password',
                    component: () => import('@/pages/auth/ResetPasswordPage.vue'),
                },
            ],
        },
        {
            path: '/',
            component: () => import('@/layouts/DashboardLayout.vue'),
            meta: {requiresAuth: true},
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: () => import('@/pages/DashboardPage.vue'),
                },
                {
                    path: 'posts',
                    name: 'posts',
                    component: () => import('@/pages/posts/PostsPage.vue'),
                },
                {
                    path: 'categories',
                    name: 'categories',
                    component: () => import('@/pages/categories/CategoriesPage.vue'),
                },
                {
                    path: 'users',
                    name: 'users',
                    component: () => import('@/pages/users/UsersPage.vue'),
                }
            ]
        }
    ]
})

router.beforeEach(authMiddleware)

export default router
