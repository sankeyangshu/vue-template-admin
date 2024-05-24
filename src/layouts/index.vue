<template>
  <component :is="LayoutComponent[themeConfig.layout]" />

  <!-- 主题配置 -->
  <ThemeDrawer />
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useSettingStore } from '@/store/modules/setting';
import ThemeDrawer from './components/ThemeDrawer/index.vue';
import LayoutClassic from './LayoutClassic/index.vue';
import LayoutColumns from './LayoutColumns/index.vue';
import LayoutTransverse from './LayoutTransverse/index.vue';
import LayoutVertical from './LayoutVertical/index.vue';

// 布局组件
const LayoutComponent = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
  transverse: LayoutTransverse,
  columns: LayoutColumns,
};

// 获取全局状态管理仓库中系统设置状态
const settingStore = useSettingStore();
const themeConfig = computed(() => settingStore.themeConfig);

// 监听布局变化，在 body 上添加相对应的 layout class
watch(
  () => themeConfig.value.layout,
  () => {
    const body = document.body as HTMLElement;
    body.setAttribute('class', themeConfig.value.layout);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped></style>
