import {
  addUserType,
  getUserListType,
  loginDataType,
  userInfoRepType,
  userListResult,
  userRoleAndMenuType,
} from '@/types/user';
import http from '@/utils/request';

// api接口
const api = {
  login: '/api/auth/signin', // 用户登录接口
  addUser: '/api/user/create', // 新增用户
  userList: '/api/user/getAll', // 获取用户列表
  userRoles: '/api/user/getUserRoles', // 获取用户角色
  updateUser: '/api/user/update', // 更新用户信息
  deleteUser: '/api/user/delete', // 删除用户
};

/**
 * 用户登录
 * @param {loginDataType} data 登录参数
 * @return 返回请求登录接口的结果
 */
export function postLoginAPI(data: loginDataType) {
  return http.post<userInfoRepType>(api.login, data);
}

/**
 * 新增用户
 * @param {addUserType} data 用户信息
 * @return 新增结果
 */
export function postAddUserAPI(data: addUserType) {
  return http.post(api.addUser, data);
}

/**
 * 获取用户列表
 * @param {getUserListType} data 分页信息
 * @return 用户列表
 */
export function postGetUserListAPI(data: Partial<getUserListType>) {
  return http.post<userListResult>(api.userList, data);
}

/**
 * 获取用户角色列表
 * @param {object} data 用户id
 * @return 用户角色列表
 */
export function getUserRolesAPI(data: { id: number }) {
  return http.get<userRoleAndMenuType>(api.userRoles, data);
}

/**
 * 更新用户信息
 * @param {updateUserType} data 用户信息
 * @return 更新结果
 */
export function patchUpdateUserAPI(data: Partial<addUserType>) {
  return http.patch(api.updateUser, data);
}

/**
 * 删除用户
 * @param {object} data 删除用户信息
 * @return 删除结果
 */
export function deleteUserAPI(data: { id: number }) {
  return http.remove(api.deleteUser, data);
}
