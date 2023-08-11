import http from '@/utils/request';
import { roleType } from '@/types/role';

// api接口
const api = {
  addRole: '/api/roles/create', // 创建角色
  rolesList: '/api/roles/getAll', // 获取角色列表
  updateRole: '/api/roles/update', // 更新角色
  deleteRole: '/api/roles/delete', // 删除角色
};

/**
 * 分页类型
 */
export type rolePageSizeType = {
  id: number;
  roleName: string;
  status: boolean;
  pageNum: number;
  pageSize: number;
};

/**
 * @description: 创建角色
 * @param {roleType} data 角色信息
 * @return 新增结果
 */
export function postAddRoleAPI(data: roleType) {
  return http.post(api.addRole, data);
}

/**
 * @description: 获取角色信息列表
 * @param {rolePageSizeType} data 分页信息
 * @return 角色信息列表
 */
export function postGetRoleListAPI(data: Partial<rolePageSizeType>) {
  return http.post(api.rolesList, data);
}

/**
 * @description: 更新角色信息
 * @param {roleType} data 角色信息
 * @return 更新结果
 */
export function patchUpdateRoleAPI(data: Partial<roleType>) {
  return http.patch(api.updateRole, data);
}

/**
 * @description: 删除角色
 * @param {object} data 删除角色信息
 * @return 删除结果
 */
export function deleteRoleAPI(data: { id: number }) {
  return http.remove(api.deleteRole, data);
}
