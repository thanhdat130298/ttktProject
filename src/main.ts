import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router/router";
import interceptor from "./intercept/interceptor";
import vuetify from "./plugins/vuetify";
Vue.config.productionTip = false;

interceptor()
new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
