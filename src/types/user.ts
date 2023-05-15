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
 * 新增用户类型
 */
export interface addUserType {
  username: string;
  nickname: string;
  sex: number;
  userType: number;
  phone: string;
  email: string;
  password: string;
  status: boolean;
  description?: string;
}
