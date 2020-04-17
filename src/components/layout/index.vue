<template>
    <el-container>
		<el-aside width="250px">
			<side-nav />
		</el-aside>
		<el-container>
			<el-header>
				<admin-header />
			</el-header>
			<el-main>
				<admin-content />
			</el-main>
		</el-container>
	</el-container>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import sideNav from "./sideNav.vue";
import adminHeader from "./header.vue";
import adminContent from "./content.vue";

@Component({
	components: {
		sideNav,
		adminHeader,
		adminContent
	}
})
export default class extends Vue {}
</script>

<style lang='less' scoped>
</style>
