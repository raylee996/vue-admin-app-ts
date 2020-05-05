<template>
    <div class="historyTags">
        <el-scrollbar style="height: 100%;">
            <ul>
                <router-link key="/" to="/" v-slot="{ href, route, navigate, isActive }">
                    <li :class="[isActive && 'active']">
                        <a :href="href" @click="navigate">首页</a>
                    </li>
                </router-link>
                <router-link :key="item.path" v-for="(item, index) in historyTags" :to="item.path" v-slot="{ href, route, navigate, isActive }">
                    <li :class="[isActive && 'active']" @contextmenu="showContextMenu(item)">
                        <a :href="href" @click="navigate">{{item.pathname}}</a>
                        <i class="el-icon-close" @click="switchRoute(index, {type: 'delete', historyTags: {pathname: item.pathname}})"></i> 
                    </li>
                </router-link>
            </ul>
        </el-scrollbar>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import * as types from "store/mutation-types";
import ContextMenu from "components/contextMenu";

const HistoryTagsModule = namespace("historyTags");

@Component
export default class extends Vue {
    @HistoryTagsModule.State("historyTags") historyTags;
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

    private showContextMenu(item) {
        const CM = ContextMenu.service(
            [
                {
                    name: "刷新",
                    callback: () => {
                        this.$router.replace(item.path);
                    }
                },{
                    name: "关闭",
                    callback: () => {
                        let index = this.historyTags.findIndex(tag => tag.pathname == item.pathname);
                        this.switchRoute(index, {type: 'delete', historyTags: {pathname: item.pathname}});
                    }
                },{
                    name: "关闭其他",
                    callback: () => {
                        this.updateHistoryTags({type: 'deleteOthers', historyTags: {pathname: item.pathname}});
                    }
                },{
                    name: "关闭全部",
                    callback: () => {
                        this.updateHistoryTags({type: 'deleteAll'});
                        this.$router.replace("/");
                    }
                }
            ]
        ) 
        return false
    }
}
</script>
<style lang='less' scoped>
.historyTags{
    width: 100%;
    height: 30px;
    padding: 5px;
    box-sizing: border-box;
    .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view{
        white-space: nowrap;
    }
    ul li{
        display: inline-block;
        height: 20px;
        line-height: 20px;
        padding: 0 5px;
        margin-right: 5px;
        border: 1px solid #666;
        color: #666;
        text-align: center;
        font-size: 12px;
        box-sizing: border-box;
        transition: .4s;
        .active{
            background: lightgreen;
            color: #fff;
        }
    }
}
</style>
