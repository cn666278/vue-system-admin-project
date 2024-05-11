import { createRouter, createWebHashHistory } from "vue-router";

// 定义路由规则 define routes 
const routes = [
    {
        path: "/",
        component: () => import("../views/Main.vue"),
        name: 'home1',
        redirect: '/home', // 重定向 redirect  
        // why we need to redirect?
        // 1. when the user visits the root URL, we want to redirect them to the home page
        // 2. when the user visits a URL that doesn't exist, we want to redirect them to the home page
        
        // children: [ // 嵌套路由 nested routes
        //     {
        //         path: '/home',
        //         name: 'home',
        //         component: () => import('../views/home/Home.vue')
        //     },
        //     {
        //         path: '/user',
        //         name: 'user',
        //         component: () => import('../views/user/User.vue')
        //     },
        //     {
        //         path: '/page1',
        //         name: 'page1',
        //         component: () => import('../views/Page1.vue')
        //     },
        //     {
        //         path: '/page2',
        //         name: 'page2',
        //         component: () => import('../views/Page2.vue')
        //     },
        // ],
        // 动态路由 dynamic routes
        children: [],
    },
    {
        path: '/login',
        component: () => import('../views/login/Login.vue')
    }
];

// 创建路由实例 create router instance
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;