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
      title: '系统管理',
      icon: 'Setting',
    },
    children: [
      {
        path: '/system/user',
        name: 'User',
        component: () => import('@/views/system/user/index.vue'),
        meta: { title: '用户管理', icon: 'MenuIcon' },
      },
      {
        path: '/system/role',
        name: 'Roles',
        component: () => import('@/views/system/role/index.vue'),
        meta: { title: '角色管理', icon: 'MenuIcon' },
      },
      {
        path: '/system/menu',
        name: 'Menus',
        component: () => import('@/views/system/menu/index.vue'),
        meta: { title: '菜单管理', icon: 'MenuIcon' },
      },
      {
        path: '/system/dept',
        name: 'dept',
        component: () => import('@/views/system/dept/index.vue'),
        meta: { title: '部门管理', icon: 'MenuIcon' },
      },

      {
        path: '/system/dictionary',
        name: 'dictionary',
        component: () => import('@/views/system/dictionary/index.vue'),
        meta: { title: '字典管理', icon: 'MenuIcon' },
      },
    ],
  },
];

export default systemRoutes;
