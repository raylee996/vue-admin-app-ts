import {historyTagsConfig, historyTagsPayload} from "./types";

export default {
    namespaced: true,
    state: {
        historyTags: <Array<historyTagsConfig>>[]
    },
    getters: {
        historyTags: (state, getters, rootState) => {
            return state.historyTags.map(item => item.pathname);
        }
    },
    mutations: {
        updateHistoryTags(state, payload:historyTagsPayload) {
            let index = state.historyTags.findIndex(item => item.pathname == (payload.historyTags as historyTagsConfig).pathname)
            switch(payload.type) {
                case "add":
                    if(index == -1) {
                        state.historyTags.push(payload.historyTags);
                    }
                    break;
                case "delete":
                    state.historyTags.splice(index, 1);
                    break;
                case "deleteOthers":
                    state.historyTags = [payload.historyTags];
                    break;
                case "deleteAll":
                    state.historyTags = [];
                    break;
                default:
                    break;
            }
        }
    }
}