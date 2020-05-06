import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "store/index";
import { SWITCH_INIT, SET_USERID } from "store/mutation-types";
import {setUserinfo} from "utils/user";

Vue.use(VueRouter);

import layout from "components/layout/index.vue";

export const Routes: Array<RouteConfig> = [
	{
		name: "Login",
		path: "/login",
		meta: {
			hidden: true
		},
		component: () => import(/* webpackChunkName: "Login" */"views/login/index.vue")
	},
	{
		name: "profile",
		path: "/profile",
		redirect: "/profile/my",
		meta: {
			hidden: true
		},
		component: layout,
		children: [
			{
				name: "my",
				path: "/profile/my",
				meta: {
					affix: true
				},
				component: () => import(/* webpackChunkName: "profile" */"views/profile/index.vue")
			}
		]
	},
	{
		name: "index",
		path: "/",
		redirect: "/home",
		component: layout,
		meta: {
			title: "首页",
			icon: 's-home'
		},
		children: [
			{
				name: "Home",
				path: "home",
				meta: {
					title: "首页",
					hidden: true,
					affix: true
				},
				component: () => import(/* webpackChunkName: "Home" */"views/home/index.vue")
			}
		]
	},
	{
		name: "Goods",
		path: "/goods",
		redirect: "/goods/getCategories",
		meta: {
			title: "商品管理",
			icon: 's-goods'
		},
		component: layout,
		children: [
			{
				name: "AddCategories",
				path: "/goods/addCategories",
				meta: {
					title: "添加分类",
					affix: true
				},
				component: () => import(/* webpackChunkName: "AddCategories" */"views/goods/addCategories.vue")
			},
			{
				name: "GetCategories",
				path: "/goods/getCategories",
				meta: {
					title: "分类列表",
					affix: true
				},
				component: () => import(/* webpackChunkName: "GetCategories" */"views/goods/getCategories.vue"),
				children: [
					{
						name: "GetCategoriesList",
						path: "/goods/getCategories/:id",
						meta: {
							title: "商品列表",
							hidden: true,
							affix: true
						},
						component: () => import(/* webpackChunkName: "GetCategoriesList" */"views/goods/getCategoriesList.vue"),
						children: [
							{
								name: "AddProducts",
								path: "/goods/getCategories/:id/addProducts",
								meta: {
									title: "添加商品",
									hidden: true,
									affix: true
								},
								component: () => import(/* webpackChunkName: "AddProducts" */"views/goods/addProducts.vue")
							}
						]
					}
				]
			}
		]
	},
	{
		name: "Articles",
		path: "/articles",
		redirect: "/articles/getArticles",
		meta: {
			title: "文章管理",
			icon: 'document'
		},
		component: layout,
		children: [
			{
				name: "AddArticles",
				path: "addArticles",
				meta: {
					title: "添加文章",
					affix: true
				},
				component: () => import(/* webpackChunkName: "AddArticles" */"views/articles/addArticles.vue")
			},
			{
				name: "GetArticles",
				path: "getArticles",
				meta: {
					title: "文章列表",
					affix: true
				},
				component: () => import(/* webpackChunkName: "GetArticles" */"views/articles/getArticles.vue"),
				children: [
					{
						name: "ArticleDetail",
						path: ":id",
						meta: {
							title: "文章详情",
							hidden: true,
							affix: true
						},
						component: () => import(/* webpackChunkName: "ArticleDetail" */"views/articles/articleDetail.vue"),
					}
				]
			}
		]
	}
]

const router = new VueRouter({
	linkActiveClass: "active",
	mode: "history",
	routes: Routes
});

function addHistoryTags(affix, pathname, path) {
	if(!affix) return;
	let index = store.getters("historyTags/historyTags").indexOf(pathname);
	if(index == -1) {
		store.commit("historyTags/updateHistoryTags", {type: "add", historyTags: {path, pathname}});
	}
}

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
				setUserinfo(res.data.data.id);
				addHistoryTags(from.meta.affix, from.name, from.path)
				if(from.path == "/login") {
					next("/");
				}else {
					next();
				}
			}).catch(error => {
				next('/login');
			})
		} else {
			next('/login');
		}
	} else {
		addHistoryTags(from.meta.affix, from.name, from.path)
		next();
	}
})

export default router;
