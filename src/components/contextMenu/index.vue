<template>
  <div class="custom_context_menu">
    <ul>
      <li v-for="item in menuList" :key="item.name" @click="item.callback(cbOptions)">{{item.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import {contextType} from "./types";

@Component({
	name: "CustomContextMenu"
})
export default class extends Vue {
	data() {
		return {
			menuList: <Array<contextType>>[],
			cbOptions: {}
		}
	}
}
</script>

<style lang="less">
.custom_context_menu{
	max-width: 250px;
	display: inline-block;
	border-radius: 5px;
	box-shadow: 2px 2px 2px rgba(0, 0, 0, .2);
	background: #fff;
	ul li{
		height: 25px;
		line-height: 25px;
		font-size: 14px;
		color: #666;
		transition: .4s;
		text-align: center;
		&:hover{
			background: #ddd;
		}
	}
}
</style>
