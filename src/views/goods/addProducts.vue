<template>
  <div class=''>{{$route.params.id}}</div>
</template>

<script lang='ts'>
import {Vue, Component} from 'vue-property-decorator';

@Component({
  name: "AddProducts"
})
export default class extends Vue {
}
</script>
<style lang='less' scoped>
</style>

