import * as types from "./mutation-types";
import {historyLinkConfig} from "./types";

interface historyLinkPayload {
    type: "add" | "delete",
    historyLink: historyLinkConfig
}

export default {
    [types.SWITCH_INIT](state, payload: 0 | 1) {
        state.init = payload;
    },
    [types.SET_USERID](state, payload: number) {
        state.userId = payload;
    },
    [types.UPDATE_HISTORY_LINK](state, payload:historyLinkPayload) {
        let index = state.historyLink.findIndex(item => item.pathname == payload.historyLink.pathname)
        if(payload.type == "add") {
            if(index == -1) {
                state.historyLink.push(payload.historyLink);
            }
        }else {
            state.historyLink.splice(index, 1);
        }
    }
}