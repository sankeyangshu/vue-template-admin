<template>
  <div class="app-main">
    <!-- <router-view> </router-view> -->
    <router-view v-slot="{ Component, route }">
      <transition name="fade-slide" mode="out-in" appear>
        <keep-alive :include="cacheRoutes" v-if="isReload">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useSettingStore } from '@/store/modules/setting';
import { usePermissionStore } from '@/store/modules/permission';

// 获取系统设置 store
const settingStore = useSettingStore();

// 是否刷新
const isReload = computed(() => settingStore.isReload);

// 获取权限 store
const permissionStore = usePermissionStore();

// 获取缓存的路由
const cacheRoutes = computed<any>(() => permissionStore.keepAliveRoutes);
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  min-height: $app-main-height;
  padding: 61px 20px 20px;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
