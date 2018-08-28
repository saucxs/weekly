import Api from "../api/api";
import * as types from "./mutation-types";

// example
export const getUserInfo = ({commit},params) => {
    return Api.getUserInfo(parmas).then(response => {
        commit(types.USER_INFO,response.data);
        return response;
    })
}