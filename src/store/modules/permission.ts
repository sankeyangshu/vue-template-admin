import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { filterKeepAlive } from '@/utils/routers';
import { asyncRoutes } from '@/router';

interface permissionStateType {
  authMenuList: RouteRecordRaw[];
}

export const usePermissionStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'permissionState',

  // state: 返回对象的函数
  state: (): permissionStateType => ({
    authMenuList: [], // 处理之后侧边栏菜单列表
  }),

  getters: {
    keepAliveRoutes: () => {
      return filterKeepAlive(asyncRoutes);
    },
  },

  // 可以同步 也可以异步
  actions: {},
});
