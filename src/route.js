import { createRouter, createWebHistory } from 'vue-router'

import Home from './layouts/Home'
import NewRequest from "./pages/NewRequest"
import Song from './pages/Song'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/request',
            name: 'request',
            component: NewRequest
        },
        {
            path: '/song/:title',
            name: 'song',
            component: Song,
            props: true
        }
    ],
})

export default router