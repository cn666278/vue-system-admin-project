import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/less/index.less'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// 完整引入ElementPlus, 优点是不用一个一个引入组件，缺点是打包后的文件会变大
// app.use(ElementPlus)
app.use(router) 
app.mount('#app')
