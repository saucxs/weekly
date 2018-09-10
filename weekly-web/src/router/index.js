import Vue from 'vue'
import Router from 'vue-router'

// 登陆
const login = () => import("@/views/login/index")

// 布局
const home = () => import("@/views/home");

// 写当前周
const weeklyView = () => import("@/views/weeklyView/index");
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
      isNest: false,
      meta: {
        zhName: '登陆',
        key: '0'
      },
      component: login
    }, {
      path: '/',
      name: 'home',
      isNest: false,
      component: home,
      redirect: '/writeWeekly',
      meta: {
        zhName: '业务',
        key: '1'
      },
      children: [{
        path: '/weeklyView',
        name: 'weeklyView',
        icon: 'el-icon-menu',
        meta: {
          zhName: '周报概览',
          key: '1-0'
        },
        component: weeklyView
      },{
        path: '/writeWeekly',
        name: 'writeWeekly',
        icon: 'el-icon-menu',
        meta: {
          zhName: '写周报',
          key: '1-1'
        },
        component: writeWeekly
      }, {
        path: '/weeklyList',
        name: 'weeklyList',
        icon: 'el-icon-menu',
        meta: {
          zhName: '历史周报',
          key: '1-2'
        },
        component: weeklyList
      }]
    }
  ]
})
