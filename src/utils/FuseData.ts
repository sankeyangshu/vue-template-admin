import path from 'path-browserify';
import { RouteRecordRaw } from 'vue-router';
import { i18n } from '@/i18n';

/**
 * 筛选完路由对象类型
 */
export interface filterRouteType {
  path: string;
  title: string[];
}

/**
 * @description: 筛选出可供搜索的路由对象
 * @param {RouteRecordRaw[]} routes 路由表
 * @param {string} basePath 基础路由，默认为 /
 * @param {string[]} prefixTitle 路由名称
 * @return 筛选完的路由对象
 */
export const generateRoutes = (
  routes: RouteRecordRaw[],
  basePath = '/',
  prefixTitle: string[] = []
) => {
  // 创建 result 数据
  let res: filterRouteType[] = [];

  for (const route of routes) {
    // 创建包含 path 和 title 的item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle],
    };

    // 当前存在 meta 时，使用i18n进行国际化解析，组合成新的title
    // 当动态路由不允许被检索
    const regex = /.*\/:.*/;
    if (route.meta && route.meta.title && !regex.exec(route.path)) {
      const i18nTitle = i18n.global.t(`route.${route.meta.title}`);
      data.title = [...data.title, i18nTitle];
      res.push(data);
    }

    // 存在 children 时，迭代调用
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title);
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes];
      }
    }
  }

  return res;
};
