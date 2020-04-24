<template>
    <div class>
        <ul>
            <router-link key="/" to="/">
                首页
            </router-link>
            <router-link :key="item.path" v-for="(item, index) in historyTags" :to="item.path" v-slot="{ href, route, navigate, isActive }">
                <li :class="[isActive && 'active']">
                    <a :href="href" @click="navigate">{{item.pathname}}</a>
                    <i class="el-icon-close" @click="switchRoute(index, {type: 'delete', historyTags: {pathname: item.pathname}})"></i> 
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

    private switchRoute(index, modulePayload) {
        if(this.historyTags.length <= 1) {
            this.$router.replace("/");
        }else {
            if(index == 0) {
                this.$router.replace(this.historyTags[1].path);
            }else {
                this.$router.replace(this.historyTags[index-1].path);
            }
        }
        this.updateHistoryTags(modulePayload);
    }
}
</script>
<style lang='less' scoped>
</style>
