<template>
  <div class="nav-bar-container">
    <el-row :gutter="15">
      <el-col :sm="12" :md="12" :lg="12" :xl="12">
        <div class="left-nav-bar">
          <!-- 左侧菜单收缩 -->
          <CollapseIcon />
          <!-- 面包屑 -->
          <Breadcrumb />
        </div>
      </el-col>
      <el-col :sm="12" :md="12" :lg="12" :xl="12">
        <div class="right-nav-bar">
          <!-- 全屏 -->
          <ScreenFull />
          <!-- 用户信息 -->
          <User />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import CollapseIcon from './components/CollapseIcon.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import ScreenFull from './components/ScreenFull.vue';
import User from './components/User.vue';
</script>

<style lang="scss" scoped>
.nav-bar-container {
  height: $nav-bar-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  overflow: hidden;
  user-select: none;
  background: #ffffff;
  box-shadow: $base-box-shadow;
  .left-nav-bar {
    height: $nav-bar-height;
    display: flex;
    align-items: center;
    justify-items: center;
  }
  .right-nav-bar {
    height: $nav-bar-height;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
