import { patch } from "./patch";

export function mountComponent(vm) {
  vm._update(vm._render())
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    patch(vm.$el, vnode)
  }
}