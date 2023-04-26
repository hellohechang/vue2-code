import observe from './observe'

function defineReactiveData(data, key, value) {
  // 如果值是对象类型,递归处理
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue === value) return
      observe(newValue)
      value = newValue
    }
  })
}


export default defineReactiveData