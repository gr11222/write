import Vue from "vue";
import Router from "vue-router";
import Layout from "@/views/layout";

Vue.use(Router);
export const adminRouter = [
  {
    path: "/system",
    name: "系统设置",
    component: Layout,
    redirect: "system/status",
    children: [
      {
        path: "status",
        component: () => import("@/views/system/index"),
        name: "设备状态查询",
        meta: { title: "system", icon: "system" },
      },
      {
        path: "rackset",
        component: () => import("@/views/tables/index"),
        name: "机框属性设置",
        meta: { title: "rackset", icon: "system" },
      },
    ],
  },
];
export const mainRouter = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
  },
  {
    path: "",
    redirect: "system",
  },
];
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: mainRouter,
});
