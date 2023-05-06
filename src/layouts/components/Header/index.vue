<template>
  <div
    v-if="themeConfig.fixedHeader"
    :style="{ height: `${themeConfig.showTag ? 100 : 60}px` }"
  ></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useSettingStore } from '@/store/modules/setting';

// 获取全局设置
const settingStore = useSettingStore();

// 主题配置
const themeConfig = computed(() => settingStore.themeConfig);
</script>

<style lang="scss" scoped></style>
