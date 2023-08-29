import { RouteRecordRaw, RouteRecordName } from 'vue-router';
import { roleResultType } from '@/types/role';
import { menuListType } from '@/types/menu';
import path from 'path-browserify';

/**
 * @description: 返回所有子路由
 * @param {RouteRecordRaw[]} routes 路由数组
 * @return 子路由数组
 */
const getChildrenRoutes = (routes: RouteRecordRaw[]) => {
  const result: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children);
    }
  });
  return result;
};

/**
 * @description: 判断数据是否为空值
 * @param {any} data 数据
 * @return 判断结果-是否为空
 */
const isNull = (data: any) => {
  if (!data) return true;
  if (JSON.stringify(data) === '{}') return true;
  if (JSON.stringify(data) === '[]') return true;
  return false;
};

/**
 * @description: 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {RouteRecordRaw[]} routes
 * @return 符合条件的路由
 */
export const filterRoutes = (routes: RouteRecordRaw[]) => {
  const childrenRoutes = getChildrenRoutes(routes);
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path;
    });
  });
};

/**
 * @description: 根据routes数据，返回对应的menu规则数据
 * @param {RouteRecordRaw[]} routes
 * @param {string} basePath 基础路径
 * @return 对应的menu规则数据
 */
export const generateMenus = (routes: RouteRecordRaw[], basePath = '') => {
  const result: RouteRecordRaw[] = [];
  // 不满足条件：meta && meta.title && meta.icon 的数据不应该存在
  routes.forEach((item) => {
    // 不存在children && meta ，直接返回
    if (isNull(item.children) && isNull(item.meta)) return;
    // 存在children，不存在meta，迭代 generateMenus
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children as RouteRecordRaw[])); // 断言children为Array<RouteRecordRaw>类型
      return;
    }
    // 不存在 children，存在meta || 存在children，也存在meta
    // 因为最终的menu需要进行跳转，此时我们需要合并path
    const routePath = path.resolve(basePath, item.path);
    // 路由分离之后，可能存在同名父路由的情况
    let route = result.find((item) => item.path === routePath);
    // 当前路由尚未加入到result
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: [],
      };
      // 路由icon和title存在
      if (route.meta?.icon && route.meta.title) {
        result.push(route);
      }
    }

    // 存在children 和 meta
    if (!isNull(item.children)) {
      route.children?.push(...generateMenus(item.children as RouteRecordRaw[], route.path));
    }
  });
  return result;
};

/**
 * @description: 过滤需要缓存的路由
 * @param {RouteRecordRaw[]} routers 所有路由表
 * @return 需要缓存的路由数组
 */
export const filterKeepAlive = (routers: RouteRecordRaw[]) => {
  const cacheRouter: RouteRecordName[] = [];
  const deep = (routers: RouteRecordRaw[]) => {
    routers.forEach((item) => {
      if (item.meta?.keepAlive && item.name) {
        cacheRouter.push(item.name);
      }
      if (item.children && item.children.length) {
        deep(item.children);
      }
    });
  };
  deep(routers);
  return cacheRouter;
};

/**
 * @description: 判断当前用户是否具有权限
 * @param {roleResultType[]} roles 权限表
 * @param {RouteRecordRaw} route 当前路由对象
 * @return {boolean} 是否有权限
 */
export const hasPermission = (roles: roleResultType[], route: RouteRecordRaw): boolean => {
  if (route.meta && route.meta.roles) {
    const roleName = roles.map((item) => item.roleType);
    return roleName.some((role) => (route.meta?.roles as string[]).includes(role));
  } else {
    return false;
  }
};

/**
 * @description: 过滤异步路由表
 * @param {RouteRecordRaw} routes 异步路由表
 * @param {roleResultType[]} roles 权限表
 * @return 过滤结果
 */
export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: roleResultType[]) => {
  const res: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });
  return res;
};

/**
 * @description: 获取用户按钮权限列表
 * @param {menuListType} menuList 菜单列表
 * @param {string} path 当前路由
 * @return 按钮权限列表
 */
export const getAuthButtonsList = (menuList: menuListType[], path: string) => {
  let menus: string[] = [];
  menuList.forEach((item) => {
    // 检查当前菜单的 rul 属性是否等于目标值
    if (item.url === path) {
      if (item.children) {
        menus = item.children.map((res) => res.signName);
      }
    }
    // 如果当前对象有 children 属性且是一个数组，则递归调用 authButtonsList 进行进一步筛选
    if (item.children) {
      getAuthButtonsList(item.children, path);
    }
  });

  return menus;
};
