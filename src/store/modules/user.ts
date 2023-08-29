import { defineStore } from 'pinia';
import { postLoginAPI, getUserRolesAPI } from '@/api/System/user';
import { loginDataType, userInfoType } from '@/types/user';
import { router } from '@/router';
import { roleResultType } from '@/types/role';
import { menuListType } from '@/types/menu';

interface userStateType {
  token: string;
  userInfo: userInfoType | {};
  roles: roleResultType[];
  menus: menuListType[];
  routeName: string;
}

export const useUserStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'userState',

  // state: 返回对象的函数
  state: (): userStateType => ({
    token: '', // 登录token
    userInfo: {}, // 用户信息
    roles: [], // 权限角色
    menus: [], // 菜单
    routeName: '', // 当前页面的 router name，用来做按钮权限筛选
  }),

  // 可以同步 也可以异步
  actions: {
    // 设置token
    setToken(value: string) {
      this.token = value;
    },
    // 设置用户信息
    setUserInfo(value: userInfoType | {}) {
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
          await this.getRoles(data.user.id);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },
    // 获取用户授权角色信息
    getRoles(id: number) {
      return new Promise<void>(async (resolve) => {
        // 获取权限列表
        const { data } = await getUserRolesAPI({ id });
        this.roles = data.roles;
        this.menus = data.menus;
        resolve();
      });
    },
    // 设置当前页面的 RouteName
    setRouteName(name: string) {
      this.routeName = name;
    },
    /**
     * 用户退出登录
     */
    logout(goLogin = false) {
      this.token = '';
      this.userInfo = {};
      goLogin && router.push('/login');
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
