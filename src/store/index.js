import { createStore } from "vuex";
// import { createPinia, defineStore } from 'pinia';
// we should use pinia instead of vuex
// https://pinia.vuejs.org/zh/introduction.html#basic-example

import Cookie from "js-cookie";

// vuex
export default createStore({
  state: {
    isCollapse: true,
    currentMenu: null,
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "home page",
        icon: "home",
      },
    ],
    menu: [],
    token: "",
  },
  mutations: {
    updateIsCollapse(state, payload) {
      state.isCollapse = !state.isCollapse;
    },
    selectMenu(state, val) {
      // 判断
      val.name === "home"
        ? (state.currentMenu = null)
        : (state.currentMenu = val);
      if (val.name == "home") {
        // 判断是否为首页
        state.currentMenu = null;
      } else {
        // 判断是否已经存在
        state.currentMenu = val;
        let result = state.tabsList.findIndex((item) => item.name === val.name);
        result === -1 ? state.tabsList.push(val) : "";
      }
    },
    closeTab(state, val) {
      let result = state.tabsList.findIndex((item) => item.name === val.name); // 根据name查找索引
      state.tabsList.splice(result, 1); // 删除,splice(开始位置, 删除个数)
    },
    setMenu(state, val) {
      state.menu = val;
      localStorage.setItem("menu", JSON.stringify(val)); // 存储到本地, 以便刷新时不丢失
    },
    // 添加菜单，用于刷新时不丢失, 从本地存储中获取
    // 因为vue是单向数据流， 无法数据持久化，所以需要在刷新时重新获取
    addMenu(state, router) {
      if (!localStorage.getItem("menu")) {
        return;
      }
      const menu = JSON.parse(localStorage.getItem("menu")); // 获取本地存储
      state.menu = menu;

      const menuArray = [];
      // 解决路由懒加载问题
      // https://cloud.tencent.com/developer/article/2160376
      const modules = import.meta.glob(['../views/*/*.vue','../views/*.vue']); // 动态导入所有的vue文件

      // 实现动态路由
      // 遍历menu, 将menu中的children提取出来
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map((item) => {
            let url = `../views/${item.url}.vue`;
            // item.component = () => import(url)
            item.component = modules[url];
            return item;
          });
          menuArray.push(...item.children); // 将children添加到menuArray中
        } else {
          let url = `../views/${item.url}.vue`;
          // item.component = () => import(url)
          item.component = modules[url];
          menuArray.push(item);
        }
      });
      menuArray.forEach((item) => {
        router.addRoute("home1", item);
      });
    },
    // 退出登录
    cleanMenu(state) {
      state.menu = [];
      state.tabsList = [];
      localStorage.removeItem("menu");
      // fixed bugs: 清除tabsList
      localStorage.removeItem("tabsList");
    },
    // 路由守卫
    // 设置token
    setToken(state, val) {
      state.token = val;
      Cookie.set("token", val);
    },
    // 清除token
    clearToken(state) {
      state.token = "";
      Cookie.remove("token");
    },
    // 获取token
    getToken(state) {
      state.token = state.token || Cookie.get("token");
    },
  },
});

// pinia 考虑用pinia替代vuex
