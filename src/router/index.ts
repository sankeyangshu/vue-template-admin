import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layouts/index.vue';
import systemRoutes from './modules/system';

/**
 * 异步路由组件
 */
export const asyncRoutes = [...systemRoutes];

/**
 * 公共路由
 * path ==> 路由路径
 * name ==> 路由名称
 * component ==> 路由组件
 * redirect ==> 路由重定向
 * alwaysShow ==> 如果设置为true，将始终显示根菜单，无论其子路由长度如何
 * hidden ==> 如果“hidden:true”不会显示在侧边栏中（默认值为false）
 * keepAlive ==> 设为true 缓存
 * meta ==> 路由元信息
 * meta.title ==> 路由标题
 * meta.icon ==> 菜单icon
 * meta.full ==> 菜单是否全屏 (示例：数据大屏页面)
 * meta.affix ==> 如果设置为true将会出现在 标签栏中
 * meta.breadcrumb ==> 如果设置为false，该项将隐藏在breadcrumb中（默认值为true）
 */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/ErrorPages/404.vue'),
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/ErrorPages/403.vue'),
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/index.vue'),
        meta: { title: 'home', icon: 'House', affix: true },
      },
    ],
  },
];

/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
  path: '/:pathMatch(.*)*',
  name: 'notFound',
  redirect: '/404',
};

/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 */
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoutes, ...asyncRoutes],
});

/**
 * 配置路由器
 * @param app vue实例
 */
export function setupRouter(app: App<Element>) {
  app.use(router);
}
