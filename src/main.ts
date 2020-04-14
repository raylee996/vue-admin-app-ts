import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import axios from "axios";
import "style/reset.css";
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

var vm = new Vue({
  router,
  store,
  render: h => h(App)
})
vm.$mount('#app')
