import "@babel/polyfill";
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import { AxiosInstance } from "axios";
import axiosInstance from "utils/ajax";
import "style/reset.css";
import 'element-ui/lib/theme-chalk/index.css';
import NavList from "router/navList";

declare module "vue/types/vue" {
  interface Vue {
    $http: AxiosInstance;
  }
}

Vue.use(ElementUI)
Vue.use(NavList)

Vue.prototype.$http = axiosInstance;

Vue.config.productionTip = false;

var vm = new Vue({
  router,
  store,
  render: h => h(App)
});
vm.$mount('#app');
