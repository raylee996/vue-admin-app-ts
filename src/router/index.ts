import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "store/index";
import { SWITCH_INIT, SET_USERID } from "store/mutation-types";

Vue.use(VueRouter);

import layout from "components/layout/index.vue";

/* 
breadcrumb:
/goods/getCategories =》 首页 / 商品管理 / 分类列表
*/

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
		name: "index",
		path: "/",
		redirect: "/home",
		component: layout,
		children: [
			{
				name: "Home",
				path: "home",
				meta: {
					title: "首页",
					icon: 's-home'
				},
				component: () => import(/* webpackChunkName: Home */"views/home/index.vue")
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
				component: () => import(/* webpackChunkName: GetCategories */"views/goods/getCategories.vue"),
				children: [
					{
						name: "GetCategoriesList",
						path: ":id",
						meta: {
							title: "商品列表",
							hidden: true
						},
						component: () => import(/* webpackChunkName: GetCategoriesList */"views/goods/getCategoriesList.vue"),
						children: [
							{
								name: "AddProducts",
								path: "addProducts",
								meta: {
									title: "添加商品",
									hidden: true,
								},
								component: () => import(/* webpackChunkName: AddProducts */"views/goods/addProducts.vue")
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
					title: "添加文章"
				},
				component: () => import(/* webpackChunkName: AddArticles */"views/articles/addArticles.vue")
			},
			{
				name: "GetArticles",
				path: "getArticles",
				meta: {
					title: "文章列表"
				},
				component: () => import(/* webpackChunkName: GetArticles */"views/articles/getArticles.vue"),
				children: [
					{
						name: "ArticleDetail",
						path: ":id",
						meta: {
							title: "文章详情",
							hidden: true
						},
						component: () => import(/* webpackChunkName: ArticleDetail */"views/articles/articleDetail.vue"),
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
