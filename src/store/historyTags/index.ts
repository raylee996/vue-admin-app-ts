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
            switch(payload.type) {
                case "add":
                    if(index == -1) {
                        state.historyTags.historyTags.push(payload.historyTags);
                    }
                    break;
                case "delete":
                    state.historyTags.historyTags.splice(index, 1);
                    break;
                case "deleteOthers":
                    state.historyTags.historyTags = [payload.historyTags];
                    break;
                case "deleteAll":
                    state.historyTags.historyTags = [];
                    break;
                default:
                    break;
            }
        }
    }
}