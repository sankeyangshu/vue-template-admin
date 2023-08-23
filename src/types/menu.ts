/**
 * 菜单类型
 */
export interface menuType {
  title: string; // 菜单名称
  signName: string; // 菜单标识
  authType: number | string; // 菜单类型
  url?: string; // 菜单路径
  icon?: string; // 菜单图标
  pid: number | string | null; // 上级菜单id
  status?: boolean; // 菜单状态
  sort?: number; // 排序
}

/**
 * 菜单列表返回类型
 */
export interface menuListType extends menuType {
  id: number;
  createtime: string;
  updatetime: string;
  children?: menuListType[];
}
