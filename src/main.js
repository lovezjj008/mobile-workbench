import Vue from 'vue'
import routerconfig from './router-config'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routerconfig
})

// todo $mount 的作用
new Vue({
  router
}).$mount('#app')
// 默认加载#home路由
router.push('home')

