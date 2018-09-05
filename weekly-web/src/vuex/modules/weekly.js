import {
  CURRENT_WEEKLY,
  WEEKLY_LIST
} from "../mutation-types.js";

const state = {
  currentWeekly: '',
  weeklyList: []
};

const mutations = {
  [CURRENT_WEEKLY](state, newData){
    state.currentWeekly = newData;
  },
  [WEEKLY_LIST](state, newData){
    state.weeklyList = newData;
  }
}

export default {
  state,
  mutations
}
