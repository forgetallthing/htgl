<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{
                                    threeItem.title
                                }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
            <!-- <span v-show="!collapse" class="tag-company"><a href="" target="_blank">合同管理系统</a></span> -->
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'htList',
                    title: '合同管理'
                },
                {
                    icon: 'el-icon-lx-profile',
                    index: 'passwordManager',
                    title: '密码管理'
                }
            ]
        };
    },
    mounted() {
        let role = localStorage.getItem('ms_role');
        if (role === 'admin') {
            this.items.splice(1, 0, {
                icon: 'el-icon-lx-calendar',
                index: 'userManager',
                title: '用户管理'
            });
        }
        console.log(role);
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 180px;
}
.sidebar > ul {
    height: 100%;
}
.tag-company {
    color: rgb(191, 203, 217);
    display: inline-block;
    text-align: center;
    width: 100%;
    height: 10px;
    overflow: hidden;
    padding: 10%;
    box-sizing: border-box;
    font-size: 10px;
}

a {
    color: rgb(191, 203, 217);
}
</style>
