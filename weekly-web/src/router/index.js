import Vue from 'vue'
import Router from 'vue-router'

// 登陆
const login = () => import("@/views/login/index")

// 布局
const home = () => import("@/views/home");

// 写当前周
const writeWeekly = () => import("@/views/writeWeekly/index");
//历史周报
const weeklyList = () => import("@/views/weeklyList/index");

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
          key: '1'
        },
        component: writeWeekly
      },{
        path: '/weeklyList',
        name: 'weeklyList',
        meta: {
          key: '2'
        },
        component: weeklyList
      }]
    }
  ]
})

