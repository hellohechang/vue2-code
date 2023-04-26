import { ARR_METHODS } from "./config";
import observeArr from "./observeArr";


let originArrMethods = Array.prototype
// 创建一个新对象,原型指向Array的原型
let arrMethods = Object.create(originArrMethods)

// 给新对象添加方法
ARR_METHODS.forEach((item) => {
  arrMethods[item] = function (...args) {
    // 直接调用原生的方法
    let rt = originArrMethods[item].call(this, ...args)

    let newArr;
    switch (item) {
      case 'push':
      case 'unshift':
        newArr = args
        break
      case 'splice':
        newArr = args.slice(2)
        break
      default:
        break
    }
    newArr && observeArr(newArr)
    return rt
  }
})

export {
  arrMethods
}
