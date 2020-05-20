import { getCookie } from "@/utils/cookie";
import { adminRouter,mainRouter } from "@/router";
const user = {
  state: {
    routers: [],
  },

  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = routers;
    },
  },

  actions: {
    // 设置用户信息
    setRouters({ commit }) {
      new Promise((res) => {
        let routers;
        const userid = getCookie("userid");
        if (userid == "admin") {
          routers = mainRouter.concat(adminRouter);
        } else {
          routers = mainRouter.concat(adminRouter);
        }
        commit("SET_ROUTERS", routers);
        res();
      });
    },
  },
};

export default user;
