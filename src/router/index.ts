import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "store/index";
import { SWITCH_INIT, SET_USERID } from "store/mutation-types";

Vue.use(VueRouter);

import layout from "components/layout/index.vue";

const Routes: Array<RouteConfig> = [
	{
		name: "Login",
		path: "/login",
		meta: {
			hidden: true
		},
		component: () => import(/* webpackChunkName: "Login" */"views/login/index.vue")
	},
	{
		name: "index",
		path: "/",
		redirect: "/home",
		component: layout,
		children: [
			{
				name: "Home",
				path: "home",
				meta: {
					title: "首页"
				},
				component: () => import(/* webpackChunkName: Home */"views/home/index.vue")
			}
		]
	},
	{
		name: "Goods",
		path: "/goods",
		redirect: "/goods/getCategories",
		component: layout,
		children: [
			{
				name: "AddCategories",
				path: "addCategories",
				meta: {
					title: "添加分类"
				},
				component: () => import(/* webpackChunkName: AddCategories */"views/goods/addCategories.vue")
			},
			{
				name: "GetCategories",
				path: "getCategories",
				meta: {
					title: "分类列表"
				},
				component: () => import(/* webpackChunkName: GetCategories */"views/goods/getCategories.vue")
			}
		]
	}
]

const router = new VueRouter({
	linkActiveClass: "active",
	mode: "history",
	routes: Routes
});

router.beforeEach((to, from, next) => {
	if (store.state.init == 0) {
		store.commit(SWITCH_INIT, 1)
		if (localStorage.getItem("remember")) {
			Vue.prototype.$http.get("/api/signUp", {
				params: {
					username: localStorage.getItem("username"),
					password: localStorage.getItem("password")
				}
			}).then(res => {
				store.commit(SET_USERID, res.data.data.id);
				next();
			}).catch(error => {
				next('/login');
			})
		} else {
			next('/login');
		}
	} else {
		next();
	}
})

export default router;
