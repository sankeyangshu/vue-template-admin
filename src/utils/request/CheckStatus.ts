import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/modules/user';
import { i18n } from '@/i18n';

/**
 * @description: 校验网络请求状态码
 * @param {number} status 状态码
 */
export const checkStatus = (status: number): void => {
  // user store
  const userStore = useUserStore();

  switch (status) {
    case 400:
      ElMessage.error(i18n.global.t('api.errMsg400'));
      break;
    case 401:
      ElMessage.error(i18n.global.t('api.errMsg401'));
      // 退出登录
      userStore.logout(true);
      break;
    case 403:
      ElMessage.error(i18n.global.t('api.errMsg403'));
      break;
    case 404:
      ElMessage.error(i18n.global.t('api.errMsg404'));
      break;
    case 405:
      ElMessage.error(i18n.global.t('api.errMsg405'));
      break;
    case 408:
      ElMessage.error(i18n.global.t('api.errMsg408'));
      break;
    case 500:
      ElMessage.error(i18n.global.t('api.errMsg500'));
      break;
    case 502:
      ElMessage.error(i18n.global.t('api.errMsg502'));
      break;
    case 503:
      ElMessage.error(i18n.global.t('api.errMsg503'));
      break;
    case 504:
      ElMessage.error(i18n.global.t('api.errMsg504'));
      break;
    default:
      ElMessage.error(i18n.global.t('api.errMsgdefault'));
  }
};
