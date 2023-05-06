<template>
  <div class="tags-view">
    <div class="tags-content">
      <el-tabs
        type="card"
        v-model="activeTabsValue"
        @tab-click="onTabClick"
        @tab-remove="onRemoveTab"
      >
        <el-tab-pane
          v-for="item in visitedViews"
          type="card"
          :key="item.path"
          :path="item.path"
          :label="item.title"
          :name="item.path"
          :closable="!(item.meta && item.meta.affix)"
        >
          <template #label>
            <el-icon size="16" class="tabs-icon" v-if="item.meta && item.meta.icon">
              <component :is="item.meta.icon"></component>
            </el-icon>
            {{ $t(`route.${item.title}`) }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="tags-action">
      <MoreButton />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { usePermissionStore } from '@/store/modules/permission';
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router';
import { TabsPaneContext, TabPaneName } from 'element-plus';
import path from 'path-browserify';
import MoreButton from './components/MoreButton.vue';

// 选中过的路由表类型
type visitedViewsType = RouteRecordRaw & {
  title?: string;
};

// 获取tagsView store
const tagsViewStore = useTagsViewStore();

// 获取权限 store
const permissionStore = usePermissionStore();

// 获取处理之后侧边栏菜单列表
const routes = computed(() => permissionStore.authMenuList);

// 选中过的路由表
const visitedViews = computed<visitedViewsType[]>(() => tagsViewStore.visitedViews);

// 需要固定的标签
let affixTags = ref<RouteRecordRaw[]>([]);

/**
 * @description: 过滤要出现在标签栏上的标签
 * @param {RouteRecordRaw[]} routes 路由表
 * @param {string} basePath 基础路径
 * @return {any} 标签数据
 */
const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/'): any => {
  let tags = [] as any;
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      // 获取 path
      const tagPath = path.resolve(basePath, route.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      });
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path);
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags];
      }
    }
  });
  return tags;
};

/**
 * @description: 拿到需要固定的路由表，添加进 store
 */
const initTags = () => {
  let newRoutes = routes.value as RouteRecordRaw[];
  let affixTag = (affixTags.value = filterAffixTags(newRoutes));
  for (const tag of affixTag) {
    if (tag.name) {
      tagsViewStore.addVisitedView(tag);
    }
  }
};

// 路由
const route = useRoute();
const router = useRouter();

/**
 * @description: 添加当前路由到标签也
 */
const addTags = () => {
  const { name } = route;
  if (name === 'Login') {
    return;
  }
  if (name) {
    tagsViewStore.addView(route as unknown as RouteRecordRaw);
  }
  return false;
};

// 监听路由变化
watch(route, () => {
  addTags();
});

onMounted(() => {
  initTags();
  addTags();
});

// 选中的tabs
const activeTabsValue = computed({
  get: () => {
    return tagsViewStore.activeTabsValue;
  },
  set: (val) => {
    tagsViewStore.setTabsMenuValue(val);
  },
});

/**
 * @description: 删除以后切换到下一个
 * @param {string} activeTabPath 选中的标签路径
 */
const toLastView = (activeTabPath: string) => {
  let index = visitedViews.value.findIndex((item) => item.path === activeTabPath);
  const nextTab = visitedViews.value[index + 1] || visitedViews.value[index - 1];
  if (!nextTab) return;
  router.push(nextTab.path);
  tagsViewStore.addVisitedView(nextTab);
};

// 点击标签页-tab 被选中时触发
const onTabClick = (tabItem: TabsPaneContext) => {
  let path = tabItem.props.name as string;
  router.push(path);
};

/**
 * @description: 判断标签页是否选中
 * @param {string} path 标签路径
 * @return {boolean} 选中结果
 */
const isActive = (path: string): boolean => {
  return path === route.path;
};

// 移除标签页-点击 tab 移除按钮时触发
const onRemoveTab = async (activeTabPath: TabPaneName) => {
  if (isActive(activeTabPath as string)) {
    toLastView(activeTabPath as string);
  }
  await tagsViewStore.delView(activeTabPath);
};
</script>

<style lang="scss" scoped>
.tags-view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  background: #ffffff;
  .tags-content {
    flex: 1;
    overflow: hidden;
    box-sizing: border-box;
    .tabs-icon {
      font-size: 14px;
    }
    .el-tabs--card :deep(.el-tabs__header) {
      height: $tabs-bar-height;
      padding: 0 10px;
      margin: 0;
      box-sizing: border-box;
    }
    :deep(.el-tabs) {
      .el-tabs__nav {
        border: none;
      }
      .el-tabs__header .el-tabs__item {
        border: none;
        color: #cccccc;
      }
      .el-tabs__header .el-tabs__item.is-active {
        color: $primaryColor;
        border-bottom: 2px solid $primaryColor;
      }
    }
  }
  .tags-action {
    height: 100%;
    flex-shrink: 0;
  }
}
</style>
