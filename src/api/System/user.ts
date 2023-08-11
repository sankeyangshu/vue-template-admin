import http from '@/utils/request';
import {
  addUserType,
  getUserListType,
  loginDataType,
  userInfoRepType,
  userListResult,
} from '@/types/user';

// api接口
const api = {
  login: '/api/auth/signin', // 用户登录接口
  addUser: '/api/user/create', // 新增用户
  userList: '/api/user/getAll', // 获取用户列表
  updateUser: '/api/user/update', // 更新用户信息
  deleteUser: '/api/user/delete', // 删除用户
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

/**
 * @description: 获取用户列表
 * @param {getUserListType} data 分页信息
 * @return 用户列表
 */
export function postGetUserListAPI(data: Partial<getUserListType>) {
  return http.post<userListResult>(api.userList, data);
}

/**
 * @description: 更新用户信息
 * @param {updateUserType} data 用户信息
 * @return 更新结果
 */
export function patchUpdateUserAPI(data: Partial<addUserType>) {
  return http.patch(api.updateUser, data);
}

/**
 * @description: 删除用户
 * @param {object} data 删除用户信息
 * @return 删除结果
 */
export function deleteUserAPI(data: { id: number }) {
  return http.remove(api.deleteUser, data);
}
