<template>
    <div class></div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import eventBus from "utils/eventBus";

@Component
export default class extends Vue {
    asideStatusHidding: boolean = false;
    
    switchSidebar(event) {
        (eventBus as any).$emit("switchSidebar", !this.asideStatusHidding);
    }
}
</script>
<style lang='less' scoped>
</style>
