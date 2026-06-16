/**
 * Teamable 应用入口文件 (main.js)
 * 功能：创建 Vue 应用实例并挂载到 DOM 节点
 */

import  {createApp} from 'vue'   // 引入 Vue 3 的 createApp 方法
import App from './App.vue'       // 引入根组件 App

// 创建 Vue 应用实例并挂载到 index.html 中 id 为 "app" 的 DOM 元素上
createApp(App).mount('#app')
