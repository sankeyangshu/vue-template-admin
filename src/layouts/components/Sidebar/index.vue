<template>
  <div class="sidebar-container" :class="{ 'is-collapse': isCollapse }">
    <Logo :isCollapse="isCollapse"></Logo>
    <el-scrollbar>
      <el-menu
        :unique-opened="true"
        :default-active="activeMenu"
        background-color="#1f2d3d"
        text-color="#fff"
        active-text-color="#f4f4f5"
        :collapse="isCollapse"
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
import { filterRoutes, generateMenus } from '@/utils/routers';
import { useSettingStore } from '@/store/modules/setting';
import Logo from './components/Logo.vue';
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
</script>

<style lang="scss" scoped>
.sidebar-container {
  transition: width #{$side-bar-duration};
  width: $side-bar-width;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: $base-z-index;
  overflow: hidden;
  background: $menu-bg;
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
  &.is-collapse {
    width: $side-bar-width-min;
    border-right: 0;
  }
}
</style>
