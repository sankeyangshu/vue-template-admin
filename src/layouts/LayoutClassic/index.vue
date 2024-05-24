<template>
  <!-- 经典布局 -->
  <el-container class="layout-wrapper">
    <!-- 顶部 Header -->
    <el-header>
      <div class="header-left">
        <div style="margin-right: 16px">
          <Logo />
        </div>
        <NavBarLeft />
      </div>
      <div class="header-right">
        <NavBarRight />
      </div>
    </el-header>

    <el-container class="layout-container">
      <el-aside>
        <!-- 左侧 SubMenu -->
        <Sidebar />
      </el-aside>

      <el-container>
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
  </el-container>
</template>

<script lang="ts" setup>
import LayoutFooter from '../components/Footer/index.vue';
import Logo from '../components/Header/components/Logo.vue';
import NavBarLeft from '../components/Header/NavBarLeft.vue';
import NavBarRight from '../components/Header/NavBarRight.vue';
import LayoutMain from '../components/Main/index.vue';
import Sidebar from '../components/Sidebar/index.vue';
import TagsView from '../components/TagsView/index.vue';
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
    overflow: hidden;
    user-select: none;
    background-color: var(--el-header-bg-color);
    border-bottom: 1px solid var(--el-header-border-color);
    .header-left {
      display: flex;
      align-items: center;
      height: $header-height;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .layout-container {
    height: calc(100% - $header-height);
    :deep(.el-aside) {
      width: auto;
      background-color: var(--el-menu-bg-color);
      border-right: 1px solid var(--el-aside-border-color);
    }
    .el-footer {
      height: auto;
      padding: 0;
    }
  }
}
</style>
