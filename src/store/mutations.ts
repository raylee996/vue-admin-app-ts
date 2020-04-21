import * as types from "./mutation-types";

export default {
    [types.SWITCH_INIT](state, payload: 0 | 1) {
        state.init = payload;
    },
    [types.SET_USERID](state, payload: number) {
        state.userId = payload;
    }
}