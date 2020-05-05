import store from "store/index";
import axios from "axios";

export function setUserinfo(id) {
    axios.get("/api/getUser", {
        params: {
            id
        }
    }).then(res => {
        store.commit("user/setUserinfo",  res.data.data);
    }).catch(error => {
        throw(error)
    })
}