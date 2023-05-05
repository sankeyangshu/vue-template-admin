import http from '@/utils/request';
import { loginDataType, userInfoRepType } from '@/types/user';

// api接口
const api = {
  login: '/api/auth/signin', // 用户登录接口
};

/**
 * @description: 用户登录
 * @param {loginDataType} data 登录参数
 * @return  返回请求登录接口的结果
 */
export function postLoginAPI(data: loginDataType) {
  return http.post<userInfoRepType>(api.login, data);
}
