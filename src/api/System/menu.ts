import { menuListType, menuType } from '@/types/menu';
import http from '@/utils/request';

// api接口
const api = {
  addMenu: '/api/resources/create', // 创建菜单
  menuList: '/api/resources/getAll', // 获取菜单列表
  menuDetails: '/api/resources/get', // 获取菜单详情
  userMenu: '/api/resources/getUserMenu', // 用户菜单列表
  updateMenu: '/api/resources/update', // 更新菜单
  deleteMenu: '/api/resources/delete', // 删除菜单
};

/**
 * @description: 创建菜单
 * @param {menuType} data 菜单信息
 * @return 新增结果
 */
export function postAddMenuAPI(data: menuType) {
  return http.post(api.addMenu, data);
}

/**
 * @description: 获取菜单列表
 * @return 菜单列表
 */
export function getMenuListAPI(data?: { title?: string }) {
  return http.get<menuListType[]>(api.menuList, data);
}

/**
 * @description: 获取菜单详情
 * @param {object} data 菜单id
 * @return 菜单详情
 */
export function getMenuDetailsAPI(data: { id: number }) {
  return http.get(api.menuDetails, data);
}

/**
 * @description: 获取用户菜单列表
 * @param {object} data 用户id
 * @return 菜单详情
 */
export function getUserMenuAPI(data: { userID: number }) {
  return http.get<menuListType[]>(api.userMenu, data);
}

/**
 * @description: 更新菜单信息
 * @param {menuType} data 菜单信息
 * @return 更新结果
 */
export function patchUpdateMenuAPI(data: Partial<menuType>) {
  return http.patch(api.updateMenu, data);
}

/**
 * @description: 删除菜单
 * @param {object} data 删除角色信息
 * @return 删除结果
 */
export function deleteMenuAPI(data: { id: number; authType: number }) {
  return http.remove(api.deleteMenu, data);
}
