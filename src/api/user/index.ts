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
 * 登录返回参数类型
 */
export interface userInfoRepType {
  user: {
    password: string;
    id: number;
    username: string;
    contact: string;
    email: string;
    userType: number;
    status: number;
    createtime: string;
    updatetime: string;
  };
  token: string;
}

/**
 * @description: 用户登录
 * @param {loginDataType} data 登录参数
 * @return  返回请求登录接口的结果
 */
export function postLoginAPI(data: loginDataType) {
  return http.post<userInfoRepType>(api.login, data);
}
