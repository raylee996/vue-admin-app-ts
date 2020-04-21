import {historyTagsConfig, historyTagsPayload} from "./types";

export default {
    namespaced: true,
    state: {
        historyTags: <Array<historyTagsConfig>>[]
    },
    getters: {
        historyTags: (state, getters, rootState) => {
            return state.historyTags.historyTags.map(item => item.pathname);
        }
    },
    mutations: {
        updateHistoryTags(state, payload:historyTagsPayload) {
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
}