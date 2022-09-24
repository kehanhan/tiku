import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home.vue';
import Huoyun from '../components/Huoyun.vue';
import Keyun from '../components/Keyun.vue';
import Zhuli from '../components/Zhuli.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home,
        }, {
            path: '/huoyun',
            component: Huoyun,
        }, {
            path: '/keyun',
            component: Keyun,
        }, {
            path: '/zhuli',
            component: Zhuli,
        }
    ]
})
export default router;
