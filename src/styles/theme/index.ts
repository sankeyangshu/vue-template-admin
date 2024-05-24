import { ThemeType } from '@/hooks/useTheme';

/**
 * 头部主题色值
 */
export const headerTheme: Record<ThemeType, { [key: string]: string }> = {
  light: {
    '--el-header-logo-text-color': '#303133',
    '--el-header-bg-color': '#ffffff',
    '--el-header-text-color': '#303133',
    '--el-header-text-color-regular': '#606266',
    '--el-header-border-color': '#e4e7ed',
  },
  inverted: {
    '--el-header-logo-text-color': '#dadada',
    '--el-header-bg-color': '#191a20',
    '--el-header-text-color': '#e5eaf3',
    '--el-header-text-color-regular': '#cfd3dc',
    '--el-header-border-color': '#414243',
  },
  dark: {
    '--el-header-logo-text-color': '#dadada',
    '--el-header-bg-color': '#141414',
    '--el-header-text-color': '#e5eaf3',
    '--el-header-text-color-regular': '#cfd3dc',
    '--el-header-border-color': '#414243',
  },
};

/**
 * 侧边栏主题色值
 */
export const sidebarTheme: Record<ThemeType, { [key: string]: string }> = {
  light: {
    '--el-aside-logo-text-color': '#303133',
    '--el-aside-border-color': '#e4e7ed',
  },
  inverted: {
    '--el-aside-logo-text-color': '#dadada',
    '--el-aside-border-color': '#414243',
  },
  dark: {
    '--el-aside-logo-text-color': '#dadada',
    '--el-aside-border-color': '#414243',
  },
};

/**
 * 菜单主题色值
 */
export const menuTheme: Record<ThemeType, { [key: string]: string }> = {
  light: {
    '--el-menu-bg-color': '#ffffff',
    '--el-menu-hover-bg-color': '#cccccc',
    '--el-menu-active-bg-color': 'var(--el-color-primary-light-9)',
    '--el-menu-text-color': '#333333',
    '--el-menu-active-color': 'var(--el-color-primary)',
    '--el-menu-hover-text-color': '#333333',
    '--el-menu-horizontal-sub-item-height': '50px',
  },
  inverted: {
    '--el-menu-bg-color': '#191a20',
    '--el-menu-hover-bg-color': '#000000',
    '--el-menu-active-bg-color': '#000000',
    '--el-menu-text-color': '#bdbdc0',
    '--el-menu-active-color': '#ffffff',
    '--el-menu-hover-text-color': '#ffffff',
    '--el-menu-horizontal-sub-item-height': '50px',
  },
  dark: {
    '--el-menu-bg-color': '#141414',
    '--el-menu-hover-bg-color': '#000000',
    '--el-menu-active-bg-color': '#000000',
    '--el-menu-text-color': '#bdbdc0',
    '--el-menu-active-color': '#ffffff',
    '--el-menu-hover-text-color': '#ffffff',
    '--el-menu-horizontal-sub-item-height': '50px',
  },
};
