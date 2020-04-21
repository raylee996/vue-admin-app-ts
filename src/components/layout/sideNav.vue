<template>
    <div class="side_container">
        <el-scrollbar style="height:100%" v-show="!asideStatusHidding">
            
        </el-scrollbar>
        <el-scrollbar style="height:100%" v-show="asideStatusHidding"></el-scrollbar>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
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
</style>
