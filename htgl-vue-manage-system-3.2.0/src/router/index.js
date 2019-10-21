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
                path: '/equipmentStatus',
                component: resolve => require(['../components/page/equipmentStatus.vue'], resolve),
                meta: {
                    title: '设备状态'
                }
            }, {
                path: '/networkSet',
                component: resolve => require(['../components/page/networkSet.vue'], resolve),
                meta: {
                    title: '网络设置'
                }
            }, {
                path: '/modelSet',
                component: resolve => require(['../components/page/modelSet.vue'], resolve),
                meta: {
                    title: '模式设置'
                }
            }, {
                path: '/systemControl',
                component: resolve => require(['../components/page/systemControl.vue'], resolve),
                meta: {
                    title: '系统控制'
                }
            }, {
                path: '/passwordManager',
                component: resolve => require(['../components/page/passwordManager.vue'], resolve),
                meta: {
                    title: '密码管理'
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
