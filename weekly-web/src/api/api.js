"use strict";
// 引入vue和axios
import Vue from "vue";
import axios from "axios";
import router from '../router'

import {
    serveUrl,
    getConfig,
    postConfig,
  } from "./config";

// 继承vue的原型方法
Vue.prototype.axios = axios;

// 开发环境调试用户信息
// axios.interceptors.request.use(config => {
//     if (process.env.NODE_ENV === 'development') {
//       config.headers["cust_num"] = "7000374810";
//     }
//     return config;
// });

axios.interceptors.response.use(
  response => {
    let data = response.data;
    console.log(data, 'data');
    if (!data.data) {
      //   登陆成功的回调地址
      return data;
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
    return axios.post("/home/user/queryuser", params);
  },
  login: params => {
    return axios.post("/home/user/login", params);
  },
  logout: params => {
    return axios.post("/home/user/logout", params);
  },
  addWeekly: params => {
    return axios.post("/home/weekly/addWeekly", params);
  }

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
