<template>
  <div>
    <el-drawer v-model="drawer" :title="$t('navBar.setting')" size="300px">
      <el-divider class="divider" content-position="center">
        <el-icon><Notification /></el-icon>
        布局样式
      </el-divider>
      <div class="layout-style">
        <el-tooltip effect="dark" content="纵向" placement="top" :show-after="200">
          <div
            :class="['layout-item layout-vertical', { 'is-active': layout === 'vertical' }]"
            @click="onChangeSwitch('layout', 'vertical')"
          >
            <div class="layout-dark"></div>
            <div class="layout-container">
              <div class="layout-light"></div>
              <div class="layout-content"></div>
            </div>
            <el-icon v-if="layout === 'vertical'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="经典" placement="top" :show-after="200">
          <div
            :class="['layout-item layout-classic', { 'is-active': layout === 'classic' }]"
            @click="onChangeSwitch('layout', 'classic')"
          >
            <div class="layout-dark"></div>
            <div class="layout-container">
              <div class="layout-light"></div>
              <div class="layout-content"></div>
            </div>
            <el-icon v-if="layout === 'classic'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="横向" placement="top" :show-after="200">
          <div
            :class="['layout-item layout-transverse', { 'is-active': layout === 'transverse' }]"
            @click="onChangeSwitch('layout', 'transverse')"
          >
            <div class="layout-dark"></div>
            <div class="layout-content"></div>
            <el-icon v-if="layout === 'transverse'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="分栏" placement="top" :show-after="200">
          <div
            :class="['layout-item layout-columns', { 'is-active': layout === 'columns' }]"
            @click="onChangeSwitch('layout', 'columns')"
          >
            <div class="layout-dark"></div>
            <div class="layout-light"></div>
            <div class="layout-content"></div>
            <el-icon v-if="layout === 'columns'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
      </div>

      <el-divider class="divider mt-40" content-position="center">
        <el-icon><ColdDrink /></el-icon>
        全局主题
      </el-divider>
      <div class="theme-item">
        <label>主题颜色</label>
        <el-color-picker v-model="themeColor" :predefine="colorList" @change="changeThemeColor" />
      </div>
      <div class="theme-item">
        <label>暗黑模式</label>
        <SwitchDark />
      </div>
      <div class="theme-item">
        <label>灰色模式</label>
        <el-switch v-model="isGrey" @change="changeGreyOrWeak('grey', !!$event)" />
      </div>
      <div class="theme-item">
        <label>色弱模式</label>
        <el-switch v-model="isWeak" @change="changeGreyOrWeak('weak', !!$event)" />
      </div>

      <el-divider class="divider mt-40" content-position="center">
        <el-icon><Setting /></el-icon>
        界面设置
      </el-divider>
      <div class="theme-item">
        <label>标签栏</label>
        <el-switch
          v-model="showTag"
          @change="(val: boolean | string | number) => onChangeSwitch('showTag', val)"
        />
      </div>
      <div class="theme-item">
        <label>侧边栏 Logo</label>
        <el-switch
          v-model="showLogo"
          @change="(val: boolean | string | number) => onChangeSwitch('showLogo', val)"
        />
      </div>
      <div class="theme-item">
        <label>保持一个子菜单的展开</label>
        <el-switch
          v-model="uniqueOpened"
          @change="(val: boolean | string | number) => onChangeSwitch('uniqueOpened', val)"
        />
      </div>
      <div class="theme-item">
        <label>固定header</label>
        <el-switch
          v-model="fixedHeader"
          @change="(val: boolean | string | number) => onChangeSwitch('fixedHeader', val)"
        />
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import SwitchDark from '@/components/SwitchDark/index.vue';
import { DEFAULT_THEMECOLOR } from '@/config';
import { useTheme } from '@/hooks/useTheme';
import { themeConfigKeyType, useSettingStore } from '@/store/modules/setting';

// 预定义主题颜色
const colorList = [
  DEFAULT_THEMECOLOR,
  '#009688',
  '#daa96e',
  '#0c819f',
  '#27ae60',
  '#ff5c93',
  '#e74c3c',
  '#fd726d',
  '#f39c12',
  '#9b59b6',
];

// 获取全局系统设置
const settingStore = useSettingStore();

// 获取布局类型
const layout = computed(() => settingStore.themeConfig.layout);

// 获取切换灰色和色弱模式hooks
const { changeGreyOrWeak, changeThemeColor } = useTheme();

// 主题色
const themeColor = ref(settingStore.themeConfig.themeColor);

// 是否是灰色模式
const isGrey = ref(settingStore.themeConfig.isGrey);

// 是否是色弱模式
const isWeak = ref(settingStore.themeConfig.isWeak);

// TODO: tagsView 侧边logo 菜单手风琴 固定header 需要改进
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
:deep(.el-drawer__header) {
  padding: 16px 20px;
  margin-bottom: 0;
  border-bottom: 1px solid var(--el-border-color-lighter);
}
:deep(.el-drawer__title) {
  font-size: 17px;
  line-height: 17px;
  color: var(--el-text-color-primary) !important;
}
.divider {
  margin-top: 15px;
  .el-icon {
    position: relative;
    top: 3px;
    right: 5px;
    font-size: 15px;
  }
}
.layout-style {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px 7px 0;
  .layout-item {
    position: relative;
    box-sizing: border-box;
    width: 100px;
    height: 70px;
    padding: 6px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px var(--el-border-color-dark);
    transition: all 0.2s;
    .layout-dark {
      background-color: var(--el-color-primary);
      border-radius: 3px;
    }
    .layout-light {
      background-color: var(--el-color-primary-light-5);
      border-radius: 3px;
    }
    .layout-content {
      background-color: var(--el-color-primary-light-8);
      border: 1px dashed var(--el-color-primary);
      border-radius: 3px;
    }
    .el-icon {
      position: absolute;
      right: 10px;
      bottom: 10px;
      color: var(--el-color-primary);
      transition: all 0.2s;
    }
    &:hover {
      box-shadow: 0 0 5px 1px var(--el-text-color-secondary);
    }
  }
  .is-active {
    box-shadow: 0 0 0 2px var(--el-color-primary) !important;
  }
  .layout-vertical {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .layout-dark {
      width: 20%;
    }
    .layout-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 72%;
      .layout-light {
        height: 20%;
      }
      .layout-content {
        height: 67%;
      }
    }
  }
  .layout-classic {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
    .layout-dark {
      height: 22%;
    }
    .layout-container {
      display: flex;
      justify-content: space-between;
      height: 70%;
      .layout-light {
        width: 20%;
      }
      .layout-content {
        width: 70%;
      }
    }
  }
  .layout-transverse {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 15px;
    .layout-dark {
      height: 20%;
    }
    .layout-content {
      height: 67%;
    }
  }
  .layout-columns {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .layout-dark {
      width: 14%;
    }
    .layout-light {
      width: 17%;
    }
    .layout-content {
      width: 55%;
    }
  }
}
.theme-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
  font-size: 14px;
  label {
    display: flex;
    align-items: center;
    font-size: 14px;
    .el-icon {
      margin-left: 3px;
      font-size: 15px;
      color: var(--el-text-color-regular);
      cursor: pointer;
    }
  }
}
.mt-40 {
  margin-top: 40px;
}
</style>
