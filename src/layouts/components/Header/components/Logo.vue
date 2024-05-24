<template>
  <div class="logo-container" :class="{ 'is-collapse': isCollapse }">
    <transition name="sidebarLogoFade">
      <router-link class="sidebar-logo-link" to="/">
        <img src="@/assets/images/logo.png" class="sidebar-logo" />
        <div v-show="!isCollapse" class="sidebar-title">Vue-Admin</div>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts" setup>
defineProps({ isCollapse: { type: Boolean, default: false } });
</script>

<style lang="scss" scoped>
.logo-container {
  width: $side-bar-width;
  height: $header-height;
  line-height: $header-height;
  .sidebar-logo-link {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-decoration: none;
    .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }
    .sidebar-title {
      margin-left: 12px;
      font-size: 20px;
      font-weight: bold;
      color: var(--el-header-logo-text-color);
      vertical-align: middle;
    }
  }
  &.is-collapse {
    width: $side-bar-width-min;
  }
}
</style>
