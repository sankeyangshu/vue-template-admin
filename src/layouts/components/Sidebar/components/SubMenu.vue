<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
      <template #title>
        <el-icon>
          <component :is="subItem.meta?.icon"></component>
        </el-icon>
        <span>{{ $t(`route.${subItem.meta?.title}`) }}</span>
      </template>
      <!-- 有children递归本次组件 -->
      <SubMenu :menuList="subItem.children" />
    </el-sub-menu>

    <el-menu-item v-else :index="subItem.path">
      <el-icon>
        <component :is="subItem.meta?.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ $t(`route.${subItem.meta?.title}`) }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { RouteRecordRaw } from 'vue-router';

// 获取父组件传递的值
defineProps({
  menuList: {
    type: Array<RouteRecordRaw>,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped></style>
