<template>
  <div
    v-if="themeConfig.fixedHeader"
    :style="{ height: `${themeConfig.showTag ? 100 : 60}px` }"
  ></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useSettingStore } from '@/store/modules/setting';

// TODO: 此处代码需要优化-可能不需要该组件
// 获取全局设置
const settingStore = useSettingStore();

// 主题配置
const themeConfig = computed(() => settingStore.themeConfig);
</script>

<style lang="scss" scoped></style>
