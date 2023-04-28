<template>
  <div class="app-main">
    <router-view> </router-view>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  min-height: $app-main-height;
  padding: 61px 20px 20px;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
