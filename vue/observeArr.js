import observe from "./observe"

function observeArr(arr) {
  arr.forEach((item) => {
    observe(item)
  })
}


export default observeArr