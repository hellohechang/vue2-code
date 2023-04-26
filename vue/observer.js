import defineReactiveData from "./reactive"
import { arrMethods } from "./array"
import observeArr from "./observeArr"


function Observer(data) {
  if (Array.isArray(data)) {
    // 处理数组
    // 重写数组上的方法,加一层原型
    data.__proto__ = arrMethods
    observeArr(data)
  } else {
    // 处理对象
    this.walk(data)
  }
}

Observer.prototype.walk = function (data) {
  let keys = Object.keys(data)
  keys.forEach(key => {
    let value = data[key]
    defineReactiveData(data, key, value)
  })
}

export default Observer