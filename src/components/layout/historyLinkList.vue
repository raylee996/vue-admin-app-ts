<template>
    <div class></div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import * as types from "store/mutation-types";

@Component
export default class extends Vue {
    @State("historyLink") historyLink
    @Mutation(types.UPDATE_HISTORY_LINK) updateHistoryLink
}
</script>
<style lang='less' scoped>
</style>
