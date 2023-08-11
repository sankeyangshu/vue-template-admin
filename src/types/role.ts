/**
 * 创建/更新角色类型
 */
export interface roleType {
  roleName: string;
  description?: string;
  roleType?: number;
  status?: boolean;
  sort?: number;
}

/**
 * 角色列表类型
 */
export interface roleListType extends roleType {
  id: number;
  createtime: string;
}

/**
 * 获取角色列表返回参数类型
 */
export interface roleListResult {
  list: roleListType[];
  total: number;
  pageNum: number;
  pageSize: number;
}
