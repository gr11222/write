import { login, logout } from "@/api/login";
import { setCookie, delCookie, getCookie } from "@/utils/cookie";
const user = {
  state: {
    user: "admin",
    sessionid: "",
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_SESSIONID: (state, sessionid) => {
      state.sessionid = sessionid;
    },
  },

  actions: {
    // 用户名登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password)
          .then((response) => {
            const data = response;
            const userid = data.userid == 0 ? "admin" : "user" + data.userid;
            commit("SET_USER", userid);
            commit("SET_SESSIONID", data.sessionid);
            setCookie("sessionid", data.sessionid);
            setCookie("userid", userid);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 登出
    Logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit("SET_USER", "");
            commit("SET_SESSIONID", "");
            delCookie("sessionid");
            delCookie("userid");
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 设置用户信息
    setInfo({ commit }) {
      let userid = getCookie("userid");
      let sessionid = getCookie("sessionid");
      commit("SET_USER", userid);
      commit("SET_SESSIONID", sessionid);
    },
  },
};

export default user;
