import { ElMessage } from 'element-plus';
import { computed } from 'vue';
import { DEFAULT_THEMECOLOR } from '@/config';
import { useSettingStore } from '@/store/modules/setting';
import { getDarkColor, getLightColor } from '@/utils/color';

type GreyOrWeakType = 'grey' | 'weak';

/**
 * @description: 全局主题设置
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
  };

  // 修改主题颜色
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

  // 灰色和弱色切换
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

  // 初始化主题
  const initTheme = () => {
    switchDark();
    changeThemeColor(themeConfig.value.themeColor);

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
  };
};
