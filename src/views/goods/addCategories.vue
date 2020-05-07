<template>
  <div class=''>
    <el-form :model="form">
      <el-form-item label="分类名称">
        <el-input v-model="form.category_name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import {Vue, Component} from 'vue-property-decorator';
import {State} from "vuex-class";

@Component({
  name: "AddCategories"
})
export default class extends Vue {
  @State("userId") user_id
  form = {
    category_name: ""
  }

  submit() {
    this.$http.post("/api/addProductsCategories", {
      user_id: this.user_id,
      ...this.form
    }).then(res => {
      if(res.data.code == 1) {
        this.$alert(res.data.msg, "成功").then(res => {
          this.$router.replace("/goods/getCategories")
        })
      }else {
        this.$alert(res.data.msg, "错误")
      }
    }).catch(err => {
      this.$alert(err.data.msg, "错误")
    })
  }
  cancel() {
    this.$router.push("/goods/getCategories")
  }
}
</script>
<style lang='less' scoped>
</style>

