<!--
 * @Description: svg图标组件
 * @Author: 三棵杨树
 * @Date: 2022-11-02 19:50:51
 * @LastEditors: 三棵杨树
 * @LastEditTime: 2022-11-02 20:08:30
-->
<template>
  <!-- svg图标组件 开始 -->
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
  <!-- svg图标组件 结束 -->
</template>

<script lang="ts" setup>
import { computed } from 'vue';

// 获取父组件传递的值
const props = defineProps({
  // icon 图标
  icon: {
    type: String,
    required: true,
  },
  // 图标类名
  className: {
    type: String,
    default: '',
  },
});

/**
 * svg图标类名
 */
const svgClass = computed(() => {
  return props.className ? 'svg-icon ' + props.className : 'svg-icon';
});

/**
 * 项目内图标
 */
const iconName = computed(() => {
  return props.icon ? `#icon-${props.icon}` : '#icon';
});
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
