<template>
  <el-switch
    class="dark"
    v-model="themeConfig.isDark"
    inline-prompt
    :active-icon="Sunny"
    :inactive-icon="Moon"
    @change="onChangeDark"
  />
</template>

<script lang="ts" setup>
import { Moon, Sunny } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useTheme } from '@/hooks/useTheme';
import { useSettingStore } from '@/store/modules/setting';

// 获取全局状态管理仓库中系统设置状态
const settingStore = useSettingStore();
const themeConfig = computed(() => settingStore.themeConfig);

// 获取切换暗黑模式hooks
const { switchDark } = useTheme();

// 切换暗黑模式
const onChangeDark = () => {
  switchDark();
};
</script>

<style lang="scss" scoped></style>
