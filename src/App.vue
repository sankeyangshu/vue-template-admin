<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useSettingStore } from '@/store/modules/setting';
import { useTheme } from '@/hooks/useTheme';
import zhCn from 'element-plus/lib/locale/lang/zh-cn'; // 导入 Element Plus 语言包
import en from 'element-plus/lib/locale/lang/en'; // 导入 Element Plus 语言包

// 初始化主题
const { initTheme } = useTheme();
initTheme();

// 获取全局设置
const settingStore = useSettingStore();

// 获取全局设置中国际化语言默认值
const language = computed(() => settingStore.language);

const locale = computed(() => (language.value === 'en' ? en : zhCn));
</script>

<style lang="scss"></style>
