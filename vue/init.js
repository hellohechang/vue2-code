
// 初始化

import observe from "./observe"
import proxyData from "./proxy"

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

export {
  initState
}