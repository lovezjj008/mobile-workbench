import App from './App.vue'

const HOME = resolve => require(['pages/home.vue'], resolve)
const MSG = resolve => require(['pages/message.vue'], resolve)

const routerconfig = [
  // 动态路径参数 以冒号开头
  { path: '/',
    component: App,
    children: [
      {
        path: 'home',
        component: HOME
      },
      {
        path: 'msg',
        component: MSG
      }
    ]
  }
]

export default routerconfig
