import { createRouter, createWebHashHistory } from "vue-router";
import Home from '@/components/Home.vue'
import Practice from '@/components/Practice.vue'
import Browse from '@/components/Browse.vue'
import Wrong from '@/components/Wrong.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Home,
        }, {
            path: '/browse/:type',
            component: Browse,
        }, {
            path: '/practice/:type',
            component: Practice,
        }, {
            path: '/wrong/:type',
            component: Wrong,
        }
    ]
})
export default router;
