<template>
    <div class="header">
        <div class="header_main">
            <i :class="[asideStatusHidding ? 'el-icon-s-unfold' : 'el-icon-s-fold']" @click="switchSidebar"></i> 
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item to="/">
                    首页
                </el-breadcrumb-item>
                
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
    asideStatusHidding: boolean = false;
    
    switchSidebar(event) {
        (eventBus as any).$emit("switchSidebar", !this.asideStatusHidding);
    }
}
</script>
<style lang='less' scoped>
</style>
