import { menuListType } from './menu';
import { roleResultType } from './role';

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
  user: userInfoType;
  token: string;
}

/**
 * 用户信息类型
 */
export interface userInfoType {
  password: string;
  id: number;
  username: string;
  phone: string;
  email: string;
  userType: number;
  status: number;
  createtime: string;
  updatetime: string;
}

/**
 * 用户基本类型
 */
export interface userType {
  username: string;
  password: string;
  nickname: string;
  phone: string;
  email: string;
  status: boolean;
  description?: string;
}

/**
 * 新增用户类型
 */
export interface addUserType extends userType {
  sex: number;
  userType: number;
}

/**
 * 用户列表类型
 */
export interface userListType extends userType {
  id: number;
  sex: string | number;
  userType: string | number;
  createtime: string;
  updatetime: string;
  roles: roleResultType[];
}

/**
 * 查询用户列表类型
 */
export interface getUserListType {
  page: number;
  limit: number;
  username: string;
  sex: number;
}

/**
 * 获取用户列表返回参数类型
 */
export interface userListResult {
  list: userListType[];
  total: number;
  pageNum: number;
  pageSize: number;
}

/**
 * 用户角色和菜单类型
 */
export interface userRoleAndMenuType {
  roles: roleResultType[];
  menus: menuListType[];
}
