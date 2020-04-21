<template>
    <div class>
        <ul>
            <router-link key="/" to="/">
                首页
            </router-link>
            <router-link :key="item.path" v-for="(item) in historyLink" :to="item.path" v-slot="{ href, route, navigate, isActive }">
                <li :class="[isActive && 'active']">
                    <a :href="href" @click="navigate">{{item.pathname}}</a>
                    <i class="el-icon-close" @click="updateHistoryTags('delete', {pathname: item.pathname})"></i> <!-- 删除后要显示上一个路由，即要先获取当前路由索引，删除后为空则显示首页 -->
                </li>
            </router-link>
        </ul>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation, namespace } from "vuex-class";
import * as types from "store/mutation-types";

const HistoryTagsModule = namespace("historyTags");

@Component
export default class extends Vue {
    @State("historyTags") historyTags;
    @HistoryTagsModule.Mutation("updateHistoryTags") updateHistoryTags;
}
</script>
<style lang='less' scoped>
</style>
