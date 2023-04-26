import { defineStore } from 'pinia';

export const useSettingStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'settingState',

  // state: 返回对象的函数
  state: () => ({
    themeConfig: {
      isDark: false, // 深色模式 切换暗黑模式
    }, // 主题设置
  }),

  // actions: 可以同步 也可以异步
  actions: {
    // TODO设置主题
    setThemeConfig(val: any) {
      this.themeConfig = val;
    },
  },
});
