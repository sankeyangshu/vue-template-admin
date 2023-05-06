<template>
  <div class="setting">
    <el-tooltip effect="dark" :content="$t('navBar.setting')" placement="bottom">
      <el-icon size="24">
        <Setting @click="onClickSetting" />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { useSettingStore } from '@/store/modules/setting';

// 获取全局系统设置
const settingStore = useSettingStore();

// 显示系统设置
const onClickSetting = () => {
  settingStore.setThemeConfig('showSetting', true);
};
</script>

<style lang="scss" scoped>
.setting {
  padding-right: 20px;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
