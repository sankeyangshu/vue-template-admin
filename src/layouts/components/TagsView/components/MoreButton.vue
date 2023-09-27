<template>
  <el-dropdown trigger="hover">
    <el-button size="small" type="primary">
      <span>更多</span>
      <el-icon class="el-icon--right"><ArrowDown /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="onClickRefresh">
          <el-icon :size="14"><Refresh /></el-icon> 刷新
        </el-dropdown-item>
        <el-dropdown-item @click="onCloseCurrentTab">
          <el-icon :size="14"><FolderRemove /></el-icon> 关闭当前
        </el-dropdown-item>
        <el-dropdown-item @click="onCloseOtherTab">
          <el-icon :size="14"><Close /></el-icon>关闭其他
        </el-dropdown-item>
        <el-dropdown-item @click="onCloseAllTab">
          <el-icon :size="14"><FolderDelete /></el-icon>关闭所有
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useSettingStore } from '@/store/modules/setting';
import { useTagsViewStore } from '@/store/modules/tagsView';

// 路由
const route = useRoute();

// 获取系统设置 store
const settingStore = useSettingStore();

// 获取tagsView store
const tagsViewStore = useTagsViewStore();

// 刷新当前页面
const onClickRefresh = () => {
  settingStore.setReload();
};

// 关闭当前页面
const onCloseCurrentTab = () => {
  tagsViewStore.toLastView(route.path);
  tagsViewStore.delView(route.path);
};

// 关闭其他页面
const onCloseOtherTab = () => {
  tagsViewStore.delOtherViews(route.path);
};

// 关闭所有页面，去首页
const onCloseAllTab = () => {
  tagsViewStore.delAllViews();
  tagsViewStore.goHome();
};
</script>

<style lang="scss" scoped>
.more {
  color: #fff;
  background-color: $primary-color;
  .tags-view-item {
    display: flex;
    align-items: center;
  }
}
</style>
