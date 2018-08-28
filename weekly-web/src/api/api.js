"use strict";
// 引入vue和axios
import Vue from "vue";
import axios from "axios";

import {
    serveUrl,
    getConfig,
    postConfig,
  } from "./config";

// 继承vue的原型方法
Vue.prototype.axios = axios;  

// 开发环境调试用户信息
axios.interceptors.request.use(config => {
    if (process.env.NODE_ENV === 'development') {
      config.headers["cust_num"] = "7000374810";
    }
    return config;
});


axios.interceptors.response.use(
    response => {
      let data = response.data;
      if (data.idsIntercepted) {
        //   登陆成功的回调地址
        location.href = "";
      } else {
        return data;
      }
    },
    error => ({
      code: -1,
      msg: "网络异常"
    })
);

export default {
    // API请求example
    getUserInfo: params => {
        return axios.post("/member/info/query.htm", params, postConfig);
    },



      /**
   * API demo
   *
   * getAPI: (params) => {
   *    getConfig.params = params.params
   *    return axios.get('xxxx.do', getConfig)
   * }
   *
   * postAPI: (params) => {
   *     return axios.post('xxxx.do', params, postConfig)
   * }
   */
}