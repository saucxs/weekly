import Api from "../api/api";
import * as types from "./mutation-types";

// example
export const getUserInfo = ({commit},params) => {
  return Api.getUserInfo(params).then(response => {
    commit(types.USER_INFO,response.data);
    return response;
  })
}
// login
export const login = ({ commit }, params) => {
  return Api.login(params).then(response => {
    return response;
  })
}
// logout
export const logout = ({ commit }, params) => {
  return Api.logout(params).then(response => {
    return response;
  })
}
// add weekly
export const addWeekly = ({ commit }, params) => {
  return Api.addWeekly(params).then(response => {
    return response;
  })
}
// get current weekly
export const getCurrentWeekly = ({ commit }, params) => {
  return Api.getCurrentWeekly(params).then(response => {
    commit(types.CURRENT_WEEKLY,response.data);
    return response;
  })
}

// get eeklylist
export const getWeeklyList = ({ commit }, params) => {
  return Api.getWeeklyList(params).then(response => {
    commit(types.WEEKLY_LIST,response.data);
    return response;
  })
}
