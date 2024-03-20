import { createRouter, createWebHashHistory } from "vue-router";

// 定义路由规则 define routes 
const routes = [
    {
        path: "/",
        component: () => import("../views/Main.vue"),
        children: [ // 嵌套路由 nested routes
            {
                path: '/',
                name: 'home',
                component: () => import('../views/home/Home.vue')
            }
        ]
    },
];

// 创建路由实例 create router instance
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;