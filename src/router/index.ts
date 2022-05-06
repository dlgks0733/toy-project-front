import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import Layout from '@/components/Layout/Layout.vue'

const Login = () => import('@/views/login/Login.vue')
const Dashboard = () => import('@/views/dashboard/Dashboard.vue')
const Admin = () => import('@/views/admin/Admin.vue')

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        redirect: 'login',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: 'admin',
                name: 'Admin',
                component: Admin
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
