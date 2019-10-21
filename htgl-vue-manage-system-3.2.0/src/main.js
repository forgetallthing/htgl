import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/icon.css';
import './components/common/directives';
import "babel-polyfill";

Vue.use(ElementUI, {
    size: 'small'
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(from)
    next()
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
