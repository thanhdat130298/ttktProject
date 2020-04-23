import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../components/login")
  },
  {
    path: "/pagination",
    name: "pagination",
    component: () => import("../components/pagination")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../components/home"),
    meta: {requireAuth: true}
  },
  {
    path: "/homepage",
    name: "homepage",
    component: () => import("../components/homepage"),
    meta: {requireAuth: true}
  },
  {
    path: "/listAllUser",
    name: "listAllUser",
    component: () => import("../components/listAllUser"),
    meta: {requireAuth: true}
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach(async(to, from, next) => {
  
  const check = to.matched.some(record => {return record.meta.requireAuth})

  await store.dispatch("fetchToken");
  if(check && (!store.state.token)) {
    next("./login");
  }
  if((store.state.token)&&(to.name==="login")) {
    next("./home");
  }
  next();
})
export default router;
