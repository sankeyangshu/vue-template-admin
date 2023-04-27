<template>
  <div class="layout-wrapper">
    <!-- 左侧 SubMenu -->
    <LayoutSideBar></LayoutSideBar>
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
  width: calc(100% - $base-side-bar-width);
}
.layout-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
  .layout-main {
    min-height: 100%;
    margin-left: $base-side-bar-width;
    &.is-collapse {
      margin-left: $base-side-bar-width-min;
      border-right: 0;
    }
    .layout-header {
      box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
      &.fixed-header {
        @include fix-header;
      }
      &.is-collapse {
        width: calc(100% - $base-side-bar-width-min);
      }
    }
    .app-main-container {
      padding: 20px;
    }
  }
}
</style>
