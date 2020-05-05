interface stateType {
    nickname: string | undefined | null,
    avatar: string | undefined | null
}
let state:stateType = {
    nickname: "",
    avatar: ""
}

export default {
    namespaced: true,
    state: state,
    mutations: {
        setUserinfo(state, payload:stateType) {
            state.nickname = payload.nickname;
            state.avatar = payload.avatar;
        }
    }
}