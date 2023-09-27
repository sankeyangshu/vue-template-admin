import { menuListType } from '@/types/menu';
import { roleListResult, roleResultType, roleType } from '@/types/role';
import http from '@/utils/request';

// api接口
const api = {
  addRole: '/api/roles/create', // 创建角色
  rolesList: '/api/roles/getAll', // 获取角色列表
  getRoleMenus: '/api/roles/getRoleMenu', // 获取角色菜单
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
  isNotPage?: boolean;
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
  return http.post<roleResultType[] | roleListResult>(api.rolesList, data);
}

/**
 * @description: 获取角色菜单
 * @param {object} data 角色id
 * @param {number} data.roleID 角色id
 * @return 角色菜单
 */
export function getRoleMenuAPI(data: { roleID: number }) {
  return http.get<menuListType[]>(api.getRoleMenus, data);
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
