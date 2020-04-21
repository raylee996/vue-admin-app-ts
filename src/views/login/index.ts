
import { Vue, Component } from "vue-property-decorator";

@Component
export default class extends Vue {
    remember:any = localStorage.getItem("remember");
    formProps: any = {
        username: localStorage.getItem("username") || "",
        password: localStorage.getItem("password") || "",
        remember: JSON.parse(this.remember) || false
    };
    rules: any = {
        username: [
            {required: true, message: "请输入用户名", trigger: "blur"}
        ],
        password: [
            {required: true, message: "请输入密码", trigger: "blur"}
        ]
    };
    private submitForm(type: 1 | 2) {
        (this.$refs.form as HTMLFormElement).validate(valid => {
            if(valid) {
                switch(type) {
                    case 1: //登录
                        this.$http.get("/api/addUser", {
                            params: {
                                username: this.formProps.username,
                                password: this.formProps.password
                            }
                        }).then(res => {
                            if(this.formProps.remember) {
                                localStorage.setItem("username", this.formProps.username);
                                localStorage.setItem("password", this.formProps.password);
                                localStorage.setItem("remember", this.formProps.remember);
                            }else {
                                localStorage.removeItem("username");
                                localStorage.removeItem("password");
                                localStorage.removeItem("remember");
                            }
                            //执行路由跳转

                        });
                        break;
                    case 2: //注册
                        this.$http.post("/api/signUp", {
                            username: this.formProps.username,
                            password: this.formProps.password
                        }).then(res => {
                            if(this.formProps.remember) {
                                localStorage.setItem("username", this.formProps.username);
                                localStorage.setItem("password", this.formProps.password);
                                localStorage.setItem("remember", this.formProps.remember);
                            }else {
                                localStorage.removeItem("username");
                                localStorage.removeItem("password");
                                localStorage.removeItem("remember");
                            }
                            //执行路由跳转
                            
                        });
                        break;
                    default:
                        this.$alert("", '参数错误', {
                            confirmButtonText: '确定',
                        });
                        return;
                }
            }
        })
    }
}