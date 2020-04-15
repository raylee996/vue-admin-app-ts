import axios, { AxiosInstance } from "axios";
import { Loading } from "element-ui";
import { ElLoadingComponent } from "element-ui/types/loading";
import Vue from "vue";

/* 
拦截器作用：
请求开始时触发loading
请求结束时关闭loading
捕获错误
*/

let axiosInstance: AxiosInstance = axios.create({
    headers: {
        post: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
});
let loading: ElLoadingComponent;

axiosInstance.interceptors.request.use(config => {
    loading = Loading.service({ fullscreen: true });
    return config;
}, error => {
    Vue.prototype.$alert(error.message, '错误', {
        confirmButtonText: '确定',
    });
});

axiosInstance.interceptors.response.use(response => {
    loading.close();
    return response;
}, error => {
    loading.close();
    if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        Vue.prototype.$alert(error.response.data.msg, '错误', {
            confirmButtonText: '确定',
        });
    } else {
        // Something happened in setting up the request that triggered an Error
        Vue.prototype.$alert(error.message, '错误', {
            confirmButtonText: '确定',
        });
    }
});

export default axiosInstance;