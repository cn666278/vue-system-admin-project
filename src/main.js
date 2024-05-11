import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/less/index.less'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store' 


import './api/mock.js'
import api from './api/api'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// 完整引入ElementPlus, 优点是不用一个一个引入组件，缺点是打包后的文件会变大
// app.use(ElementPlus)
app.config.globalProperties.$api = api;
store.commit('addMenu', router); //我们应该在创建Vue实例之前调用addMenu方法，以便在刷新时不丢失数据
app.use(router).use(store)
app.mount('#app')
