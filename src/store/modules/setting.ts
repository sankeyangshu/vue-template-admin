import { defineStore } from 'pinia';

export const useSettingStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'settingState',

  // state: 返回对象的函数
  state: () => ({
    isCollapse: false, // 是否收缩左侧菜单栏
    themeConfig: {
      isDark: false, // 深色模式 切换暗黑模式
    }, // 主题设置
  }),

  // actions: 可以同步 也可以异步
  actions: {
    // 设置左侧菜单的展开与收缩
    setCollapse(value: boolean) {
      this.isCollapse = value;
    },
    // TODO设置主题
    setThemeConfig(val: any) {
      this.themeConfig = val;
    },
  },
});
