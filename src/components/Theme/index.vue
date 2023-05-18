<template>
  <el-drawer v-model="drawer" :title="$t('navBar.setting')" size="300px">
    <div class="theme-item">
      <label>暗黑模式</label>
      <switch-dark></switch-dark>
    </div>
    <div class="theme-item">
      <label>灰色模式</label>
      <el-switch v-model="isGrey" @change="changeGreyOrWeak('grey', !!$event)" />
    </div>
    <div class="theme-item">
      <label>色弱模式</label>
      <el-switch v-model="isWeak" @change="changeGreyOrWeak('weak', !!$event)" />
    </div>
    <div class="theme-item">
      <label>标签栏</label>
      <el-switch v-model="showTag" @change="(val) => onChangeSwitch('showTag', val)" />
    </div>
    <div class="theme-item">
      <label>侧边栏 Logo</label>
      <el-switch v-model="showLogo" @change="(val) => onChangeSwitch('showLogo', val)" />
    </div>
    <div class="theme-item">
      <label>保持一个子菜单的展开</label>
      <el-switch v-model="uniqueOpened" @change="(val) => onChangeSwitch('uniqueOpened', val)" />
    </div>
    <div class="theme-item">
      <label>固定header</label>
      <el-switch v-model="fixedHeader" @change="(val) => onChangeSwitch('fixedHeader', val)" />
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useSettingStore, themeConfigKeyType } from '@/store/modules/setting';
import { useTheme } from '@/hooks/useTheme';
import SwitchDark from '@/components/SwitchDark/index.vue';

// 获取全局系统设置
const settingStore = useSettingStore();

// 获取切换灰色和色弱模式hooks
const { changeGreyOrWeak } = useTheme();

// 是否是灰色模式
const isGrey = ref(settingStore.themeConfig.isGrey);

// 是否是色弱模式
const isWeak = ref(settingStore.themeConfig.isWeak);

// 是否展示tagsView
const showTag = ref(settingStore.themeConfig.showTag);

// 是否展示侧边logo
const showLogo = ref(settingStore.themeConfig.showLogo);

// 是否保持一个子菜单的展开
const uniqueOpened = ref(settingStore.themeConfig.uniqueOpened);

// 是否固定header
const fixedHeader = ref(settingStore.themeConfig.fixedHeader);

const drawer = computed({
  get() {
    return settingStore.themeConfig.showSetting;
  },
  set() {
    onChangeSwitch('showSetting', !settingStore.themeConfig.showSetting);
  },
});

// 进行配置
const onChangeSwitch = (key: themeConfigKeyType, val: any) => {
  settingStore.setThemeConfig(key, val);
};
</script>

<style lang="scss" scoped>
::v-deep(.el-drawer__header) {
  border-bottom: 1px solid #ebeef5;
  padding: 15px 20px 14px;
  margin-bottom: 0;
}

:deep(.el-drawer__title) {
  font-weight: bold;
  color: black;
}
.theme-item {
  width: 100%;
  display: flex;
  margin-bottom: 15px;
  align-items: center;
  font-size: 14px;
  color: black;
  justify-content: space-between;
}
</style>
