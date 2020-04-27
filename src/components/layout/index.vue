<template>
    <el-container>
		<el-aside class="el_side" :class="[asideStatusHidding && 'hideSidebar']">
			<side-nav :asideStatusHidding="asideStatusHidding" />
		</el-aside>
		<el-container>
			<el-header>
				<admin-header />
			</el-header>
			<el-main>
				<keep-alive :include="['index'].concat(historyTags)">
					<router-view></router-view>
				</keep-alive>
			</el-main>
		</el-container>
	</el-container>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import {Getter, namespace} from "vuex-class";
import sideNav from "./sideNav.vue";
import adminHeader from "./header.vue";
import eventBus from "utils/eventBus";

const HistoryTagsModule = namespace("historyTags");

@Component({
	components: {
		sideNav,
		adminHeader,
	}
})
export default class extends Vue {
	asideStatusHidding: boolean = false;
	@HistoryTagsModule.Getter("historyTags") historyTags;

	mounted() {
		(eventBus as any).$on("switchSidebar", status => {
			this.asideStatusHidding = status;
		})
	}
}
</script>

<style lang='less' scoped>
.el_side{
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	width: 200px;
	height: 100%;
	&.hideSidebar{
		width: 64px;
	}
}
</style>
