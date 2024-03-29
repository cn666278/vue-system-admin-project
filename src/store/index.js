import { createStore } from 'vuex';
// import { createPinia, defineStore } from 'pinia';
// we should use pinia instead of vuex
// https://pinia.vuejs.org/zh/introduction.html#basic-example

// vuex
export default createStore({
    state: {
        isCollapse: true,
        currentMenu: null,
    },
    mutations: {
        updateIsCollapse(state, payload) {
            state.isCollapse = !state.isCollapse;
        },
        selectMenu(state, val){
            // 判断
            val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val);
        }
    }
});

// pinia 考虑用pinia替代vuex

