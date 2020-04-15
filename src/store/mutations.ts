import * as types from "./mutation-types";

export default {
    [types.SWITCH_INIT](state, payload) {
        state.init = payload
    }
}