/*
 * @Description: 路由配置文件
 * @Author: 三棵杨树
 * @Date: 2022-10-14 19:27:13
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2022-10-27 20:36:08
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
