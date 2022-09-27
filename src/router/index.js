import { createRouter, createWebHashHistory } from "vue-router";
import Home from '@/components/Home.vue'
import Practice from '@/components/Practice.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Home,
        }, {
            path: '/practice/:type',
            component: Practice,
        }
    ]
})
export default router;
