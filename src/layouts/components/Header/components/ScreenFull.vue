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
        @click="handleFullScreen"
      ></svg-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { useFullscreen } from 'vue-hooks-plus';

const [isFullscreen, { toggleFullscreen, isEnabled }] = useFullscreen();

/**
 * 切换全屏
 */
const handleFullScreen = () => {
  // 判断浏览器是否支持全屏
  if (!isEnabled) {
    ElMessage.warning('当前您的浏览器不支持全屏 ❌');
  } else {
    toggleFullscreen();
  }
};
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
