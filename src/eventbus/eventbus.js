import Vue from 'vue'

let Bus = new Vue()

Object.defineProperty(Vue.prototype, '$bus', {
  get () {
    return this.$root.bus
  }
})

export default Bus
