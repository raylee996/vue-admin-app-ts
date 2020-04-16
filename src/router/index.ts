import Vue from "vue";
import VueRouter, { RouteConfig, NavigationGuard } from "vue-router";
import store from "store/index";
import { SWITCH_INIT } from "store/mutation-types";

Vue.use(VueRouter);

import layout from "components/layout/index.vue";

const Routes: Array<RouteConfig> = [
	{
		name: "login",
		path: "/login",
		component: () => import(/* webpackChunkName: "login" */"views/login/index.vue")
	}, /* 登录页 */
	{
		name: "index",
		path: "/",
		redirect: "/home",
		component: layout,
		children: [
			{
				name: "home",
				path: "/home",
				component: () => import(/* webpackChunkName: home */"views/home/index.vue")
			}
		]
	} /* 总首页 */
]

const router = new VueRouter({
	mode: "history",
	routes: Routes
});

router.beforeEach((to, from, next) => {
	if (store.state.init == 0) {
		store.commit(SWITCH_INIT, 1)
		if (localStorage.getItem("remember")) {
			Vue.prototype.$http.get("/api/user", {
				params: {
					username: localStorage.getItem("username"),
					password: localStorage.getItem("password")
				}
			}).then(res => {
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
