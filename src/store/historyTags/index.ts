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
            let index = state.historyTags.historyTags.findIndex(item => item.pathname == (payload.historyTags as historyTagsConfig).pathname)
            if(payload.type == "add") {
                if(index == -1) {
                    state.historyTags.historyTags.push(payload.historyTags);
                }
            }else if(payload.type == "delete") {
                state.historyTags.historyTags.splice(index, 1);
            }else if(payload.type == "deleteOthers") {
                state.historyTags.historyTags = [payload.historyTags];
            }else {
                state.historyTags.historyTags = [];
            }
        }
    }
}