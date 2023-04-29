import { initMixin } from "./init";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./vdom";

function Vue(options) {
  this._init(options)
}
// 初始化
initMixin(Vue)
// 生命周期
lifecycleMixin(Vue)
renderMixin(Vue)


export default Vue