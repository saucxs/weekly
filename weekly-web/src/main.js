// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入vuex
import Vuex from 'vuex'
import store from './vuex'
// 引入ele
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

/*全局fliter*/
import * as commonFliter from './common/filters'
Object.keys(commonFliter).forEach(key => {
  Vue.filter(key, commonFliter[key])
})

Vue.config.productionTip = false

// use
Vue.use(Vuex);
Vue.use(ElementUI);

/*路由处理*/
router.beforeEach((to, from, next) => {
  let menuId;
  let auditResult;
  let applicationVerifyFlag;
  let key = to.meta.key;
  if (key) {
    store.dispatch("getUserInfo", {}).then(response => {
      if(JSON.stringify(response.data) === '{}'){
        console.log(to.path, '11111111111')
        if (to.path !== '/weekly/login') {
          return next('/weekly/login');
        }
        next();
      }else{
        console.log(to.path, '22222222')
        if (to.path == '/weekly/login') {
         if(response.data.role == 1 || response.data.role == 2 || response.data.role == 3){
           return next('/weekly/weeklyView');
         }else if(response.data.role == 4){
           return next('/weekly/writeWeekly');
         }
        }
        store.commit("USER_INFO", response.data);
        next();
      }
    });
  } else {
    next({path: to.path})
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
