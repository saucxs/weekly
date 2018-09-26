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
axios.interceptors.request.use(config => {
    if (process.env.NODE_ENV === 'development') {
      config.headers["username"] = "189090909";
    }
    return config;
});

axios.interceptors.response.use(
  response => {
    let data = response.data;
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
  changePassword: params => {
    return axios.post("/home/user/changepass", params);
  },
  addWeekly: params => {
    return axios.post("/home/weekly/addWeekly", params);
  },
  getCurrentWeekly: params => {
    return axios.post("/home/weekly/getCurrentWeekly", params);
  },
  getWeeklyList: params => {
    return axios.get("/home/weekly/getWeeklyList", params);
  },
  getDepartmentWeeklyList: params => {
    return axios.post("/home/weekly/getDepartmentWeeklyList", params);
  },
  getDepartmentMemberList: params => {
    return axios.post("/home/department/getDepartmentMemberList", params);
  },
  getUnDepartmentMemberList: params => {
    return axios.post("/home/department/getUnDepartmentMemberList", params);
  },
  addUser: params => {
    return axios.post("/home/user/register", params);
  },
  deleteUser: params => {
    return axios.post("/home/user/deleteUser", params);
  },
  getAllDepartmentList: params => {
    return axios.post("/home/department/getAllDepartmentList", params);
  },
  getRole: params => {
    return axios.post("/home/role/getRole", params);
  },
  /*设置*/
  addDepartment: params => {
    return axios.post("/home/company/addDepartment", params);
  },
  deleteDepartment: params => {
    return axios.post("/home/company/deleteDepartment", params);
  },
  /*daashboard*/
  getBoard: params => {
    return axios.post("/home/department/getBoard", params);
  },
  /*获取所有公司*/
  getAllCompanyList: params => {
    return axios.post("/home/company/getAllCompanyList", params);
  },
  /*各个公司的已写周报列表*/
  getAllCompanyWeekly: params => {
    return axios.post("/home/company/getAllCompanyWeekly", params);
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
