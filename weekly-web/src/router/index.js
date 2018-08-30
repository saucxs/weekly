import Vue from 'vue'
import Router from 'vue-router'

// 登陆
const login = () => import("@/views/login/index")

// 布局
const home = () => import("@/views/home");

// 写当前周
const writeWeekly = () => import("@/views/writeWeekly/index");

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        key: '0'
      },
      component: login
    },
    {
      path: '/',
      name: 'home',
      component: home,
      children: [{
        path: '/writeWeekly',
        name: 'writeWeekly',
        meta: {
          key: '2'
        },
        component: writeWeekly
      }]
    }
  ]
})
