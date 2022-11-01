/*
 * @Description: 路由配置文件
 * @Author: 三棵杨树
 * @Date: 2022-10-14 19:27:13
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2022-10-31 19:54:34
 */

import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
  },
];

// 创建一个可以被 Vue 应用程序使用的路由实例
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router);
}
