<template>
    <div class="index">
        <div class="form">
            
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class extends Vue {

}
</script>

<style lang="less" scoped>
.index {
    width: 100%;
    height: 100%;
    background-image: url(./bg.jpg);
    background-size: cover;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

