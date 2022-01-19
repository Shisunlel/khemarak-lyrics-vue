import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router'

import App from "./App.vue";
import apolloProvider from "../apollo.provider";

import Home from './pages/Home'
import TheSidebar from "./pages/TheSidebar";
import NewRequest from "./components/NewRequest"

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
        }
    ],
})

const app = createApp(App);
app.component('sidebar', TheSidebar)
app.use(router);
app.use(apolloProvider);
app.mount("#app");
