<template>
  <el-config-provider :locale="locale" :size="componentSize">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import en from 'element-plus/lib/locale/lang/en'; // 导入 Element Plus 语言包
import zhCn from 'element-plus/lib/locale/lang/zh-cn'; // 导入 Element Plus 语言包
import { computed } from 'vue';
import { useTheme } from '@/hooks/useTheme';
import { useSettingStore } from '@/store/modules/setting';

// 初始化主题
const { initTheme } = useTheme();
initTheme();

// 获取全局设置
const settingStore = useSettingStore();

// 获取全局设置中国际化语言默认值
const language = computed(() => settingStore.language);

const locale = computed(() => (language.value === 'en' ? en : zhCn));

// 获取全局设置中组件尺寸默认值
const componentSize = computed(() => settingStore.componentSize);
</script>

<style lang="scss"></style>
