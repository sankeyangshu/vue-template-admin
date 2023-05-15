import http from '@/utils/request';
import { addUserType, loginDataType, userInfoRepType } from '@/types/user';

// api接口
const api = {
  login: '/api/auth/signin', // 用户登录接口
  addUser: '/api/user/create', // 新增用户
};

/**
 * @description: 用户登录
 * @param {loginDataType} data 登录参数
 * @return 返回请求登录接口的结果
 */
export function postLoginAPI(data: loginDataType) {
  return http.post<userInfoRepType>(api.login, data);
}

/**
 * @description: 新增用户
 * @param {addUserType} data 用户信息
 * @return 新增结果
 */
export function postAddUserAPI(data: addUserType) {
  return http.post(api.addUser, data);
}
