import {
  CURRENT_WEEKLY,
  WEEKLY_LIST,
  DEPARTMENT_WEEKLY_LIST
} from "../mutation-types.js";

const state = {
  currentWeekly: '',
  weeklyList: [],
  departmentWeeklyList: []
}

const mutations = {
  [CURRENT_WEEKLY](state, newData){
    state.currentWeekly = newData;
  },
  [WEEKLY_LIST](state, newData){
    state.weeklyList = newData;
  },
  [DEPARTMENT_WEEKLY_LIST](state, newData){
    state.departmentWeeklyList = newData;
  }
}

export default {
  state,
  mutations
}
