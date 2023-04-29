import Vue from 'vue'

let vm = new Vue({
  el: '#app',
  data() {
    return {
      name: 'chang',
      age: 18,
      sex: '男',
      firend: [
        {
          name: '小红',
          age: 17,
          sex: '女'
        },
        {
          name: '小黑',
          age: 18,
          sex: '男'
        },
      ]
    }
  }
})


// console.log(vm.firend.pop())
console.log(vm)