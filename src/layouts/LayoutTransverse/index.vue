<template>
  <!-- 横向布局 -->
  <el-container class="layout-wrapper">
    <el-header>
      <Logo />

      <!-- 顶部菜单 -->
      <el-menu :default-active="activeMenu" mode="horizontal" router>
        <!-- MARK: 可能存在无法触发menu省略功能，待后面测试 -->
        <SubMenu :menuList="menuList"></SubMenu>
      </el-menu>

      <!-- 顶部 Header -->
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
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { filterRoutes, generateMenus } from '@/utils/routers';
import LayoutFooter from '../components/Footer/index.vue';
import Logo from '../components/Header/components/Logo.vue';
import NavBarRight from '../components/Header/NavBarRight.vue';
import LayoutMain from '../components/Main/index.vue';
import SubMenu from '../components/Sidebar/components/SubMenu.vue';
import TagsView from '../components/TagsView/index.vue';

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
</script>

<style lang="scss" scoped>
.layout-wrapper {
  width: 100%;
  height: 100%;
  :deep(.el-header) {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $header-height;
    padding: 0 $base-padding 0 0;
    background-color: var(--el-header-bg-color);
    border-bottom: 1px solid var(--el-header-border-color);
    .el-menu {
      flex: 1;
      height: 100%;
      overflow: hidden;
      border-bottom: none;
      .el-sub-menu__hide-arrow {
        width: 65px;
        height: 55px;
      }
      .el-menu-item.is-active {
        color: #fff !important;
      }
      .is-active {
        background-color: var(--el-color-primary) !important;
        border-bottom-color: var(--el-color-primary) !important;
        &::before {
          width: 0;
        }
        .el-sub-menu__title {
          color: #fff !important;
          background-color: var(--el-color-primary) !important;
          border-bottom-color: var(--el-color-primary) !important;
        }
      }
    }
  }
  .el-footer {
    height: auto;
    padding: 0;
  }
}
</style>
