/*
 * @Description: 项目入口文件
 * @Author: 三棵杨树
 * @Date: 2022-10-14 19:27:13
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2022-10-27 20:47:41
 */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'normalize.css'; // 统一各个浏览器之间的显示差异
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const pinia = createPinia();
const app = createApp(App); // 创建实例

app.use(ElementPlus);
app.use(pinia).use(router).mount('#app');
