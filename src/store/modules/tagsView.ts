import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { router } from '@/router';

interface tagsViewStateType {
  activeTabsValue: string;
  visitedViews: RouteRecordRaw[];
  cachedViews: any[];
}

export const useTagsViewStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'tagsViewState',

  // state: 返回对象的函数
  state: (): tagsViewStateType => ({
    activeTabsValue: '/home', // 选中的tagsView
    visitedViews: [], // 选中过的路由表
    cachedViews: [], // 使用 keepAlive 时的缓存
  }),

  getters: {},

  // 可以同步 也可以异步
  actions: {
    // 选中tagsView
    setTabsMenuValue(val: string) {
      this.activeTabsValue = val;
    },
    // 新增tagsView
    addView(view: RouteRecordRaw) {
      this.addVisitedView(view);
    },
    addVisitedView(view: RouteRecordRaw) {
      this.setTabsMenuValue(view.path);
      if (this.visitedViews.some((v) => v.path === view.path) || !view.meta) return;

      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name',
        })
      );

      if (view.meta.keepAlive && view.name) {
        this.cachedViews.push(view.name);
      }
    },
    // 移除tagsView
    removeView(routes: RouteRecordRaw[]) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter(
          (item) => !routes.includes((item as any).path)
        );
        resolve(null);
      });
    },
    delView(activeTabPath: any) {
      return new Promise((resolve) => {
        this.delVisitedView(activeTabPath);
        this.delCachedView(activeTabPath);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delVisitedView(path: string) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => {
          if (!v.meta) return;
          return v.path !== path || v.meta.affix;
        });
        this.cachedViews = this.cachedViews.filter((v) => {
          return v.path !== path || v.meta.affix;
        });
        resolve([...this.visitedViews]);
      });
    },
    delCachedView(view: RouteRecordRaw) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name);
        index > -1 && this.cachedViews.splice(index, 1);
        resolve([...this.cachedViews]);
      });
    },
    // 删除以后切换到下一个
    toLastView(activeTabPath: string) {
      const index = this.visitedViews.findIndex((item) => item.path === activeTabPath);
      const nextTab = this.visitedViews[index + 1] || this.visitedViews[index - 1];
      if (!nextTab) return;
      router.push(nextTab.path);
      this.addVisitedView(nextTab);
    },
    clearVisitedView() {
      this.delAllViews();
    },
    // 删除全部标签
    delAllViews() {
      this.visitedViews = this.visitedViews.filter((v) => v.meta && v.meta.affix);
      this.cachedViews = this.visitedViews.filter((v) => v.meta && v.meta.affix);
    },
    // 删除其他标签
    delOtherViews(path: string) {
      this.visitedViews = this.visitedViews.filter((item) => {
        return item.path === path || (item.meta && item.meta.affix);
      });
      this.cachedViews = this.visitedViews.filter((item) => {
        return item.path === path || (item.meta && item.meta.affix);
      });
    },
    // 回到首页
    goHome() {
      this.activeTabsValue = '/home';
      router.push({ path: '/home' });
    },
    updateVisitedView(view: RouteRecordRaw) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
  },
});
