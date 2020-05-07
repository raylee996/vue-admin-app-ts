<template>
  <div class=''>
    <ul>
      <li v-for="item in catList" :key="item.id" @click="routerPush(item.id)">
        {{item.category_name}}
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import {Vue, Component} from 'vue-property-decorator';
import {State} from "vuex-class";

@Component({
  name: "GetCategories"
})
export default class extends Vue {
  @State("userId") user_id
  catList: Array<any> = []

  created() {
    this.$http.get("/api/getCategories", {
      params: {
        user_id: this.user_id
      }
    }).then(res => {
      this.catList = res.data.list
    })
  }

  activated() {
    console.log(1)
  }

  routerPush(id) {
    this.$router.push('/goods/getCategories/'+id)
  }
}
</script>
<style lang='less' scoped>
</style>
