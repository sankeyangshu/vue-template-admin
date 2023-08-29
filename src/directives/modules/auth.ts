import { useUserStore } from '@/store/modules/user';
import { getAuthButtonsList } from '@/utils/routers';
import type { Directive, DirectiveBinding } from 'vue';

/**
 * @description: v-auth 按钮权限指令
 */
const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;

    // 获取用户菜单权限
    const userStore = useUserStore();

    // 用户按钮权限
    const currentPageRoles = getAuthButtonsList(userStore.menus, userStore.routeName);

    if (value instanceof Array && value.length) {
      const hasPermission = value.every((item) => currentPageRoles.includes(item));
      if (!hasPermission) el.remove();
    } else {
      if (!currentPageRoles.includes(value)) el.remove();
    }
  },
};

export default auth;
