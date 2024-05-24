<template>
  <!-- 纵向布局 -->
  <el-container class="layout-wrapper">
    <el-aside>
      <div class="layout-sidebar">
        <Logo :isCollapse="isCollapse" />
        <!-- 左侧 SubMenu -->
        <Sidebar />
      </div>
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
import { computed } from 'vue';
import { useSettingStore } from '@/store/modules/setting';
import LayoutFooter from '../components/Footer/index.vue';
import Logo from '../components/Header/components/Logo.vue';
import NavBarLeft from '../components/Header/NavBarLeft.vue';
import NavBarRight from '../components/Header/NavBarRight.vue';
import LayoutMain from '../components/Main/index.vue';
import Sidebar from '../components/Sidebar/index.vue';
import TagsView from '../components/TagsView/index.vue';

// 获取全局设置
const settingStore = useSettingStore();

// 是否折叠
const isCollapse = computed(() => settingStore.isCollapse);
</script>

<style lang="scss" scoped>
.layout-wrapper {
  width: 100%;
  height: 100%;
  :deep(.el-aside) {
    width: auto;
    background-color: var(--el-menu-bg-color);
    border-right: 1px solid var(--el-aside-border-color);
    .layout-sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
  .el-header {
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
