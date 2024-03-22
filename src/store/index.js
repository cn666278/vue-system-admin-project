import { createStore } from 'vuex';
// import { createPinia, defineStore } from 'pinia';
// we should use pinia instead of vuex
// https://pinia.vuejs.org/zh/introduction.html#basic-example

// vuex
export default createStore({
    state: {
        isCollapse: true,
    },
    mutations: {
        updateIsCollapse(state, payload) {
            state.isCollapse = !state.isCollapse;
        }
    }
});

// pinia

