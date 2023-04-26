import { initState } from "./init";
import { compileToRenderFunction } from "./compiler";

function Vue(options) {
  this._init(options)
}
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
}

export default Vue