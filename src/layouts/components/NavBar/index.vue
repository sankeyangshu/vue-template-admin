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
          <!-- 搜索 -->
          <HeaderSearch />
          <!-- 全屏 -->
          <ScreenFull />
          <!-- 切换组件尺寸 -->
          <ComponentSize />
          <!-- 国际化 -->
          <LangSelect />
          <!-- 通知 -->
          <Notice />
          <!-- 设置 -->
          <Setting />
          <!-- 用户信息 -->
          <User />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from './components/Breadcrumb.vue';
import CollapseIcon from './components/CollapseIcon.vue';
import ComponentSize from './components/ComponentSize.vue';
import HeaderSearch from './components/HeaderSearch.vue';
import LangSelect from './components/LangSelect.vue';
import Notice from './components/Notice.vue';
import ScreenFull from './components/ScreenFull.vue';
import Setting from './components/Setting.vue';
import User from './components/User.vue';
</script>

<style lang="scss" scoped>
.nav-bar-container {
  box-sizing: border-box;
  height: $nav-bar-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  overflow: hidden;
  user-select: none;
  background: #fff;
  box-shadow: $base-box-shadow;
  .left-nav-bar {
    display: flex;
    align-items: center;
    justify-items: center;
    height: $nav-bar-height;
  }
  .right-nav-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: $nav-bar-height;
  }
}
</style>
