import { computed } from 'vue';
import { useSettingStore } from '@/store/modules/setting';

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
    if (themeConfig.value.isGrey) changeGreyOrWeak('grey', true);
    if (themeConfig.value.isWeak) changeGreyOrWeak('weak', true);
  };

  return {
    switchDark,
    changeGreyOrWeak,
    initTheme,
  };
};
