/*
 * @Description: 项目入口文件
 * @Author: 三棵杨树
 * @Date: 2022-10-14 19:27:13
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2022-10-28 20:55:19
 */
import { createApp } from 'vue';
import { setupStore } from '@/store';
import { setupRouter } from '@/router';
import App from './App.vue';
import 'normalize.css'; // 统一各个浏览器之间的显示差异
import setupElementPlus from '@/plugins/element'; // 导入element

function bootstrap() {
  // 创建实例
  const app = createApp(App);

  // 配置 store
  setupStore(app);

  // 配置路由
  setupRouter(app);

  // 导入element和全局注册element 图标
  setupElementPlus(app);

  app.mount('#app');
}

bootstrap();
