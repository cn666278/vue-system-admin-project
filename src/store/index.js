import { createStore } from 'vuex';
// or we can import pinia
// import { createPinia } from 'pinia'; 

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