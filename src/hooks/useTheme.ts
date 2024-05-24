import { ElMessage } from 'element-plus';
import { computed } from 'vue';
import { DEFAULT_THEMECOLOR } from '@/config';
import { useSettingStore } from '@/store/modules/setting';
import { headerTheme, menuTheme, sidebarTheme } from '@/styles/theme';
import { getDarkColor, getLightColor } from '@/utils/color';

/**
 * 主题类型
 */
export type ThemeType = 'light' | 'inverted' | 'dark';

/**
 * 灰色和弱色类型
 */
export type GreyOrWeakType = 'grey' | 'weak';

/**
 * 全局主题设置
 */
export const useTheme = () => {
  // 获取全局状态管理仓库中系统设置状态
  const settingStore = useSettingStore();
  const themeConfig = computed(() => settingStore.themeConfig);

  // 切换暗黑模式
  const switchDark = () => {
    const body = document.documentElement;

    if (themeConfig.value.isDark) {
      body.setAttribute('class', 'dark');
    } else {
      body.setAttribute('class', '');
    }

    // 同时修改主题色、侧边栏、头部颜色
    changeThemeColor(themeConfig.value.themeColor);
    changeSideBarTheme();
    changeHeaderTheme();
  };

  /**
   * 修改主题颜色
   * @param {string} val 主题色
   */
  const changeThemeColor = (val: string | null) => {
    if (!val) {
      val = DEFAULT_THEMECOLOR;
      ElMessage({ type: 'success', message: `主题颜色已重置为 ${DEFAULT_THEMECOLOR}` });
    }
    // 计算主题颜色变化
    document.documentElement.style.setProperty('--el-color-primary', val);
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      themeConfig.value.isDark ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`
    );
    for (let i = 1; i <= 9; i++) {
      const primaryColor = themeConfig.value.isDark
        ? `${getDarkColor(val, i / 10)}`
        : `${getLightColor(val, i / 10)}`;
      document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor);
    }
    settingStore.setThemeConfig('themeColor', val);
  };

  /**
   * 灰色和弱色切换
   * @param {GreyOrWeakType} type 类型
   * @param {boolean} value 值
   */
  const changeGreyOrWeak = (type: GreyOrWeakType, value: boolean) => {
    const body = document.body as HTMLElement;
    if (!value) return body.removeAttribute('style');
    const styles: Record<GreyOrWeakType, string> = {
      grey: 'filter: grayscale(1)',
      weak: 'filter: invert(80%)',
    };
    body.setAttribute('style', styles[type]);
    const propName = type === 'grey' ? 'isWeak' : 'isGrey';
    settingStore.setThemeConfig(propName, false);
  };

  /**
   * 设置菜单样式
   */
  const changeMenuTheme = () => {
    let type: ThemeType = 'light';

    // 判断是否是暗黑主题
    if (themeConfig.value.isDark) {
      type = 'dark';
    }

    const theme = menuTheme[type];
    // 遍历写入样式
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
  };

  /**
   * 设置侧边栏样式
   */
  const changeSideBarTheme = () => {
    let type: ThemeType = 'light';

    // 判断是否是暗黑主题
    if (themeConfig.value.isDark) {
      type = 'dark';
    }

    const theme = sidebarTheme[type];
    // 遍历写入样式
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }

    changeMenuTheme();
  };

  /**
   * 设置头部样式
   */
  const changeHeaderTheme = () => {
    let type: ThemeType = 'light';

    // 判断是否是暗黑主题
    if (themeConfig.value.isDark) {
      type = 'dark';
    }

    const theme = headerTheme[type];
    // 遍历写入样式
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }

    changeMenuTheme();
  };

  // 初始化主题
  const initTheme = () => {
    switchDark();

    // 判断是否是灰色模式
    if (themeConfig.value.isGrey) changeGreyOrWeak('grey', true);

    // 判断是否色弱模式
    if (themeConfig.value.isWeak) changeGreyOrWeak('weak', true);
  };

  return {
    switchDark,
    changeThemeColor,
    changeGreyOrWeak,
    initTheme,
    changeSideBarTheme,
    changeHeaderTheme,
  };
};
