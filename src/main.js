import Vue from 'vue'
import routerconfig from './router-config'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options.root = ''
Vue.http.options.emulateJSON = true

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routerconfig
})

// todo $mount 的作用
new Vue({
  router
}).$mount('#app')

let hash = window.location.hash.replace('#/', '')
// 默认加载#home路由
if (hash) {
  router.push(hash)
} else {
  router.push('home')
}

