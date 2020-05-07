<template>
    <div class="header">
        <div class="header_main">
            <i class="fold_btn" :class="[asideStatusHidding ? 'el-icon-s-unfold' : 'el-icon-s-fold']" @click="switchSidebar($event)"></i> 
            <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">
                    首页
                </el-breadcrumb-item>
                <template v-if="$route.matched.length && $route.matched[0].meta.title != '首页'">
                    <el-breadcrumb-item v-for="item in $route.matched.slice(0, $route.matched.length-1)" :key="item.path" :to="item.path">
                        {{item.meta.title}}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>
                        {{$route.matched[$route.matched.length-1].meta.title}}
                    </el-breadcrumb-item>
                </template>
            </el-breadcrumb>
            <el-dropdown class="profile">
                <div class="el-dropdown-link">
                    <el-avatar :src="avatar" icon="el-icon-user-solid"></el-avatar>
                    {{nickname}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <router-link to="/profile/my">个人中心</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item @click="logout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <history-tags></history-tags>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import HistoryTags from "./historyTags.vue";
import eventBus from "utils/eventBus";
import {namespace} from "vuex-class";

const UserModule = namespace("user");

@Component({
    components: {
        HistoryTags
    },
})
export default class extends Vue {
    // routes: Array<any> = this.$route.matched;
    asideStatusHidding: boolean = false;
    @UserModule.State("avatar") avatar;
    @UserModule.State("nickname") nickname;
    
    switchSidebar(event) {
        this.asideStatusHidding = !this.asideStatusHidding;
        (eventBus as any).$emit("switchSidebar", this.asideStatusHidding);
    }
    logout() {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        localStorage.removeItem("remember");
        window.location.reload();
    }
}
</script>
<style lang='less' scoped>
.header{
    .header_main{
        height: 50px;
        position: relative;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
        .fold_btn{
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        .breadcrumb{
            position: absolute;
            left: 50px;
            top: 50%;
            transform: translateY(-50%);
        }
        .profile{
            position: absolute;
            right: 80px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
</style>
