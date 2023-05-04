import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'userState',

  // state: 返回对象的函数
  state: () => ({
    token: '', // 登录token
  }),

  // 可以同步 也可以异步
  actions: {
    // 设置token
    setToken(value: string) {
      this.token = value;
    },
  },
});
