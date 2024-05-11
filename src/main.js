import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/less/index.less";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import store from "./store";
import './api/mock.js'
import api from './api/api'


const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// 完整引入ElementPlus, 优点是不用一个一个引入组件，缺点是打包后的文件会变大
// app.use(ElementPlus)
app.config.globalProperties.$api = api;
store.commit("addMenu", router); //我们应该在创建Vue实例之前调用addMenu方法，以便在刷新时不丢失数据

// 检查路由是否存在
function checkRouter(path) {
  let hasCheck = router
    .getRoutes()
    .filter((router) => router.path == path).length;
  if (hasCheck) {
    return true;
  } else {
    return false;
  }
}
checkRouter();
// 路由守卫
router.beforeEach((to, from, next) => {
  store.commit("getToken");
  const token = store.state.token;
  // 如果没有token并且不是登录页面，跳转到登录页面
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } 
  // todo: error here
  else if(!checkRouter(to.path)) { // 如果没有路由，跳转到首页?? why 
    next({ name: "home" });
  }
  else {
    // 如果有token并且是登录页面，跳转到下一个页面
    next();
  }
});
app.use(router).use(store);
app.mount("#app");
