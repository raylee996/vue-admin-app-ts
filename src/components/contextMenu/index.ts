import Vue from "vue";
import ContextMenu from "./index.vue";
import {contextType} from "./types";

interface ContextMenuType {
    bind: Function,
    show: Function,
    hide: Function
}

let singleInstance;

let ContextMenuConstructor = Vue.extend(ContextMenu);

ContextMenuConstructor.prototype.bind = function() {
    this.$el.onclick = () => {
        Vue.nextTick(() => {
            this.remove();
        })
    }
}

ContextMenuConstructor.prototype.show = function(ev: MouseEvent) {
    let e = ev || window.event, clientX = e.clientX, clientY = e.clientY;
    this.$el.getElementsByClassName("custom_context_menu")[0].style.position = "fixed";
    this.$el.getElementsByClassName("custom_context_menu")[0].style.left = clientX + "px";
    this.$el.getElementsByClassName("custom_context_menu")[0].style.top = clientY + "px";
    document.body.appendChild(this.$el);
};

ContextMenuConstructor.prototype.remove = function() {
    document.body.removeChild(this.$el);
    this.$destroy();
}

export default {
    service(menuListOptions: Array<contextType>, cbOptions: Object) {
        if(singleInstance) {
            singleInstance.remove();
            singleInstance = undefined;
        }
        let instance: ContextMenuType = new ContextMenuConstructor({
            el: document.createElement("div"),
            data() {
                return {
                    menuList: menuListOptions,
                    cbOptions
                }
            }
        });
        instance.bind();
        instance.show();
        singleInstance = instance;
        return instance;
    }
} 