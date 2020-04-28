<template>
    <div class="side_container">
        <el-scrollbar style="height:100%">
            <el-menu :collapse="asideStatusHidding" :unique-opened="true">
                <el-menu-item index="1">
                    <i class="el-icon-s-home"></i>
                    <router-link slot="title" to="/">首页</router-link>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-s-goods"></i>
                        <span slot="title">商品管理</span>
                    </template>
                    <el-menu-item>
                        <router-link to="/goods/addCategories">创建分类</router-link>
                    </el-menu-item>
                    <el-menu-item>
                        <router-link to="/goods/getCategories">分类列表</router-link>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span slot="title">文章管理</span>
                    </template>
                    <el-menu-item>
                        <router-link to="/addArticles">创建文章</router-link>
                    </el-menu-item>
                    <el-menu-item>
                        <router-link to="/getArticles">文章列表</router-link>
                    </el-menu-item>
                </el-submenu>

                <template v-for="(item, index) in routes">
                    <template v-if="item.meta && !item.meta.hidden">
                        <el-menu-item :index="index" :key="index" v-if="item.children.length <= 1">
                            <i :class="'el-icon'+item.icon"></i>
                            <router-link slot="title" :to="item.path">{{item.meta.title}}</router-link>
                        </el-menu-item>
                        <el-submenu :index="index" :key="index" v-else>

                        </el-submenu>
                    </template>
                </template>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { Routes } from "router/index";

@Component
export default class extends Vue {
    routes = Routes;
    @Prop({ type: Boolean, default: false }) readonly asideStatusHidding: boolean | undefined;
}
</script>
<style lang='less' scoped>
.el-scrollbar__wrap {
    overflow-x: hidden;
}
.side_container {
    height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
.el-menu--collapse {
    width: 64px;
}
</style>
