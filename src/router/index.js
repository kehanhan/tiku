import { createRouter, createWebHashHistory } from "vue-router";
import Home from '@/components/Home.vue'
import Practice from '@/components/Practice.vue'
import Browse from '@/components/Browse.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Home,
        }, {
            path: '/practice/:type',
            component: Practice,
        }, {
            path: '/browse/:type',
            component: Browse,
        }
    ]
})
export default router;
