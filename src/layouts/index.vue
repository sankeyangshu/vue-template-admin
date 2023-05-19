<template>
  <div class="layout-wrapper">
    <!-- 左侧 SubMenu -->
    <LayoutSideBar></LayoutSideBar>

    <div class="layout-main" :class="{ 'is-collapse': isCollapse }">
      <!-- 顶部 Header -->
      <LayoutHeader />
      <div
        class="layout-header"
        :class="{
          'fixed-header': themeConfig.fixedHeader,
          'is-collapse': themeConfig.fixedHeader && isCollapse,
        }"
      >
        <!-- 操作栏 -->
        <LayoutNavBar />
        <!-- 标签 -->
        <LayoutTagsView v-if="themeConfig.showTag" />
      </div>
      <div class="layout-main-container">
        <!-- 内容区 Main -->
        <LayoutMain />
      </div>
      <!-- 底部 Footer -->
      <LayoutFooter />
    </div>

    <!-- 主题配置 -->
    <Theme />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useSettingStore } from '@/store/modules/setting';
import LayoutMain from './components/Main/index.vue';
import LayoutSideBar from './components/Sidebar/index.vue';
import LayoutHeader from './components/Header/index.vue';
import LayoutNavBar from './components/NavBar/index.vue';
import LayoutTagsView from './components/TagsView/index.vue';
import LayoutFooter from './components/Footer/index.vue';
import Theme from '@/components/Theme/index.vue';

// 获取全局设置
const settingStore = useSettingStore();

// 是否折叠
const isCollapse = computed(() => settingStore.isCollapse);

// 获取主题设置
const themeConfig = computed(() => settingStore.themeConfig);
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
      padding: 10px 12px;
    }
  }
}
</style>
