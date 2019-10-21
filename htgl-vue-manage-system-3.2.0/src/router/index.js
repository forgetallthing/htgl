import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {
                title: '首页',
            },
            children: [{
                path: '/htList',
                component: resolve => require(['../components/page/htList.vue'], resolve),
                meta: {
                    title: '合同管理'
                }
            }, {
                path: '/userManager',
                component: resolve => require(['../components/page/userManager.vue'], resolve),
                meta: {
                    title: '用户管理'
                }
            }, {
                path: '/passwordManager',
                component: resolve => require(['../components/page/passwordManager.vue'], resolve),
                meta: {
                    title: '密码管理'
                }
            }, {
                path: '/edit',
                component: resolve => require(['../components/page/edit.vue'], resolve),
                meta: {
                    title: '编辑'
                }
            }]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
