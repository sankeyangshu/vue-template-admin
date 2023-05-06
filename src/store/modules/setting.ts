import { defineStore } from 'pinia';
import { IObjectKeys } from '@/types';

interface settingsStateType {
  isCollapse: boolean;
  language: string;
  isReload: boolean;
  themeConfig: themeConfigType;
}

/**
 * 主题设置类型
 */
interface themeConfigType extends IObjectKeys {
  isDark: boolean;
  showTag: boolean;
  fixedHeader: boolean;
}

export const useSettingStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'settingState',

  // state: 返回对象的函数
  state: (): settingsStateType => ({
    isCollapse: false, // 是否收缩左侧菜单栏
    language: 'zhCn', // 国际化-默认是zhCn
    isReload: true, // 是否刷新当前页
    themeConfig: {
      isDark: false, // 深色模式 切换暗黑模式
      showTag: true, // tagsView 是否展示 默认展示
      fixedHeader: true, // 固定header
    }, // 主题设置
  }),

  // actions: 可以同步 也可以异步
  actions: {
    // 设置左侧菜单的展开与收缩
    setCollapse(value: boolean) {
      this.isCollapse = value;
    },
    // 设置国际化
    setLanguage(value: string) {
      this.language = value;
    },
    // 刷新当前页
    setReload() {
      this.isReload = false;
      setTimeout(() => {
        this.isReload = true;
      }, 50);
    },
    // 设置主题
    setThemeConfig(key: string, val: any) {
      this.themeConfig[key] = val;
    },
  },
});
