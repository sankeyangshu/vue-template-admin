<template>
  <div class="hamburger-container" @click="onClickHandleCollapse">
    <el-icon class="icon">
      <component :is="isCollapse ? 'Expand' : 'Fold'"></component>
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useSettingStore } from '@/store/modules/setting';

// 获取全局设置
const settingStore = useSettingStore();

// 获取全局设置中菜单收缩状态
const isCollapse = computed(() => settingStore.isCollapse);

// 收缩/展开
const onClickHandleCollapse = () => {
  settingStore.setCollapse(!isCollapse.value);
};
</script>

<style lang="scss" scoped>
.hamburger-container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  &:hover {
    background: rgb(0 0 0 / 2.5%);
  }
  .icon {
    font-size: 24px;
    cursor: pointer;
  }
}
</style>
