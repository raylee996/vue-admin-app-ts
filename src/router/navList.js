import NavList from "./navList.vue";

NavList.install = function(Vue) {
    Vue.component(NavList.name, NavList);
}

export default NavList;