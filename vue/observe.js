import Observer from './observer'


function observe(data) {
  // 判断_data是否对象
  if (typeof data !== 'object' || data === null) return;
  return new Observer(data)
}


export default observe