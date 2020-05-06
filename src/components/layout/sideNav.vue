<template>
    <div class="side_container">
        <el-scrollbar style="height:100%">
            <nav-list :routes="routes" :asideStatusHidding="asideStatusHidding"></nav-list>
        </el-scrollbar>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import { Routes } from "router/index";
import NavList from "router/navList.vue";

@Component({
    components: {
        NavList
    }
})
export default class extends Vue {
    get routes() {
        return Routes.filter(item => {
            return item.meta && !item.meta.hidden
        })
    }
    @Prop({ type: Boolean, default: false }) readonly asideStatusHidding: boolean | undefined;
}
</script>
<style lang='less'>
.side_container {
    height: 100%;
    .el-scrollbar__wrap {
        overflow-x: hidden;
        .el-scrollbar__view{
            height: 100%;
        }
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
    }
    .el-menu--collapse {
        width: 64px;
    }
}
</style>
