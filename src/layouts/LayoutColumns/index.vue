<template>
  <!-- 分栏布局 -->
  <el-container class="layout-wrapper">
    <div class="sidebar-wrap">
      <div class="logo">
        <img src="@/assets/images/logo.png" class="sidebar-logo" />
      </div>
      <el-scrollbar>
        <div class="sidebar-list">
          <div
            v-for="item in menuList"
            :key="item.path"
            class="sidebar-item"
            :class="{
              'sidebar-active':
                splitActive === item.path || `/${splitActive.split('/')[1]}` === item.path,
            }"
            @click="onChangeSubMenu(item)"
          >
            <el-icon>
              <component :is="item.meta?.icon"></component>
            </el-icon>
            <span class="title">{{ $t(`route.${item.meta?.title}`) }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <el-aside :class="{ 'not-aside': !subMenuList.length, 'is-collapse': isCollapse }">
      <div class="logo">
        <span v-show="subMenuList.length" class="logo-text">{{ isCollapse ? 'V' : appTitle }}</span>
      </div>
      <el-scrollbar>
        <el-menu
          :unique-opened="themeConfig.uniqueOpened"
          :default-active="activeMenu"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <SubMenu :menu-list="subMenuList" />
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 顶部 Header -->
        <NavBarLeft />
        <NavBarRight />
      </el-header>

      <!-- 标签 -->
      <TagsView />

      <el-main>
        <!-- 内容区 Main -->
        <LayoutMain />
      </el-main>

      <el-footer>
        <!-- 底部 Footer -->
        <LayoutFooter />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router';
import { useSettingStore } from '@/store/modules/setting';
import { filterRoutes, generateMenus } from '@/utils/routers';
import LayoutFooter from '../components/Footer/index.vue';
import NavBarLeft from '../components/Header/NavBarLeft.vue';
import NavBarRight from '../components/Header/NavBarRight.vue';
import LayoutMain from '../components/Main/index.vue';
import SubMenu from '../components/Sidebar/components/SubMenu.vue';
import TagsView from '../components/TagsView/index.vue';

// 获取全局标题
const appTitle = import.meta.env.VITE_APP_TITLE;

// 获取全局设置
const settingStore = useSettingStore();

// 是否折叠
const isCollapse = computed(() => settingStore.isCollapse);

// 获取主题设置
const themeConfig = computed(() => settingStore.themeConfig);

// 获取路由实例
const router = useRouter();

// 获取路由携带的参数和路径
const route = useRoute();

// 默认激活菜单
const activeMenu = computed(() => {
  const { path } = route;
  return path;
});

// 筛选符合条件的路由
const menuList = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes());
  return generateMenus(fRoutes);
});

// 侧边菜单列表
const subMenuList = ref<RouteRecordRaw[]>([]);

// 当前激活菜单
const splitActive = ref('');

// 监听侧边菜单变化
watch(
  () => [menuList, route],
  () => {
    // 当前菜单没有数据, 直接return
    if (!menuList.value.length) return;
    splitActive.value = route.path;
    const menuItem = menuList.value.filter((item) => {
      return route.path === item.path || `/${route.path.split('/')[1]}` === item.path;
    });
    if (menuItem[0].children?.length) {
      return (subMenuList.value = menuItem[0].children);
    }
    subMenuList.value = [];
  },
  {
    deep: true,
    immediate: true,
  }
);

// 切换侧边菜单
const onChangeSubMenu = (item: RouteRecordRaw) => {
  splitActive.value = item.path;
  if (item.children?.length) {
    return (subMenuList.value = item.children);
  }
  subMenuList.value = [];
  router.push(item.path);
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  width: 100%;
  height: 100%;
  .sidebar-wrap {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 70px;
    height: 100%;
    background-color: var(--el-menu-bg-color);
    border-right: 1px solid var(--el-aside-border-color);
    .logo {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      height: $header-height;
      .sidebar-logo {
        width: 32px;
        object-fit: contain;
      }
    }
    .el-scrollbar {
      height: calc(100% - $header-height);
      .sidebar-list {
        flex: 1;
        .sidebar-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 70px;
          cursor: pointer;
          transition: all 0.3s ease;
          .el-icon {
            font-size: 20px;
          }
          .title {
            margin-top: 6px;
            font-size: 12px;
          }
          .el-icon,
          .title {
            color: var(--el-menu-text-color);
          }
        }
        .sidebar-active {
          background-color: var(--el-color-primary) !important;
          .el-icon,
          .title {
            color: #fff !important;
          }
        }
      }
    }
  }
  .not-aside {
    width: 0 !important;
    border-right: none !important;
  }
  .el-aside {
    display: flex;
    flex-direction: column;
    width: $side-bar-width;
    height: 100%;
    overflow: hidden;
    background-color: var(--el-menu-bg-color);
    border-right: 1px solid var(--el-aside-border-color);
    transition: width 0.3s ease;
    &.is-collapse {
      width: $side-bar-width-min;
    }
    .el-scrollbar {
      height: calc(100% - $header-height);
      .el-menu {
        width: 100%;
        overflow-x: hidden;
        border-right: none;
      }
    }
    .logo {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      height: $header-height;
      .logo-text {
        font-size: 24px;
        font-weight: bold;
        color: var(--el-aside-logo-text-color);
        white-space: nowrap;
      }
    }
  }
  :deep(.el-header) {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $header-height;
    padding: 0 $base-padding;
    background-color: var(--el-header-bg-color);
    border-bottom: 1px solid var(--el-header-border-color);
  }
  .el-footer {
    height: auto;
    padding: 0;
  }
}
</style>
