import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layouts/index.vue';
import { constantRoutes } from './constantRoutes';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    meta: { title: '首页', icon: 'House' },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/index.vue'),
        meta: { title: '首页', icon: 'House' },
      },
    ],
  },
  ...constantRoutes,
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
