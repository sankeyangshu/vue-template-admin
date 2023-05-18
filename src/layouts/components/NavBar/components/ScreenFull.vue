<template>
  <div class="screenful">
    <el-tooltip
      effect="dark"
      :content="!isFullscreen ? $t('navBar.screenfull') : $t('navBar.screenfullRetract')"
      placement="bottom"
    >
      <svg-icon
        :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
        className="screenful-icon header-icon"
        @click="toggle"
      ></svg-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core';

const { toggle, isFullscreen } = useFullscreen();
</script>

<style lang="scss" scoped>
.screenful {
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.3s;
  .screenful-icon {
    font-size: 24px;
  }
}
</style>
