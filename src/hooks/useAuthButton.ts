import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { getAuthButtonsList } from '@/utils/routers';

/**
 * 页面按钮权限
 */
export const useAuthButton = () => {
  // 获取用户菜单权限
  const userStore = useUserStore();

  // 获取路由对象
  const route = useRoute();

  // 用户按钮权限
  const authButtonsList = getAuthButtonsList(userStore.menus, route.path);

  // 控制用户按钮权限显示和隐藏
  const authButtons = computed(() => {
    // 当前页面按钮权限
    const currentPageAuthButton: { [key: string]: boolean } = {};

    authButtonsList.forEach((item) => (currentPageAuthButton[item] = true));

    return currentPageAuthButton;
  });

  return {
    authButtons,
  };
};
