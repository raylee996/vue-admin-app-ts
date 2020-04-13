<template>
    <div class="index">
        <div class="form">
            <el-form :model="formProps" :rule="rules" label-width="100px" ref="form">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formProps.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formProps.password" show-password></el-input>
                </el-form-item>
                <el-form-item prop="remember">
                    <el-checkbox v-model="formProps.remember" label="记住密码" name="remember"></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(1)">登录</el-button>
                    <el-button @click="submitForm(2)">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class extends Vue {
    data() {
        let remember:any = localStorage.getItem("remember");
        return {
            formProps: {
                username: localStorage.getItem("username") || "",
                password: localStorage.getItem("password") || "",
                remember: JSON.parse(remember) || false
            },
            rules: {
                username: [
                    {required: true, message: "请输入用户名", trigger: "blur"}
                ],
                password: [
                    {required: true, message: "请输入密码", trigger: "blur"}
                ]
            }
        }
    }

    submitForm(type: 1 | 2) {
        
    }
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

