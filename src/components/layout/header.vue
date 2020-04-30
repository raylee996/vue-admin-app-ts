<template>
    <div class="header">
        <div class="header_main">
            <i :class="[asideStatusHidding ? 'el-icon-s-unfold' : 'el-icon-s-fold']" @click="switchSidebar"></i> 
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">
                    首页
                </el-breadcrumb-item>
                <template v-if="routes.length && routes[0].meta.title != '首页'">
                    <el-breadcrumb-item v-for="item in routes.slice(0, routes.length-1)" :key="item.path" :to="item.path">
                        {{item.meta.title}}
                    </el-breadcrumb-item>
                    <el-breadcrumb-item :to="routes[routes.length-1].path">
                        {{routes[routes.length-1].meta.title}}
                    </el-breadcrumb-item>
                </template>
            </el-breadcrumb>
        </div>
        <history-tags></history-tags>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import HistoryTags from "./historyTags.vue";
import eventBus from "utils/eventBus";

@Component({
    components: {
        HistoryTags
    }
})
export default class extends Vue {
    routes: Array<any> = this.$route.matched;
    asideStatusHidding: boolean = false;
    
    switchSidebar(event) {
        (eventBus as any).$emit("switchSidebar", !this.asideStatusHidding);
    }
}
</script>
<style lang='less' scoped>
</style>
