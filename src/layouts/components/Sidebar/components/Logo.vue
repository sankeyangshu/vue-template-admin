<template>
  <div class="logo-container">
    <transition name="sidebarLogoFadeCl">
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
  line-height: 60px;
  background: $sub-menu-bg;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
    }
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      margin-left: 12px;
      line-height: 60px;
      font-size: 14px;
      vertical-align: middle;
    }
  }
}

.sidebarLogoFadeCl-enter-active {
  transition: opacity 2s;
}
.sidebarLogoFadeCl-enter-from,
.sidebarLogoFadeCl-leave-to {
  opacity: 0;
}
</style>
