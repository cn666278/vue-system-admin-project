import { createStore } from 'vuex';
// import { createPinia, defineStore } from 'pinia';
// we should use pinia instead of vuex
// https://pinia.vuejs.org/zh/introduction.html#basic-example

// vuex
export default createStore({
    state: {
        isCollapse: true,
        currentMenu: null,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: 'home page',
                icon: 'home'
            }
        ]
    },
    mutations: {
        updateIsCollapse(state, payload) {
            state.isCollapse = !state.isCollapse;
        },
        selectMenu(state, val){
            // 判断
            val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val);
            if(val.name == 'home'){ // 判断是否为首页
                state.currentMenu = null;
            } else{ // 判断是否已经存在
                state.currentMenu = val;
                let result = state.tabsList.findIndex(item => item.name === val.name);
                result === -1 ? state.tabsList.push(val) : '';
            
            }
        },
        closeTab(state, val){
            let result = state.tabsList.findIndex(item => item.name === val.name); // 根据name查找索引
            state.tabsList.splice(result, 1); // 删除,splice(开始位置, 删除个数)
        }
    }
});

// pinia 考虑用pinia替代vuex

