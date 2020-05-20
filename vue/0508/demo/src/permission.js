import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getCookie } from "@/utils/cookie";
import store from "@/store";

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getCookie("sessionid")) {
    store.dispatch("setInfo");
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      if (store.getters.routers.length == 0) {
        store.dispatch("setRouters").then(() => {
          router.addRoutes(store.getters.routers); // 动态添加可访问路由表
          next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        });
      } else {
        next();
      }
    }
  } else {
    if (to.path.indexOf("/login") !== -1) {
      next();
    } else {
      next(`/login`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
