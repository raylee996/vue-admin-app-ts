<template>
    <div class="side_container">
        <el-scrollbar style="height:100%">
            <el-menu :collapse="asideStatusHidding" :unique-opened="true">
                <nav-list :routes="routes"></nav-list>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { Routes } from "router/index";

@Component
export default class extends Vue {
    get routes() {
        return Routes.filter(item => {
            return item.meta && !item.meta.hidden
        })
    }
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
