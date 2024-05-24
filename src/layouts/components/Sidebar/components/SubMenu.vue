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

<style lang="scss">
.el-sub-menu .el-sub-menu__title:hover {
  color: var(--el-menu-hover-text-color) !important;
  background-color: transparent !important;
}
.el-menu--collapse {
  .is-active {
    .el-sub-menu__title {
      color: #fff !important;
      background-color: var(--el-color-primary) !important;
    }
  }
}
.el-menu-item {
  &:hover {
    color: var(--el-menu-hover-text-color);
  }
  &.is-active {
    color: var(--el-menu-active-color) !important;
    background-color: var(--el-menu-active-bg-color) !important;

    // border-left: 4px solid var(--el-color-primary) !important;
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      content: '';
      background-color: var(--el-color-primary);
    }
  }
}
.vertical,
.classic,
.transverse {
  .el-menu-item {
    &.is-active {
      &::before {
        left: 0;
      }
    }
  }
}
.columns {
  .el-menu-item {
    &.is-active {
      &::before {
        right: 0;
      }
    }
  }
}
</style>
