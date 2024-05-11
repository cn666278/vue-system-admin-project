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
        ],
        menu: []
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
        },
        setMenu(state, val){
            state.menu = val;
            localStorage.setItem('menu', JSON.stringify(val)); // 存储到本地, 以便刷新时不丢失
        },
        // 添加菜单，用于刷新时不丢失, 从本地存储中获取
        // 因为vue是单向数据流， 无法数据持久化，所以需要在刷新时重新获取
        addMenu(state){
            if(!localStorage.getItem('menu')){ 
                return;
            }
            const menu = JSON.parse(localStorage.getItem('menu')); // 获取本地存储
            state.menu = menu; 
        }
    }
});

// pinia 考虑用pinia替代vuex

