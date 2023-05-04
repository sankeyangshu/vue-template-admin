import http from '@/utils/request';

// api接口
const api = {
  login: '/api/auth/signin', // 用户登录接口
};

/**
 * 登录请求参数类型
 */
export type loginDataType = {
  username: string;
  password: string;
};

/**
 * @description: 用户登录
 * @param {loginDataType} data 登录参数
 * @return  返回请求登录接口的结果
 */
export function postLoginAPI(data: loginDataType) {
  return http.post(api.login, data);
}
