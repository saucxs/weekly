import {
  CURRENT_WEEKLY
} from "../mutation-types.js";

const state = {
  currentWeekly: ''
};

const mutations = {
  [CURRENT_WEEKLY](state, newData){
    state.currentWeekly = newData;
  }
}

export default {
  state,
  mutations
}
