<template>
  <div class="logo-container">
    <transition name="sidebarLogoFade">
      <router-link v-if="isCollapse" key="collapse" class="sidebar-logo-link" to="/">
        <img src="@/assets/images/logo.png" class="sidebar-logo" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="@/assets/images/logo.png" class="sidebar-logo" />
        <h1 class="sidebar-title">Vue-Admin</h1>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts" setup>
defineProps({ isCollapse: Boolean });
</script>

<style lang="scss" scoped>
.logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  overflow: hidden;
  line-height: 60px;
  text-align: center;
  background: #2b2f3a;
  & .sidebar-logo-link {
    width: 100%;
    height: 100%;
    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      margin-left: 12px;
      font-size: 14px;
      font-weight: 600;
      line-height: 60px;
      color: #fff;
      vertical-align: middle;
    }
  }
}
</style>
