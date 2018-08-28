import Vue from 'vue'
import Router from 'vue-router'

// 概览页
const home = () => import("@/views/home/home");
// a模块
const aManage = () => import("@/views/aManage/index");
// b模块
const bManage = () => import("@/views/bManage/index");

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        key: '0'
      },
      component: home
    },
    {
      path: '/aManage',
      name: 'aManage',
      meta: {
        key: '1'
      },
      component: aManage
    },
    {
      path: '/bManage',
      name: 'bManage',
      meta: {
        key: '2'
      },
      component: bManage
    }
  ]
})
