# Vue 3 + Vite

项目简介：Vue后台管理系统
- 项目简介：一个后台前端解决方案,使用了许多最新的前端技术栈、动态路由，权限验证，并且有着丰富的组件和功能。
-	主要技术栈： Vue3、Vite、JavaScript、Vuex(考虑替换为Pinia)、Element Plus、Axios、Vue Router
-	主要工作：
  1.  项目使用Vite脚手架搭建，配合使用Element Plus，使用vite自动生成路由，优化路由
  2.	实现用户表单中的新增，编辑和删除功能，日期格式化以及表单验证。
  3.	ApiFox 手写api接口，并配合mock.js进行数据模拟
  4.	使用Echarts绘制数据图（线图，饼图，柱状图）
  5.	导航栏面包屑实现，使用Vuex实现跨组件通信，:deep() !important 实现样式穿透, tab标签路由实现
  6.	实现数据持久化，刷新页面后，vuex中的数据不会丢失，数据持久化的原理是将数据存储到localStorage中，当页面刷新时，从localStorage中取出数据，再存储到vuex中
  7.	动态路由，路由守卫
  8.	使用setup重构项目代码，简化返回
  9.	添加提示dialog
