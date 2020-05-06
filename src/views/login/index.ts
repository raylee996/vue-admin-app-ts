import { Vue, Component } from "vue-property-decorator";
import {Mutation} from "vuex-class";
import {SET_USERID, SWITCH_INIT} from "store/mutation-types";
import {setUserinfo} from "utils/user";

@Component
export default class extends Vue {
    @Mutation(SET_USERID) setUserId;
    @Mutation(SWITCH_INIT) switchInit;

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
                        this.switchInit(1)
                        this.$http.get("/api/signUp", {
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
                            this.setUserId(res.data.data.id);
                            setUserinfo(res.data.data.id);
                            this.$router.replace("/");
                        });
                        break;
                    case 2: //注册
                        this.switchInit(1)
                        this.$http.post("/api/addUser", {
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
                            this.setUserId(res.data.data.id);
                            setUserinfo(res.data.data.id);
                            this.$router.replace("/");
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