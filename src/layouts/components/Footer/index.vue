<template>
  <div class="footer-layout">
    <span> 2023 - {{ currentYear }} © VUE-TEMPLATE-ADMIN By sankeyangshu </span>
  </div>
</template>

<script lang="ts" setup>
// 获取当年年份
const currentYear = new Date().getFullYear();
</script>

<style lang="scss" scoped>
.footer-layout {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
  background-color: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color-light);
}
</style>
