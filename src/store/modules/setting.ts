import { defineStore } from 'pinia';
import { DEFAULT_THEMECOLOR } from '@/config';

/**
 * 组件尺寸类型
 */
export type componentSizeType = 'large' | 'default' | 'small';

/**
 * 布局类型
 */
export type layoutType = 'vertical' | 'classic' | 'transverse' | 'columns';

interface settingsStateType {
  isCollapse: boolean;
  language: string;
  isReload: boolean;
  componentSize: componentSizeType;
  themeConfig: themeConfigType;
}

/**
 * 主题设置类型
 */
interface themeConfigType {
  layout: layoutType;
  showSetting: boolean;
  themeColor: string;
  isDark: boolean;
  isGrey: boolean;
  isWeak: boolean;
  showTag: boolean;
  fixedHeader: boolean;
  showLogo: boolean;
  uniqueOpened: boolean;
}

/**
 * 主题设置key类型
 */
export type themeConfigKeyType = keyof themeConfigType;

export const useSettingStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'settingState',

  // state: 返回对象的函数
  state: (): settingsStateType => ({
    isCollapse: false, // 是否收缩左侧菜单栏
    language: 'zhCn', // 国际化-默认是zhCn
    isReload: true, // 是否刷新当前页
    componentSize: 'default', // 组件大小切换
    themeConfig: {
      layout: 'classic', // 布局模式 (纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns)
      showSetting: false, // 显示设置
      themeColor: DEFAULT_THEMECOLOR, // 主题颜色
      isDark: false, // 深色模式 切换暗黑模式
      isGrey: false, // 灰色模式
      isWeak: false, // 色弱模式
      showTag: true, // tagsView 是否展示 默认展示
      fixedHeader: true, // 固定header
      showLogo: true, // 显示侧边栏Logo
      uniqueOpened: true, // 是否只保持一个子菜单的展开
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
    // 设置组件尺寸
    setComponentSize(value: componentSizeType) {
      this.componentSize = value;
    },
    // 设置主题
    setThemeConfig(key: themeConfigKeyType, val: string | boolean) {
      (this.themeConfig[key] as string | boolean) = val;
    },
  },

  // 进行持久化存储
  persist: {
    // 本地存储的名称
    key: 'settingState',
    // 保存的位置
    storage: window.localStorage, // localstorage
  },
});
