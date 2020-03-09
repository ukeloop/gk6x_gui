import Vue from 'vue';
import Router from 'vue-router';

import Index from '../pages/index';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/gk6x_gui/',
            name: 'index',
            component: Index,
        },
    ]
})