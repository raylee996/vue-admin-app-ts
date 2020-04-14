
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

    mounted() {
        console.log(this["$http"])
    }

    submitForm(type: 1 | 2) {

    }
}