import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // On-demand Import : 按需引入ElementPlus, 优点是打包后的文件会变小，缺点是需要一个一个引入组件
    AutoImport({
      resolvers: [ ElementPlusResolver() ],
    }),
    Components({
      resolvers: [ ElementPlusResolver() ],
    }),
    // Manually import
    // 此外还有手动引入（Manually import）的方式，即在组件中直接引入需要的组件，但是这样会导致代码重复, 好处是可以自定义组件名
    // Element Plus 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。（值得研究）
    // Tree Shaking 是一个用于移除 JavaScript 上下文中的未引用代码(dead-code)的优化技术。
    // 它通过静态分析，找出代码中的未引用代码，然后在打包输出时将其删除。
    // 由于 Element Plus 是基于 ES Module 的，所以它能够利用 Tree Shaking 来移除未使用的代码。
    
    // ex. import { ElButton, ElInput } from 'element-plus'
    // https://element-plus.org/en-US/guide/quickstart.html#manually-import
    ]
})
