<template>
  <div class="layout-wrapper">
    <!-- 左侧 SubMenu -->
    <LayoutSideBar></LayoutSideBar>

    <div class="layout-main" :class="{ 'is-collapse': isCollapse }">
      <div class="layout-header fixed-header" :class="{ 'is-collapse': isCollapse }">
        <!-- 顶部 Header -->
        <LayoutNavBar />
        <!-- 标签 -->
        <LayoutTagsView />
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
import { computed } from 'vue';
import { useSettingStore } from '@/store/modules/setting';
import LayoutMain from './components/Main/index.vue';
import LayoutSideBar from './components/Sidebar/index.vue';
import LayoutNavBar from './components/NavBar/index.vue';
import LayoutTagsView from './components/TagsView/index.vue';

// 获取全局设置
const settingStore = useSettingStore();

// 是否折叠
const isCollapse = computed(() => settingStore.isCollapse);
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
  .layout-main {
    min-height: 100%;
    transition: margin-left #{$side-bar-duration};
    margin-left: $side-bar-width;
    position: relative;
    &.is-collapse {
      margin-left: $side-bar-width-min;
      border-right: 0;
    }
    .layout-header {
      box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
      &.fixed-header {
        @include fix-header;
      }
      &.is-collapse {
        width: calc(100% - $side-bar-width-min);
      }
    }
    .layout-main-container {
      padding: 20px;
    }
  }
}
</style>
