import Vue from 'vue'
import Router from 'vue-router'

// 登陆
const login = () => import("@/views/login/index")

// 布局
const home = () => import("@/views/home");

// 周报管理
const weeklyView = () => import("@/views/weeklyManage/index");
const memberList = () => import("@/views/weeklyManage/memberList");
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
        zhName: '登陆'
      },
      component: login
    }, {
      path: '/',
      name: 'home',
      redirect: '/writeWeekly',
      meta: {
        zhName: '主页'
      },
      component: home
    }, {
      path: '/weeklyManage',
      name: 'weeklyManage',
      isNest: true,
      icon: 'el-icon-menu',
      component: home,
      meta: {
        zhName: '周报管理',
        key: '1',
        role: 3
      },
      children: [{
        path: '/weeklyView',
        name: 'weeklyView',
        component: weeklyView,
        meta: {
          zhName: '周报概览',
          key: '1-1',
          role: 3
        }
      }, {
        path: '/memberList',
        name: 'memberList',
        component: memberList,
        meta: {
          zhName: '添加成员',
          key: '1-2',
          role: 3
        }
      }]
    }, {
      path: '/write',
      name: 'write',
      component: home,
      isNest: false,
      redirect: '/writeWeekly',
      meta: {
        zhName: '写周报',
        key: '2',
        role: 4
      },
      children: [{
        path: '/writeWeekly',
        name: 'writeWeekly',
        icon: 'el-icon-edit',
        meta: {
          zhName: '写周报',
          key: '2-1',
          role: 4
        },
        component: writeWeekly
      }]
    }, {
      path: '/list',
      name: 'list',
      component: home,
      isNest: false,
      redirect: '/weeklyList',
      meta: {
        zhName: '周报列表',
        key: '3',
        role: 4
      },
      children: [{
        path: '/weeklyList',
        name: 'weeklyList',
        isNest: false,
        icon: 'el-icon-search',
        meta: {
          zhName: '历史周报',
          key: '3-1',
          role: 4
        },
        component: weeklyList
      }]
    }
  ]
})
