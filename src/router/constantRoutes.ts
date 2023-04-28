import { RouteRecordRaw } from 'vue-router';

/**
 * 静态路由
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
    meta: { title: '404', icon: 'House' },
    component: () => import('@/views/ErrorPages/404.vue'),
  },
  {
    path: '/403',
    name: '403',
    meta: { title: '403', icon: 'House' },
    component: () => import('@/views/ErrorPages/403.vue'),
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
