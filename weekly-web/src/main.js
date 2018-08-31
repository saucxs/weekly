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
      console.log(response, 'response');
      console.log(from.name,to.name,'hhhhhhhhhhhhhh');
      if(!response.data){
        if (to.path !== '/login') {
          return next('/login');
        }
        next();
      }else{
        if (to.path == '/login') {
          return next('/writeWeekly');
        }
        store.commit("USER_INFO", response.data);
        next();
      }
    });
  } else {
   next();
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
