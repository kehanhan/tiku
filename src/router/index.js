import { createRouter, createWebHashHistory } from "vue-router";
import Home from '../components/Home.vue';
import Huoyun_browse from '../components/browse/Huoyun.vue';
import Keyun_browse from '../components/browse/Keyun.vue';
import Zhuli_browse from '../components/browse/Zhuli.vue';
import Huoyun from '../components/practice/Huoyun.vue';
import Keyun from '../components/practice/Keyun.vue';
import Zhuli from '../components/practice/Zhuli.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Home,
        }, {
            path: '/huoyun',
            component: Huoyun,
            children: [
                {
                    path: 'browse',
                    component: Huoyun_browse,
                }
            ]
        }, {
            path: '/keyun',
            component: Keyun,
            children: [
                {
                    path: 'browse',
                    component: Keyun_browse,
                }
            ]
        }, {
            path: '/zhuli',
            component: Zhuli,
            children: [
                {
                    path: 'browse',
                    component: Zhuli_browse,
                }
            ]
        }
    ]
})
export default router;
