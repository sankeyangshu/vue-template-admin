<template>
  <div class="nav-bar-left">
    <!-- 左侧菜单收缩 -->
    <CollapseIcon />
    <!-- 面包屑 -->
    <Breadcrumb />
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from './components/Breadcrumb.vue';
import CollapseIcon from './components/CollapseIcon.vue';
</script>

<style lang="scss" scoped>
.nav-bar-left {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
