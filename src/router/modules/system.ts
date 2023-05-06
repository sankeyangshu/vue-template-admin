import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layouts/index.vue';

/**
 * 系统设置路由
 */
const systemRoutes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'System',
    meta: {
      title: 'system',
      icon: 'Setting',
    },
    children: [
      {
        path: '/system/user',
        name: 'User',
        component: () => import('@/views/System/Users/index.vue'),
        meta: { title: 'userManage', icon: 'Menu' },
      },
      {
        path: '/system/role',
        name: 'Roles',
        component: () => import('@/views/System/Roles/index.vue'),
        meta: { title: 'roleManage', icon: 'Menu' },
      },
      {
        path: '/system/menu',
        name: 'Menus',
        component: () => import('@/views/System/Menus/index.vue'),
        meta: { title: 'menuManage', icon: 'Menu' },
      },
      {
        path: '/system/dept',
        name: 'dept',
        component: () => import('@/views/System/Depts/index.vue'),
        meta: { title: 'deptManage', icon: 'Menu' },
      },
    ],
  },
];

export default systemRoutes;
