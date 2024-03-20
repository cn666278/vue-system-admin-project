import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// 完整引入ElementPlus, 优点是不用一个一个引入组件，缺点是打包后的文件会变大
const app = createApp(App)
// app.use(ElementPlus)
app.use(router) 
app.mount('#app')
