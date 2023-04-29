
// 初始化

import observe from "./observe"
import proxyData from "./proxy"
import { compileToRenderFunction } from "./compiler"
import { mountComponent } from "./lifecycle"

function initState(vm) {
  let options = vm.$options
  if (options.data) {
    // 初始化数据
    initData(vm)
  }
}
function initData(vm) {
  let data = vm.$options.data

  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
  for (let key in data) {
    proxyData(vm, '_data', key)
  }

  observe(vm._data)
}
export function initMixin(Vue) {
  // 初始化
  Vue.prototype._init = function (options) {
    var vm = this;
    vm.$options = options
    initState(vm)

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }

  }
  Vue.prototype.$mount = function (el) {
    const vm = this,
      options = vm.$options;
    if (typeof el === 'string') {
      el = document.querySelector(el);
    }
    vm.$el = el


    // render > template > el
    if (!options.render) {
      let template = options.template;

      if (!template && el) {
        template = el.outerHTML
      }

      // 编译模板 成 render函数
      const render = compileToRenderFunction(template)

      options.render = render
    }

    mountComponent(vm)
  }
}