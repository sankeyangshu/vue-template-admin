<template>
  <div class="layout-wrapper">
    <!-- 左侧 SubMenu -->
    <LayoutSideBar class="sidebar-container"></LayoutSideBar>

    <div class="layout-main">
      <div class="layout-header fixed-header">
        <!-- 顶部 Header -->
        <LayoutNavBar />
      </div>
      <div class="layout-main-container">
        <!-- 内容区 Main -->
        <LayoutMain />
        <!-- 底部 Footer -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LayoutMain from './components/Main/index.vue';
import LayoutSideBar from './components/Sidebar/index.vue';
import LayoutNavBar from './components/NavBar/index.vue';
</script>

<style lang="scss" scoped>
@mixin fix-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: $base-z-index - 2;
  width: calc(100% - $side-bar-width);
  transition: width #{$side-bar-duration};
}
.layout-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  .layout-header {
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    &.fixed-header {
      @include fix-header;
    }
    &.is-collapse {
      width: calc(100% - $side-bar-width-min);
    }
  }
}
</style>
