import {
    USER_INFO
} from "../mutation-types.js";

const state = {
  systemName: '周报系统',
  userInfo:{

  }
};

const mutations = {
  [USER_INFO](state,newData){
    state.userInfo = newData;
  }
}

export default {
  state,
  mutations
}
