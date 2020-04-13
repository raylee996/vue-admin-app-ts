import Vue from "vue";
import VueRouter,{RouteConfig} from "vue-router";

Vue.use(VueRouter);

const Routes: Array<RouteConfig> = [
  {
    name: "index",
    path: "/",
    component: () => import(/* webpackChunkName: "index" */"views/index/index.vue")
  }
]

export default new VueRouter({
  mode: "history",
  routes: Routes
})
