import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { filterAsyncRoutes, filterKeepAlive } from '@/utils/routers';
import { asyncRoutes, constantRoutes, notFoundRouter } from '@/router';

interface permissionStateType {
  routes: RouteRecordRaw[];
  dynamicRoutes: RouteRecordRaw[];
}

export const usePermissionStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'permissionState',

  // state: 返回对象的函数
  state: (): permissionStateType => ({
    routes: [], // 路由
    dynamicRoutes: [], // 动态路由
  }),

  getters: {
    permission_routes: (state) => {
      return state.routes;
    },
    keepAliveRoutes: () => {
      return filterKeepAlive(asyncRoutes);
    },
  },

  // 可以同步 也可以异步
  actions: {
    // 生成路由
    generateRoutes(roles: string[]): Promise<RouteRecordRaw[]> {
      return new Promise((resolve) => {
        // 在这判断是否有权限，哪些角色拥有哪些权限
        let accessedRoutes;
        if (roles && roles.length && roles.includes('admin')) {
          console.log('first');
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        } else {
          accessedRoutes = asyncRoutes || [];
        }
        accessedRoutes = accessedRoutes.concat(notFoundRouter);
        this.routes = constantRoutes.concat(accessedRoutes);
        this.dynamicRoutes = accessedRoutes;
        resolve(accessedRoutes);
      });
    },
  },
});
