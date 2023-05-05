import { defineStore } from 'pinia';
import { loginDataType, postLoginAPI } from '@/api/user';

export const useUserStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'userState',

  // state: 返回对象的函数
  state: () => ({
    token: '', // 登录token
    userInfo: {}, // 用户信息
  }),

  // 可以同步 也可以异步
  actions: {
    // 设置token
    setToken(value: string) {
      this.token = value;
    },
    // 设置用户信息
    setUserInfo(value: any) {
      this.userInfo = value;
    },
    /**
     * 用户登录
     */
    login(userInfo: loginDataType) {
      const { username, password } = userInfo;
      return new Promise<void>(async (resolve, reject) => {
        try {
          const { data } = await postLoginAPI({ username: username.trim(), password: password });
          this.setToken(data.token); // 保存用户token
          this.setUserInfo(data.user);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },
  },

  // 进行持久化存储
  persist: {
    // 本地存储的名称
    key: 'userState',
    // 保存的位置
    storage: window.localStorage, // localstorage
  },
});
