<template>
  <div class=''>
    <router-link :to="'/goods/getCategories/'+$route.params.id+'/addProducts'">添加商品</router-link>
  </div>
</template>

<script lang='ts'>
import {Vue, Component} from 'vue-property-decorator';

@Component({
  name: "GetProductList"
})
export default class extends Vue {
}
</script>
<style lang='less' scoped>
</style>

