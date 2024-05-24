<template>
  <div class="sidebar-container" :class="{ 'is-collapse': isCollapse }">
    <el-scrollbar>
      <el-menu
        :unique-opened="themeConfig.uniqueOpened"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <SubMenu :menuList="menuList"></SubMenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSettingStore } from '@/store/modules/setting';
import { filterRoutes, generateMenus } from '@/utils/routers';
import SubMenu from './components/SubMenu.vue';

// 获取路由实例
const router = useRouter();

// 筛选符合条件的路由
const menuList = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes());
  return generateMenus(fRoutes);
});

// 获取路由携带的参数和路径
const route = useRoute();

// 默认激活菜单
const activeMenu = computed(() => {
  const { path } = route;
  return path;
});

// 获取全局设置
const settingStore = useSettingStore();

// 是否折叠
const isCollapse = computed(() => settingStore.isCollapse);

// 获取主题设置
const themeConfig = computed(() => settingStore.themeConfig);
</script>

<style lang="scss" scoped>
.sidebar-container {
  width: $side-bar-width;
  height: 100%;
  overflow: hidden;
  transition: width #{$side-bar-duration};
  &.is-collapse {
    width: $side-bar-width-min;
    border-right: 0;
  }
  .el-menu {
    width: 100%;
    overflow-x: hidden;
    border-right: none;
  }
}
</style>
